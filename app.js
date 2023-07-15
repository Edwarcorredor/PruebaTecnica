import express from 'express';
import dotenv from 'dotenv';
import bodegas from './router/bodegasRouter.js';
import inventarios from './router/inventarioRouter.js';
import productos from './router/productosRouter.js';
import historiales from './router/historialesRouter.js';
import middlewareBodega from './middleware/middlewareBodega.js';

dotenv.config();

const app = express();
app.use(express.json());


app.use('/bodegas',middlewareBodega,bodegas);
app.use('/productos', productos);                       
app.use('/inventario', inventarios);
app.use('/historiales', historiales);


let config = JSON.parse(process.env.MY_CONFIG);
app.listen(config, () => {
    console.log(`Server is running on http:${config.hostname}:${config.port}`);
});