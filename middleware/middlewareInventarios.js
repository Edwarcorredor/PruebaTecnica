import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import {inventarios} from "../controller/inventarios.js"


const middlewareInventarios = (req, res, next) => {
    try{
        let data = plainToClass(inventarios, req.body);
        req.body = JSON.parse(JSON.stringify(data));
        
        next();
    } catch(Error){
        res.send("Error");
    }  
}

export default middlewareInventarios