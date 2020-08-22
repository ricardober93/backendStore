import Role from '../models/RoleModel'
import User from '../models/UserModel'
import bcrypt from 'bcrypt'
import randomString from 'crypto-random-string'

exports.registerService = async (username, name, lastname, email, password, role) => {
    
    user.password = await bcrypt.hash( password, 12 )

    const defaultRole = await Role.findOne({'name':'user'})

    const user = new User({
        username,
        name,
        email,
        lastname,
        password,
        role: defaultRole
    })

    let result = await user.save()
    
    return result
}
