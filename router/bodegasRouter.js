import { Router } from 'express'
import conexion_db from '../middleware/conexion_db.js';
import {getBodegas,postBodegas} from '../controller/bodegasController.js';

const bodegas = Router();

bodegas.get('/', conexion_db, getBodegas);
bodegas.post('/', conexion_db, postBodegas);

export default bodegas;