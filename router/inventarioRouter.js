import { Router } from 'express'
import {postInventarios, putInventarios} from '../controller/inventarioController.js'
import conexion_db from '../middleware/conexion_db.js';

const inventarios = Router();


inventarios.post('/', conexion_db, postInventarios);
inventarios.put('/', conexion_db, putInventarios);


export default inventarios;