import { Router } from 'express'
import conexion_db from '../conexion_db/conexion_db.js';

const inventarios = Router();

inventarios.post('/', conexion_db, (req, res) => {
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
          res.status(500).send("error");
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
            res.status(500).send(error);
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
                res.status(500).send(error);
                }
                res.status(200).send(results);
            }
            );
        }
        }
    );
});



export default inventarios;