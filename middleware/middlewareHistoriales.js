import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import {historiales} from "../controller/historiales.js"


const middlewareHistoriales = (req, res, next) => {
    try{
        let data = plainToClass(historiales, req.body);
        req.body = JSON.parse(JSON.stringify(data));
        
        next();
    } catch(Error){
        res.send("Error");
    }  
}

export default middlewareHistoriales