//Dependencias
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import corsMiddleware from "./corsMiddleware";
const app = express();
mongoose.set('useCreateIndex', true);
dotenv.config();
const port = process.env.PORT_BACKEND

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
app.use(express.json());

//Se conecta con MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, socketTimeoutMS: 10000, })
    .then(() => console.log('Conectado correctamente a MongoDB'))
    .catch(() => console.log('Error al conectarse a MongoDB'))


app.get('/hello', (req, res) => { res.send("Hello") })
app.listen(port, () => console.log('Escuchando puerto: ' + port));
