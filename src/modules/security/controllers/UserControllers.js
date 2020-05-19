import User from '../models/UserModel'
import Role from '../models/Role'
import bcrypt from 'bcrypt'
import shortid from 'shortid'
import jwt from 'jsonwebtoken'
import {generateToken} from '../services/authUser'

//Register
exports.signup = async (req,res,next) => {
    const { lastname, email, name, password } = req.body;

    //Validate fields required in models User
    if( !name || !lastname || !email || !password ){
        res.status(400).json({error: true, message: 'Todos los campos son obligatorios'})
        return next()
    }

    const username = `${req.body.name}${shortid.generate()}`

    const user = new User({
        username,
        name,
        lastname,
        email,
        password
    })

    user.password = await bcrypt.hash( req.body.password, 12)

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
        res.status(200).json({message: 'User is created succesfuly'})

    } catch (err) {

        res.status(500).json({error: true, message: err})
        console.log(err)
        next()
    }
}

//Login
exports.signin = async (req,res,next) => {

    const { password, email } = req.body;

    if(password == '' || email == ''){
        res.json({message: 'Todos los campos son obligatorios'})
        next()
    }

    try {
        
        const user = await User.findOne({email})
        if(!user){
            res.status(401).json({message:'No existe el usuario'})
            next()
        }
        else{
            if(!bcrypt.compare(user.password, password)){
                res.status(401).json({message:'Contraseña incorrecta'})
                next()
            }
            //All right
            else{
                const sendToken = await generateToken(user)
                res.status(200).json(sendToken)
            }
        }

    } catch (error) {
        console.log(error)
        next()
    }
}