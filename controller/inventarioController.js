const inventariosget = (req,res) => {
    req.conexion.query(
        /*sql*/`SELECT id_producto, SUM(cantidad) AS Total
                FROM inventarios
                GROUP BY id_producto
                ORDER BY Total DESC`,
        (error, data,fils) => {
            res.send(data);
        })
};

const productopost = (req, res) => {
  
    // Insertar el producto en la tabla "productos"
    req.conexion.query(
      'INSERT INTO productos SET ?',
      req.body,
      (error, results) => {
        if (error) {
          console.error('Error al insertar el producto:', error);
          res.status(500).send("error");
        }
        const productoId = results.insertId;  // Obtener el ID del producto insertado
            // Insertar la cantidad inicial en la tabla "inventarios"
        req.conexion.query(
            'INSERT INTO inventarios (id_producto, id_bodega, cantidad) VALUES (?, ?, ?)',
            [productoId, 11, 10],
            (error, results) => {
            if (error) {
                console.error('Error al insertar la cantidad inicial en inventarios:', error);
                res.status(500).send("error");
            }
            res.send(results);
            }
        )});
         
}


const inventariospost = (req, res) => {
    const { id_producto, id_bodega, cantidad } = req.body;
  
    // Verificar si la combinación de id_producto e id_bodega ya existe en la tabla de inventarios
    req.conexion.query(
      'SELECT * FROM inventarios WHERE id_producto = ? AND id_bodega = ?',
      [id_producto, id_bodega],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500)
        }
  
        if (results.length === 0) {
          // La combinación es nueva, realizar un INSERT en la tabla de inventarios
          req.conexion.query(
            'INSERT INTO inventarios (id_producto, id_bodega, cantidad) VALUES (?, ?, ?)',
            [id_producto, id_bodega, cantidad],
            (error, results) => {
              if (error) {
                console.error(error);
                res.status(500).send(error);
              }
              res.status(200).send(results);
            }
          );
        } else {
          // La combinación ya existe, realizar un UPDATE en la tabla de inventarios sumando la cantidad existente con la cantidad nueva
          const cantidadExistente = results[0].cantidad;
          const nuevaCantidad = cantidadExistente + cantidad;
          console.log(results);
          req.conexion.query(
            'UPDATE inventarios SET cantidad = ? WHERE id_producto = ? AND id_bodega = ?',
            [nuevaCantidad, id_producto, id_bodega],
            (error, results) => {
              if (error) {
                console.error('Error al actualizar la tabla de inventarios:', error);
                res.status(500).send(error);
              }
              res.status(200).send(results);
            }
          );
        }
      }
    );
  };

const inventariosput = (req, res) => {
    const { id_producto, id_bodega_origen, id_bodega_destino, cantidad } = req.body;
  
    // Verificar la cantidad disponible en la bodega de origen
    req.conexion.query(
      'SELECT cantidad FROM inventarios WHERE id_producto = ? AND id_bodega = ?',
      [id_producto, id_bodega_origen],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send(error);
        }
  
        if (results.length === 0 || results[0].cantidad < cantidad) {
          // La cantidad solicitada es mayor a la disponible en la bodega de origen, generar una alerta e impedir el traslado
          res.status(400).send('La cantidad solicitada es mayor a la disponible en la bodega de origen o no existe esa combinacion de bodega y producto')
        }
  
        // Restar la cantidad de la bodega de origen
        req.conexion.query(
          'UPDATE inventarios SET cantidad = cantidad - ? WHERE id_producto = ? AND id_bodega = ?',
          [cantidad, id_producto, id_bodega_origen],
          (error, results) => {
            if (error) {
              console.error('Error al restar la cantidad de la bodega de origen:', error);
              res.status(500).send(error);
            }
            
            // Sumar la cantidad a la bodega de destino
            req.conexion.query(
              'UPDATE inventarios SET cantidad = cantidad + ? WHERE id_producto = ? AND id_bodega = ?',
              [cantidad, id_producto, id_bodega_destino],
              (error, results) => {
                if (error) {
                  console.error('Error al sumar la cantidad a la bodega de destino:', error);
                  res.status(500).send(error);
                }
                console.log(results);
                // Insertar la información en la tabla de historiales
                req.conexion.query(
                  'INSERT INTO historiales (id_bodega_origen, id_bodega_destino, cantidad) VALUES (?, ?, ?)',
                  [id_bodega_origen, id_bodega_destino, cantidad],
                  (error, results) => {
                    if (error) {
                      console.error('Error al insertar en la tabla de historiales:', error);
                      res.status(500).send(error);
                    }
  
                    res.status(200).send(results);
                  }
                );
              }
            );
          }
        );
      }
    );
  };
  
  

export {inventariosget, inventariospost, productopost, inventariosput};