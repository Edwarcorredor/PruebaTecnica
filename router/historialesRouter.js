import { Router } from 'express'
import conexion_db from '../conexion_db/conexion_db.js';

const historiales = Router();

historiales.put('/', conexion_db, (req, res) => {
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
          res.status(500).send(error);

        }
        if (results.length === 0 || (results[0].cantidad < cantidad)) {
          /**
          * La cantidad solicitada es mayor a la disponible en la bodega de origen, generar una alerta e impedir el traslado 
          */
          console.log(results);
          res.status(400).send('Error');
          return;
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
  }
);

export default historiales;