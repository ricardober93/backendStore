import express from 'express'
import {
    pinAction
} from "../MailChampi/controllers/mailChampiController";

const router = express.Router();

//Retorna una prueba
router.post('/api/suscribe', pinAction);



export default router;