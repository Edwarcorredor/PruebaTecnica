import { Router } from 'express';
import {getProductos, postProducto} from '../controller/productosController.js';
import conexion_db from '../middleware/conexion_db.js';

const productos = Router();

productos.get('/', conexion_db, getProductos);
productos.post('/', conexion_db, postProducto);

export default productos;