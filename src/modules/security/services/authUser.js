import jwt from 'jsonwebtoken'
import Role from '../models/RoleModel'
import passport from 'passport'


exports.generateToken = async (user) => {
    const {role,_id} = user
    
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

exports.validateToken = (req, res, next) => {
    const tokenHeader = req.get('Autorization')

    if (!tokenHeader) {
      const error = new Error('No estas autorizado')
      error.codeStatus = 401
      throw error
}
    
    //Verify token
    const token = tokenHeader.split('  ')[1]
    let verfiyToken
    try {
        verfiyToken = jwt.verify(token,'REEMPLACEN')
    } catch (error) {
        error.statusCode = 500
        throw error
    }

    //Verify others errors
    if(!verfiyToken){
        const error = new Error('Token expirado, vuelve a inicar sesion')
        res.status(401).json(error)
        throw error
    }
    next()
}

exports.googleScope = passport.authenticate('google',{scope:['profile','email']})

exports.google = passport.authenticate('google')

exports.facebook = passport.authenticate('facebook')