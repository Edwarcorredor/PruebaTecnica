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

const inventariospost = (req, res) => {
  
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

export {inventariosget, inventariospost};