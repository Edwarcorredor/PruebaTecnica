import { Router } from 'express';
import conexion_db from '../conexion_db/conexion_db.js';

const productos = Router();

productos.get('/', conexion_db, (req,res) => {
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
});
productos.post('/', conexion_db, (req, res) => {
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
        )
       }
    );
});

export default productos;