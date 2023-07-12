import mysql from "mysql2"

const conexion_db = (req,res,next) => {
    req.conexion = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "prueba_tecnica_Edwar_M3",
        port: 3306
    })
    next();
}

export default conexion_db