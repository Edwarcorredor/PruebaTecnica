import express from 'express';
import dotenv from 'dotenv';
import bodegas from './router/bodegasRouter.js';
import inventarios from './router/inventariosRouter.js';
import productos from './router/productosRouter.js';
import historiales from './router/historialesRouter.js';
import middlewareBodegas from './middleware/middlewareBodegas.js';
import middlewareProductos from './middleware/middlewareProductos.js';
import middlewareInventarios from './middleware/middlewareInventarios.js';
import middlewareHistoriales from './middleware/middlewareHistoriales.js';

dotenv.config();

const app = express();
app.use(express.json());


app.use('/bodegas',middlewareBodegas,bodegas);
app.use('/productos', middlewareProductos, productos);                       
app.use('/inventarios', middlewareInventarios, inventarios);
app.use('/historiales', middlewareHistoriales, historiales);


let config = JSON.parse(process.env.MY_CONFIG);
app.listen(config, () => {
    console.log(`Server is running on http:${config.hostname}:${config.port}`);
});