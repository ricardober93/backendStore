import { Router } from "express";
const router = Router();
import {
    signup, verify, 
    updatePasswordUserAction, 
    updatePasswordAdminAction, 
    addUserAction, 
    getUserAction, 
    updateUserAction
}  from "./controllers/UserControllers";
import Role from "./controllers/RoleController";
import {authAction, authMethodAction} from "./controllers/AuthController";

//Users
//Signup
router.post('/signup', signup)
//Agregar un usuario
router.post('/api/user', addUserAction);
//Encontrar un usuario
router.get('/api/user/:id', getUserAction);
//Actualizar un usuario
router.put('/api/user/:id', updateUserAction);

//Change password
router.put('/api/user/password', updatePasswordUserAction);
//Luego ver porque es users y no user
router.put('/api/users/password/:id' , updatePasswordAdminAction);

//AUTH
router.post('/api/auth', authAction);
router.post('/api/auth-method', authMethodAction);

/* //Dashboard TEST Authentication token
router.get("/profile", Auth.validateToken); */

//Roles
//Add role
router.post("/role", Role.addRole);

export default router
