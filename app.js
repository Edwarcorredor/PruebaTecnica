import express from 'express';
import dotenv from 'dotenv';
import bodegas from './router/bodegasRouter.js';

dotenv.config();

const app = express();
app.use(express.json());


app.use('/bodegas', bodegas);


let config = JSON.parse(process.env.MY_CONFIG);
app.listen(config, () => {
    console.log(`Server is running on http:${config.hostname}:${config.port}`);
});