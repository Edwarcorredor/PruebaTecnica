import { Router } from 'express'
import {inventariosget, inventariospost} from '../controller/inventarioController.js'
import conexion_db from '../middleware/conexion_db.js';

const inventarios = Router();

inventarios.get('/', conexion_db, inventariosget);
inventarios.post('/', conexion_db, inventariospost);


export default inventarios;