import Role from '../models/RoleModel'
import User from '../models/UserModel'
import bcrypt from 'bcrypt'
import randomString from 'crypto-random-string'

exports.registerService = async (username, name, lastname, email, password, role) => {
    
    const user = new User({
        username,
        name,
        lastname
    })
    user.method = 'local'
    user.email = email
    user.password = password

    user.password = await bcrypt.hash( password, 12 )

    if(role){
        const rolesAndPermissions = await Role.findOne({name: role.name})
        user.role = rolesAndPermissions
    } else{
        const defaultRole = await Role.findOne({'name':'user'})
        user.role = defaultRole
    }

    //Generate token active account
    const tokenState = randomString({length:8,type:'numeric'})
    user.tokenState = tokenState

    let result = await user.save()
    
    return result
}
