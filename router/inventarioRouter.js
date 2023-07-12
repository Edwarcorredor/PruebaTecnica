import { Router } from 'express'
import {inventariosget, productopost, inventariospost} from '../controller/inventarioController.js'
import conexion_db from '../middleware/conexion_db.js';

const inventarios = Router();

inventarios.get('/', conexion_db, inventariosget);
inventarios.post('/producto', conexion_db, productopost);
inventarios.post('/', conexion_db, inventariospost);


export default inventarios;