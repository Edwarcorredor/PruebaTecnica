/**
 * @param {atributo en el cual se tiene la conexion con la base de datos} req.conexion 
 * @param {respuesta que le damos al usuario} res 
*/

const getProductos = (req,res) => {
    /**
     ** Funcion para listar todos los productos en orden descendente por el total de su cantidad 
    */
    req.conexion.query(
        /*sql*/`SELECT id_producto, SUM(cantidad) AS Total
                FROM inventarios
                GROUP BY id_producto
                ORDER BY Total DESC`,
        (error, data,fils) => {
            res.send(data);
    })
};


const postProducto = (req, res) => {
    /**
     * Funcion que permite insertar productos y a su vez asigna una cantidad inicial del mismo en la tabla inventarios en una de las bodegas por default. 
    */
    req.conexion.query(
      'INSERT INTO productos SET ?',
      req.body,
      (error, results) => {
        if (error) {
          console.error('Error al insertar el producto:', error);
          return res.status(500).send("error");
        }
        const productoId = results.insertId;  // Obtener el ID del producto insertado
        // Insertar la cantidad inicial en la tabla "inventarios"
        req.conexion.query(
            'INSERT INTO inventarios (id_producto, id_bodega, cantidad) VALUES (?, ?, ?)',
            [productoId, 11, 10],
            (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send("error");
            }
            res.send(results);
            }
    )});
         
}

export {getProductos, postProducto};