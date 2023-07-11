import { Router } from "express";
import mysql from "mysql2";

const bodegas = Router();

let conexion = undefined;

bodegas.use((req,res,next) => {
    conexion=mysql.createPool({
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "prueba_tecnica_edwar_M3",
        port: 3306
    })
    next();
});

bodegas.get('/', (req, res) => {
    conexion.query(
        /*sql*/`SELECT * FROM bodegas ORDER BY nombre ASC`,
        (error, data,fils) => {
            res.send(data);
        })
});

bodegas.post('/', (req, res) => {

    conexion.query(
        /*sql*/`INSERT INTO bodegas SET ?`,
        req.body,
        (error, data,fils) => {
            console.log(error);
            console.log(data);
            console.log(fils);
            data.affectedRows += 200;
            let result = req.body;
            result.id = data.insertId;
            res.status(data.affectedRows).send(result);
            res.send();
        }
    );   
    
})


export default bodegas;