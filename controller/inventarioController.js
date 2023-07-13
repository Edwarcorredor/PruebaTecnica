/**
 * @param {atributo en el cual se tiene la conexion con la base de datos} req.conexion 
 * @param {respuesta que le damos al usuario} res 
*/
const postInventarios = (req, res) => {
  /**
  **Funcion que permite insertar registros en la tabla de inventarios, en la cual si no existe se crea un registro nuevo y si existe se actualiza la cantidad de unidadesd del producto
  */
  const { id_producto, id_bodega, cantidad } = req.body;
  /**
   ** Verificar si la combinación de id_producto e id_bodega ya existe en la tabla de inventarios
  */
  req.conexion.query(
    'SELECT * FROM inventarios WHERE id_producto = ? AND id_bodega = ?',
    [id_producto, id_bodega],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send("error");
      }
      if (results.length === 0) {
        /**
        ** La combinación es nueva, realizar un INSERT en la tabla de inventarios
        */ 
        req.conexion.query(
          'INSERT INTO inventarios (id_producto, id_bodega, cantidad) VALUES (?, ?, ?)',
          [id_producto, id_bodega, cantidad],
          (error, results) => {
            if (error) {
              console.error(error);
              return res.status(500).send(error);
            }
            res.status(200).send(results);
          }
      );
      } else {
        /**
        ** La combinación ya existe, realizar un UPDATE en la tabla de inventarios sumando la cantidad existente con la cantidad nueva 
        */
        const cantidadExistente = results[0].cantidad;
        const nuevaCantidad = cantidadExistente + cantidad;
        req.conexion.query(
          'UPDATE inventarios SET cantidad = ? WHERE id_producto = ? AND id_bodega = ?',
          [nuevaCantidad, id_producto, id_bodega],
          (error, results) => {
            if (error) {
              console.error(error);
              return res.status(500).send(error);
            }
            res.status(200).send(results);
          }
        );
      }
    }
  );
};

const putInventarios = (req, res) => {
  /**
  ** Funcion que permite Trasladar un producto de una bodega a otra
  */
  const { id_producto, id_bodega_origen, id_bodega_destino, cantidad } = req.body;
  /**
  ** Verificar la cantidad disponible en la bodega de origen 
  */
  req.conexion.query(
    'SELECT cantidad FROM inventarios WHERE id_producto = ? AND id_bodega = ?',
    [id_producto, id_bodega_origen],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send(error);
      }
      if (results.length === 0 || (results[0].cantidad < cantidad)) {
        /**
        * La cantidad solicitada es mayor a la disponible en la bodega de origen, generar una alerta e impedir el traslado 
        */
        console.log(results);
        return res.status(400).send('Error');
      }
      // Restar la cantidad de la bodega de origen
      req.conexion.query(
        'UPDATE inventarios SET cantidad = cantidad - ? WHERE id_producto = ? AND id_bodega = ?',
        [cantidad, id_producto, id_bodega_origen],
        (error, results) => {
          if (error) {
            console.error('Error al restar la cantidad de la bodega de origen:', error);
            return res.status(500).send(error);
          }
          
          // Sumar la cantidad a la bodega de destino
          req.conexion.query(
            'UPDATE inventarios SET cantidad = cantidad + ? WHERE id_producto = ? AND id_bodega = ?',
            [cantidad, id_producto, id_bodega_destino],
            (error, results) => {
              if (error) {
                console.error('Error al sumar la cantidad a la bodega de destino:', error);
                return res.status(500).send(error);
              }
              console.log(results);
              // Insertar la información en la tabla de historiales
              req.conexion.query(
                'INSERT INTO historiales (id_bodega_origen, id_bodega_destino, cantidad) VALUES (?, ?, ?)',
                [id_bodega_origen, id_bodega_destino, cantidad],
                (error, results) => {
                  if (error) {
                    console.error('Error al insertar en la tabla de historiales:', error);
                    return res.status(500).send(error);
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
  
  

export { postInventarios, putInventarios};