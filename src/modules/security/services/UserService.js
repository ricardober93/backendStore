import User from "../models/UserModel";
import Role from "../models/RoleModel";
import bcryptjs from "bcryptjs";
import InvalidPasswordError from '../errors/InvalidPasswordError'
import {
    MessageResponse
} from '../../../helpers/messageResponse'

/**
 *
 *
 * @export
 * @param {string} id
 * @param {string} currentPassword
 * @param {string} newPassword
 * @return {object} 
 */
export async function updatePasswordUserService (id, currentPassword, newPassword) {
    console.log('id', id)
    let user = await User.findById(id)
    console.log(user);

    if(!user){
        throw (MessageResponse.notFound())
    }
    
    //Valido si la contraseña actual coincide con la almacenada en la DB
    const validPassword = bcryptjs.compareSync(currentPassword, user.password)
    
    if (!validPassword) {
        throw new InvalidPasswordError()
    }

    //Encripto la contraseña y la actualizo en la DB
    let salt = bcryptjs.genSaltSync(10);
    let hashPassword = bcryptjs.hashSync(newPassword, salt);

    let userUpdate = await User.findByIdAndUpdate(id, {
        password: hashPassword,
    })

    return userUpdate;
}
/**
 * updatePasswordAdmin
 *
 * @export
 * @param {string} id
 * @param {string} password
 * @return {object} 
 */
export async function updatePasswordAdmin (id, password) {
    let salt = bcryptjs.genSaltSync(10);
    let hashPassword = bcryptjs.hashSync(password, salt);

    const user = await User.findByIdAndUpdate(id,{
        password: hashPassword,
    })

    const userUpdate = await User.findById(id).populate('role')

    return user;
}

/**
 *
 *
 * @export
 * @param {string} name
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} address
 * @param {string} latitude
 * @param {string} longitude
 * @param {string} role
 * @param {boolean} state
 * @return {object} 
 */
export async function addUserService (name, username, email, password, address, latitude, longitude, role, state) {

    let salt = bcryptjs.genSaltSync(10);
    let hashPassword = bcryptjs.hashSync(password, salt);
    let newRole = await Role.findOne({"name": role})

    const user = new User({
        name,
        username,
        email,
        password: hashPassword,
        address,
        latitude,
        longitude,
        role: newRole,
        state,
    });
    user.id = user._id;
    await user.save()
    
    return user;
}
/**
 *
 *
 * @export
 * @param {string} id
 * @return {object} 
 */
export async function getUser (id) {
    
    const user = await User.findById(id)

    if(!user){
        throw new Error('El usuario con ese ID no esta')
    }  

    return user;
}

/**
 *
 *
 * @export
 * @param {string} id
 * @param {string} username
 * @param {string} name
 * @param {string} lastname
 * @param {string} email
 * @param {number} phone
 * @param {string} address
 * @param {string} latitude
 * @param {string} longitude
 * @return {object} 
 */
export async function updateUser (id, username, name, lastname, email, phone, address, latitude, longitude)  {

    const user = await User.findByIdAndUpdate(id, {
        username,
        name,
        lastname,
        email,
        phone,
        address,
        latitude: latitude,
        longitude: longitude
    }) 

    if(!user){
       throw new Error('El usuario con ese ID no esta')
    }

    const userUpdate = await User.findById(id).populate('role')

    if(!userUpdate){
        throw new Error('Hubo un error al encontrar al usuario')
    }

    return userUpdate;
}
/**
 *
 *
 * @export
 * @param {string} id
 * @param {string} address
 * @return {object} 
 */
export async function updateAddressService (id, address)  {

    const user = await User.findByIdAndUpdate(id, {
        address
    }) 

    if(!user){
       throw new Error('El usuario con ese ID no esta')
    }

    const userUpdate = await User.findById(id).populate('role')

    if(!userUpdate){
        throw new Error('Hubo un error al encontrar al usuario')
    }

    return userUpdate;
}