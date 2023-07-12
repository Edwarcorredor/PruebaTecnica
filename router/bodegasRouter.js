import { Router } from 'express'
import conexion_db from '../middleware/conexion_db.js';
import {bodegasget,bodegaspost} from '../controller/bodegasController.js';

const bodegas = Router();

bodegas.get('/', conexion_db, bodegasget);
bodegas.post('/', conexion_db, bodegaspost);

export default bodegas;