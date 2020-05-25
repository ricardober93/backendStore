import User from '../models/UserModel'
import Role from '../models/RoleModel'
import bcrypt from 'bcrypt'
import shortid from 'shortid'
import jwt from 'jsonwebtoken'
import { logRequest } from '../../logger/logger';
import { validationResult } from "express-validator";
import {generateToken} from '../services/authUser'

//Register
exports.signup = async (req,res,next) => {
    
    logRequest(req)

    const { lastname, email, name, password } = req.body;

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
        return next()
    }

    const username = `${req.body.name}${shortid.generate()}`

    const user = new User({
        username,
        name,
        lastname
    })
    user.method = 'local'
    user.local.email = email
    user.local.password = password

    user.local.password = await bcrypt.hash( req.body.password, 12)

    if(req.body.role){
        const {role} = req.body
        const rolesAndPermissions = await Role.findOne({name: role.name})
        user.role = rolesAndPermissions
    } else{
        const defaultRole = await Role.findOne({name:'user'})
        user.role = defaultRole
    }
  
    try {
        await user.save()
        response.msg = 'User is created succesfuly'
        res.status(200).json(response)

    } catch (error) {
        response.errors = true
        response.msg = error
        res.status(500).json(response)
        next()
    }
}

//Login
exports.signin = async (req,res,next) => {
    console.log(req.body)

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
        
        const user = await User.findOne({'local.email': email})
        if(!user){
            response.msg = 'No existe el usuario'
            res.status(401).json(response) 
            next()
        }
        else{
            if(!bcrypt.compare(password,user.local.password))
            {
                response.msg = 'Contraseña incorrecta'
                res.status(401).json(response)
                next()
            }
            //All right
            else{
                const sendToken = await generateToken(user)
                response.data = sendToken
                res.status(200).json(response)
                next()
            }
        }
    } catch (error) {
        console.error(error)
        next()
    }
}

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