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
        method: "local",
        username: "admin",
        email: "admin@gmail.com",
        password: hashPassword,
        google_id: "admin@admin.com",
        facebook: "admin@admin.com",
        name: "admin",
        lastname: "root",
        avatar: 'assets/img.js',
        state: true,
        role: newRole._id,
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