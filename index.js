//Dependencies
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import passport from 'passport'
//import SetupPassport from './src/modules/middleware/Passport'
import {logger} from './src/modules/logger/logger';
import corsMiddleware from "./src/modules/middleware/corsMiddleware";
import securityRoutes from './src/modules/security/routes'
import customizationRoutes from './src/modules/customization/routes'
import marketRoutes from './src/modules/market/routes'

const app = express();
dotenv.config();
const port = process.env.PORT_BACKEND || 8000
const db = process.env.MONGO_URI || 'mongodb://localhost/tienda'

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
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.use('/', securityRoutes);
app.use('/', customizationRoutes);
app.use('/', marketRoutes);

//Then initializate server
app.listen(port, async () => {
    
    //Connecting database first
    await mongoose.connect( db , { useNewUrlParser: true, useUnifiedTopology: true, socketTimeoutMS: 10000, useFindAndModify: false, useCreateIndex: false })
        .then(() => logger.info('Conectado correctamente a MongoDB'))
        .catch(() => logger.info('Error al conectarse a MongoDB'))
    
    logger.info('Escuchando puerto: ' + port)
});
