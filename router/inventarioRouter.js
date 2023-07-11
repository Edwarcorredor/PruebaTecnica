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
            console.log("hola");
            res.send(data);
        })
});

export default inventarios;