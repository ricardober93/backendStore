//Dependencies
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import corsMiddleware from "./corsMiddleware";
import routesSecurity from './src/modules/security/routes'
import routesCustomization from './src/modules/customization/routes'
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
app.use(routesSecurity())
app.use(routesCustomization())

//Se conecta con MongoDB

    //Connecting database first
    mongoose.connect('mongodb://localhost/tienda', { useNewUrlParser: true, useUnifiedTopology: true, socketTimeoutMS: 10000, useFindAndModify: false, useCreateIndex: true })
        .then(() => console.log('Conectado correctamente a MongoDB'))
        .catch(() => console.log('Error al conectarse a MongoDB'))
    
    //Then initializate server
    app.listen(port, () => console.log('Escuchando puerto: ' + port));

