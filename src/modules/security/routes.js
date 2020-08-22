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
import { authAction, authMethodAction } from "./controllers/AuthController";
import { authToken } from '../middleware/auth'

//Users
//Signup
router.post('/api/signup', signupActionMiddleware, signup)
//Agregar un usuario
router.post('/api/user', [authToken], addUserAction);
//Encontrar un usuario
router.get('/api/user/:id', getUserAction);
//Actualizar un usuario
router.put('/api/user/:id', [authToken], updateUserAction);

//Change password
router.put('/api/user/password', [authToken], updatePasswordUserAction);
//Luego ver porque es users y no user
router.put('/api/users/password/:id', [authToken], updatePasswordAdminAction);

//AUTH
router.post('/api/auth', authActionMiddleware, authAction);
router.post('/api/auth-method', authMethodAction);

/* //Dashboard TEST Authentication token
router.get("/profile", Auth.validateToken); */

//Roles
//Add role
router.post("/api/role", Role.addRole);

export default router
