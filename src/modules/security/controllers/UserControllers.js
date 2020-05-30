import User from '../models/UserModel'
import Role from '../models/RoleModel'
import bcrypt from 'bcrypt'
import shortid from 'shortid'
import jwt from 'jsonwebtoken'
import { logRequest } from '../../logger/logger';
import { validationResult } from "express-validator";
import { generateToken, passwordOldToken }  from '../services/authUser'
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
    let emailUnique = await User.findOne({'local.email' : email});

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

        await mail.sendMail('noreply@test.com',user.local.email,'Verify User',html)

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

//Verify user
exports.verify = async (req,res,next)=>{

    logRequest(req)

    const {tokenState} = req.body;

    let response = {
        errors: [],
        msg: ''
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.errors = errors.array()
        response.msg = 'La petición no fue exitosa'
        return res.status(400).json(response) 
        
    }


    const user = await User.findOne({'tokenState':tokenState.trim()})

    if(!user){
        response.errors = true
        response.msg = 'Codigo incorrecto'
        return res.status(401).json(respones)
    }

    user.state = true
    user.tokenState = ''

    try {
        await user.save()
        response.msg = 'Verificacion exitosa, inicia sesion'
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        next(error)
    }

}

//Login
exports.signin = async (req,res,next) => {

    logRequest(req)
    
    const { password, email } = req.body;
    
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

    if(password == '' || email == ''){
        res.json({msg: 'Todos los campos son obligatorios'})
        next()
    }

    try {
        console.log(email)
        const user = await User.findOne({'local.email': email})
        console.log(user)
        if(!user){
            response.msg = 'No existe el usuario'
            return res.status(401).json(response) 
        }

        //Status true o false in user
        if(!user.state){
            response.msg = 'Verifica tu correo electronico'
            return res.status(401).json(response)
        }

        if(!bcrypt.compare(password,user.local.password))
            {
                response.msg = 'Contraseña incorrecta'
                return res.status(401).json(response)
            }
            //All right
        const sendToken = await generateToken(user)
        response.data = sendToken
        res.status(200).json(response)
        next()

    } catch (error) {
        console.error(error)
        next(error)
    }
}

//Login facebook or google
exports.loginStrategy = async (req,res,next)=>{
    
    logRequest(req)
    
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

    const sendToken = await generateToken(req.user)
    response.data = sendToken
    res.status(200).json(response)
    next()
}

exports.resetPassword = async (req,res,next)=>{
    const email = req.params.email

    const user = await User.findOne({'local.email': email})
    if(!user){
        res.status(404).json({msg:'No existe el usuario'})
    }

    try {
        const token = await passwordOldToken(user)
        const url = `${req.headers.host}/reset-password/${user.id}/${token}`
        const html = templates.changePassword(user.name,url)
    
        await mail.sendMail('noreply@test.com',user.local.email,'Change Password',html)
        res.status(200).json({msg:'Revisa tu correo'})
    } catch (error) {
        console.log(error)
        next(error)
    }
    
}

exports.changePassword = async (req,res,next)=>{
    const {userid,token} = req.params
    const {newPassword} = req.body

    const user = await User.findById(userid)

    if(!user){
        res.json({msg:'No existe el usuario'})
    }

    const secret = user.local.password + user.id
    const payload = jwt.decode(token,secret)

    try {
        if(payload.id == user.id ){

            const password = await bcrypt.hash(newPassword,12)

            user.local.password = password
            await user.save()

            res.status(200).json({msg:'Password changed, login'})
            next()
        }

        res.status(401).json({msg:'Credencial expirado'})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Ha ocurrido un error'})
    }
}