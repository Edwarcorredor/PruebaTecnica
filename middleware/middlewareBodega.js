import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import {bodegas} from "../controller/bodegas.js"

const middlewareBodega = (req, res, next) => {
    try{
        let data = plainToClass(bodegas, req.body);
        req.body = JSON.parse(JSON.stringify(data));
        
        next();
    } catch(Error){
        res.send("Error");
    }  
}

export default middlewareBodega