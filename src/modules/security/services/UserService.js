import User from "../models/UserModel";
import Role from "../models/RoleModel";
import bcryptjs from "bcryptjs";
import InvalidPasswordError from '../errors/InvalidPasswordError'

export async function updatePasswordUser (id, currentPassword, newPassword) {
    //Consultar avatar de un usuario
    let user = await User.findById(id)
    if(!user){
        throw new Error("No se encontro un usuario con ese ID")
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

export async function updatePasswordAdmin (id, password) {
    let salt = bcryptjs.genSaltSync(10);
    let hashPassword = bcryptjs.hashSync(password, salt);

    const user = await User.findByIdAndUpdate(id,{
        password: hashPassword,
    })

    const userUpdate = await User.findById(id).populate('role')

    return user;
}

export async function addUser (name, username, email, password, address, latitude, longitude, role, state) {

    let salt = bcryptjs.genSaltSync(10);
    let hashPassword = bcryptjs.hashSync(password, salt);
    let newRole = await Role.findOne({"name": role})

    const user = new User({
        name: name,
        username: username,
        email: email,
        password: hashPassword,
        address: address,
        latitude: latitude,
        longitude: longitude,
        role: newRole,
        state: state,
    });
    
    user.id = user._id;
    await user.save()
    return user;
}

export async function getUser (id) {
    
    const user = await User.findById(id)

    if(!user){
        throw new Error('El usuario con ese ID no esta')
    }  

    return user;
}

export async function updateUser (id, username, name, email, address, latitude, longitude)  {

    const user = await User.findByIdAndUpdate(id, {
        username: username,
        name: name,
        email: email,
        address: address,
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