import Role from '../models/RoleModel'
import User from '../models/UserModel'
import bcrypt from 'bcrypt'
import randomString from 'crypto-random-string'
/**
 *
 *
 * @param {string} username
 * @param {string} name
 * @param {string} lastname
 * @param {string} email
 * @param {string} password
 * @return {object} 
 */
export const registerService = async (username, name, lastname, email, password) => {
    
    hashPassword = await bcrypt.hash( password, 12 )

    const defaultRole = await Role.findOne({'name':'user'})

    const user = new User({
        username,
        name,
        email,
        lastname,
        password: hashPassword,
        role: defaultRole
    })

    await user.save()
    
    return user
}
