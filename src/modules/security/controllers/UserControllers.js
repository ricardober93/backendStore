import User from '../models/UserModel'
import Role from '../models/RoleModel'
import bcrypt from 'bcrypt'
import shortid from 'shortid'
import jwt from 'jsonwebtoken'
import { logRequest } from '../../logger/logger';
import {   
    updatePasswordUser,
    updatePasswordAdmin,
    addUser,
    getUser,
    updateUser
} from '../services/UserService';
import { validationResult } from "express-validator";
import { registerService }  from '../services/RegisterService'
import mail from '../../middleware/nodemailer'
import templates from '../utils/templatesMail'

//Register
exports.signup = async (req,res,next) => {
    
    logRequest(req)

    const { lastname, email, name, password, role } = req.body;

    let response = {
        errors: [],
        msg: '',
        data: {},
    }
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.errors = errors.array()
        response.msg = 'La petición no fue exitosa'
        res.status(400).json(response) 
        next()
    }

    //Validate fields required in models User
    if( !name || !lastname || !email || !password ){
        response.errors = true
        response.msg = 'Todos los campos son obligatorios'
        res.status(400).json(response)
        return; 
    }

    //Validate email unique
    let emailUnique = await User.findOne({'email' : email});

    if(emailUnique){
        response.errors = true
        response.msg = 'El email que ingresaste ya está registrado'
        res.status(400).json(response)
        return; 
    }

    const username = `${req.body.name}${shortid.generate()}`

    const user = await registerService(username, name, lastname, email, password, role)

    try {
        const html = templates.verifyUser(user.tokenState, user.name, 'http://localhost:8000')

        await mail.sendMail('noreply@test.com',user.email,'Verify User',html)

        response.msg = 'User is created succesfuly, verify you email'
        res.status(200).json(response)

    } catch (error) {
        response.errors = true
        response.msg = error
        res.status(500).json(response)
        console.error(error)
        next(error)
    }
}

module.exports.updatePasswordUserAction = async function (req, res) {

    logRequest(req)
    
    let response = {
        errors: [],
        message: '',
        data: {},
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.errors = errors.array()
        response.message = 'La petición no fue exitosa'
        return res.status(400).json(response) 
    }

    //Verifico si el usuario existe en la base de datos
    try {
        let user = await updatePasswordUser(req.user.id, req.body.currentPassword, req.body.newPassword);

        if (!user) {
            response.errors.push({ param: "id", msg: "El usuario con ese ID no existe" })
            return res.status(400).json(response)
        }
    }
    catch (error) {
        if (error instanceof InvalidPasswordError) {
            response.errors.push({ param: "currentPassword", msg: error.message })
            return res.status(400).json(response)
        }
        response.errors.push({ msg: error.message })
        return res.status(400).json(response)
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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const user = await addUser(req.body.name, req.body.username,
        req.body.email, req.body.password, req.body.address, 
        req.body.latitude, req.body.longitude, req.body.role,
        req.body.state);
    const result = await user.save();

    res.status(201).send(user)

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