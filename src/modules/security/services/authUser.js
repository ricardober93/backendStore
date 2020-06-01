import jwt from 'jsonwebtoken'
import Role from '../models/RoleModel'
import passport from 'passport'

exports.generateToken = async (user) => {
    const {role} = user
    
    const viewRole = await Role.findById(role)
    const exp = viewRole.name == 'admin' ? '5h' : '1h'

    const token = jwt.sign({
            id: user.id,
            role: viewRole.name
        }, 'REEMPLACEN',{
            expiresIn: exp 
        })
    return {
            token: token
        }
}

exports.passwordOldToken = (user) =>{
    const {id,local:{password}} = user
    
    const secret = password + id
    
    const token = jwt.sign({
        id
    },secret,{expiresIn:'1h'})

    return token;
}

exports.validateToken = (req, res, next) => {
    const tokenHeader = req.get('Autorization')

    let response = {
        errors: [],
        msg: ''
    }

    if (!tokenHeader) {
        response.errors = true
        response.msg = 'No estas autorizado, vuelve a iniciar sesion'
        res.status(401).json(response)
        const error = new Error('No estas autorizado')
        error.codeStatus = 401
        throw error
        
}
    
    //Verify token
    const token = tokenHeader.split(' ')[1]
    let verifyToken
    try {
        verifyToken = jwt.verify(token,'REEMPLACEN')
    } catch (error) {
        response.errors=true
        response.msg = 'Token invalido'
        res.status(401).json(response)
        throw error
    }

    //Verify others errors
    if(!verifyToken){
        response.errors = true
        response.msg = 'Token expirado, vuelve a iniciar sesion'
        res.status(401).json(response)
        const error = new Error('No estas autorizado')
        error.codeStatus = 401
        throw error
    }
    const user = verifyToken.id
    const role = verifyToken.role

    next()
}

exports.googleScope = passport.authenticate('google',{scope:['profile','email']})

exports.google = passport.authenticate('google')

exports.facebook = passport.authenticate('facebook')