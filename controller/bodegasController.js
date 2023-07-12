const bodegasget = (req, res) => {
    req.conexion.query(
        /*sql*/`SELECT * FROM bodegas ORDER BY nombre ASC`,
        (error, data,fils) => {
            res.send(data);
        })
};


const bodegaspost = (req, res) => {

    req.conexion.query(
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
        }
    );      
}

export  {bodegasget, bodegaspost};