import { Router } from 'express'
import conexion_db from '../conexion_db/conexion_db.js';


const bodegas = Router();

bodegas.get('/', conexion_db, (req, res) => {
    /**
     **getBodegas es una funcion para obtener la informacion en la tabla de bodegas en orden alfabetico 
    */ 
    req.conexion.query(
        /*sql*/`SELECT * FROM bodegas ORDER BY nombre ASC`,
        (error, data,fils) => {
        res.send(data);
    })
});

bodegas.post('/', conexion_db, (req, res) => {
    /**
    **postBodegas es una funcion que permite crear bodegas recibiendo los siguientes variables de entrada:
    **nombre, id_responsable, estado, created_by, update_by, updated_at, deleted_at
    */
    req.conexion.query(
        /*sql*/`INSERT INTO bodegas SET ?`,
        req.body,
        (error, data,fils) => {
            data.affectedRows += 200;
            let result = req.body;
            result.id = data.insertId;
            res.status(data.affectedRows).send(result);
        }
    );      
});

export default bodegas;