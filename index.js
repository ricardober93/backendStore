//Dependencies
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import {logger} from './src/modules/logger/logger';
import corsMiddleware from "./src/modules/middleware/corsMiddleware";
import securityRoutes from './src/modules/security/routes'
import customizationRoutes from './src/modules/customization/routes'
const app = express();
mongoose.set('useCreateIndex', true);
dotenv.config();
const port = process.env.PORT_BACKEND || 8000

//Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerDocumentDev from './swagger.json';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentDev));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//CORS Middleware
app.use(corsMiddleware);

//Body Parse
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Routes
app.use('/', securityRoutes);
app.use('/', customizationRoutes);

//Se conecta con MongoDB

//Connecting database first
mongoose.connect('mongodb://localhost/tienda', { useNewUrlParser: true, useUnifiedTopology: true, socketTimeoutMS: 10000, useFindAndModify: false, useCreateIndex: true })
    .then(() => logger.info('Conectado correctamente a MongoDB'))
    .catch(() => logger.info('Error al conectarse a MongoDB'))

//Then initializate server
app.listen(port, () => logger.info('Escuchando puerto: ' + port));

