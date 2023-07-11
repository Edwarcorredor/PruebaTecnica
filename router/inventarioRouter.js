import { Router } from 'express'
import mysql from "mysql2"

const inventarios = Router();

let conexion = undefined;

inventarios.use((req,res,next) => {
    conexion=mysql.createPool({
        host: "localhost",
        user: "campus",
        password: "campus2023",
        database: "prueba_tecnica_Edwar_M3",
        port: 3306
    })
    console.log()
    next();
});

inventarios.get('/', (req,res) => {
    conexion.query(
        /*sql*/`SELECT id_producto, SUM(cantidad) AS Total
                FROM inventarios
                GROUP BY id_producto
                ORDER BY Total DESC`,
        (error, data,fils) => {
            res.send(data);
        })
});

inventarios.post('/', (req, res) => {
    conexion.query(
        /*sql*/ `INSERT IGNORE INTO productos SET ?`,
        req.body,
        (error, data) => {
            if (error) {
                console.log(error);
                res.status(500).send('Error al insertar el producto en la tabla productos.');
            } else {
                let result = req.body;
                result.id = data.insertId;

                // Aquí puedes agregar la lógica para insertar o actualizar en la tabla inventarios
                // Utiliza el ID del producto (data.insertId) y la cantidad inicial
                const producto_id = data.insertId; // Obtener el ID del producto insertado
                const bodega_id = 1; // ID de la bodega por defecto
                const cantidad_inicial = req.body.cantidad_inicial; // Obtener la cantidad inicial desde el cuerpo de la solicitud

                conexion.query(
                    /*sql*/ `INSERT INTO inventarios (producto_id, bodega_id, cantidad) VALUES (?, ?, ?)
                        ON DUPLICATE KEY UPDATE cantidad = VALUES(cantidad)`,
                    [producto_id, bodega_id, cantidad_inicial],
                    (errorInventario, dataInventario) => {
                        if (errorInventario) {
                            console.log(errorInventario);
                            res.status(500).send('Error al insertar o actualizar el inventario del producto.');
                        } else {
                            res.status(200).send(result);
                        }
                    }
                );
            }
        }
    );
});


export default inventarios;