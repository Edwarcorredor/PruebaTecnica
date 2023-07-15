import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import {productos} from "../controller/productos.js"

const middlewareProductos = (req, res, next) => {
    try{
        let data = plainToClass(productos, req.body);
        req.body = JSON.parse(JSON.stringify(data));
        
        next();
    } catch(Error){
        res.send("Error");
    }  
}

export default middlewareProductos