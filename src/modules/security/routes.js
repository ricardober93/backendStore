import { Router } from "express";
const router = Router();
import {
    signup, verify, 
    updatePasswordUserAction, 
    updatePasswordAdminAction, 
    addUserAction, 
    getUserAction, 
    updateUserAction,
    updateAddressAction
}  from "./controllers/UserControllers";
import Role from "./controllers/RoleController";
import { authAction, authMethodAction } from "./controllers/AuthController";
import { authToken } from '../middleware/auth'
import {
    signupActionMiddleware,
    addUserActionMiddleware
} from './middleware/requests/userMiddleware'
import {
    authActionMiddleware
} from './middleware/requests/authMiddleware'

//Users
//Signup
router.post('/api/signup', signupActionMiddleware, signup)
//Agregar un usuario
router.post('/api/user', [authToken, addUserActionMiddleware], addUserAction);
//Encontrar un usuario
router.get('/api/user/:id', getUserAction);
//Actualizar un usuario
router.put('/api/user/:id', authToken, updateUserAction);

// Actualizar direccion del usuario
router.put('/api/user/address', updateAddressAction);
//Change password
router.put('/api/user/password', [authToken], updatePasswordUserAction);
//Luego ver porque es users y no user
router.put('/api/users/password/:id', [authToken], updatePasswordAdminAction);

//AUTH
router.post('/api/auth', authAction);
router.post('/api/auth-method', authMethodAction);

/* //Dashboard TEST Authentication token
router.get("/profile", Auth.validateToken); */

//Roles
//Add role
router.post("/api/role", Role.addRoleAction);

export default router
