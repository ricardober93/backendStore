import Role from '../src/modules/security/models/RoleModel'
import User from '../src/modules/security/models/UserModel'
import bcryptjs from 'bcryptjs'

export const initSecurity = function () {

    const newRole = new Role({
        name: "admin",
        permissions: ["LIST_ROLES_PERMISSION", "LIST_USER", "CREATE_USER", "EDIT_USER", "DELETE_USER", "MY_PROFILE"]
    })
    newRole.id = newRole._id;
    newRole.save()
    
    let salt = bcryptjs.genSaltSync(10);
    let hashPassword = bcryptjs.hashSync("123123", salt);

    const newUser = new User({
        username: "admin",
        email: "admin@admin.com",
        password: hashPassword,
        name: "admin",
        lastname: "root",
        role: newRole._id,
        state: true,
        avatar: 'assets/img.js'
    })
    newUser.id = newUser._id;
    newUser.save()

    const newRoleUser = new Role({
        name: "user",
        permissions: ["MY_PROFILE"]
    })
    newRoleUser.id = newRoleUser._id;
    newRoleUser.save()

    console.log("Se creo el usuario: admin, con la contraseña: 123123")
    return;

}