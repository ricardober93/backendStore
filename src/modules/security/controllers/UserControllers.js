import User from '../models/UserModel'
import Role from '../models/RoleModel'
import bcrypt from 'bcrypt'
import shortid from 'shortid'
import jwt from 'jsonwebtoken'
import { logRequest, logError } from '../../logger/logger';
import {   
    updatePasswordUserService,
    updatePasswordAdmin,
    addUserService,
    getUser,
    updateUser
} from '../services/UserService';
import { validationResult } from "express-validator";
import { registerService }  from '../services/RegisterService'
import mail from '../../middleware/nodemailer'
import templates from '../utils/templatesMail'
import {
    createResponseFormat
} from '../../../helpers/responseFormat'
import {
    MessageResponse
} from '../../../helpers/messageResponse'
let response = createResponseFormat()

//Register
exports.signup = async (req,res,next) => {
    
    logRequest(req)

    const { name, lastname, email, password } = req.body;

    const username = `${req.body.name}${shortid.generate()}`

    try {
        const user = await registerService(username, name, lastname, email, password)

        const html = templates.verifyUser(user.tokenState, user.name, 'http://localhost:8000')

        await mail.sendMail('noreply@test.com',user.email,'Verify User',html)

        response.message = MessageResponse.registerSuccess()
        res.status(200).json(response)

    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
}

module.exports.updatePasswordUserAction = async function (req, res) {

    logRequest(req)

    let { currentPassword, newPassword } = req.body
    //Verifico si el usuario existe en la base de datos
    try {
        let user = await updatePasswordUserService(req.user.id, currentPassword, newPassword);
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

    response.message = 'Se modifico la contraseña con exito'
    res.status(200).json(response)

}

module.exports.updatePasswordAdminAction = async function (req, res) {

    logRequest(req)

    let response = [{
        errors: [],
        message: '',
        data: [],
    }]

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        response[0].errors = errors.array()
        response[0].message = 'La petición no fue exitosa'
        return res.status(400).json(response)
    }

    const user = await updatePasswordAdmin(req.params.id, req.body.password);

    if (!user) {
        response[0].message = 'El usuario con ese ID no existe'
        return res.status(404).json(response)
    }

    response[0].message = 'Se modifico la contraseña con exito'
    res.status(200).json(response)
}

module.exports.addUserAction = async function (req, res) {

    logRequest(req)

    let { name, username, email, password, address, 
        latitude, longitude, role, state } = req.body
    try {
        const user = await addUserService(name, username, email, password, address, 
            latitude, longitude, role, state);
    
        response.data = user
        res.status(201).send(response)
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
    

}

module.exports.getUserAction = async function (req, res) {

    const user = await getUser(req.params.id);
    if (!user)
        return res.status(404).send('No hemos encontrado un usuario con ese ID');

    res.send(user)

}

module.exports.updateUserAction = async function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    try{
        const userUpdate = await updateUser(req.params.id, req.body.username,
        req.body.name, req.body.email, req.body.address,
        req.body.latitude, req.body.longitude);
        res.status(200).send(userUpdate)
    }
    catch(error){
        res.status(400).send({ error:error.message }) 
    }

}