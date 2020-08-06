import { Router } from "express";
const router = Router();
import User from "./controllers/UserControllers";
import Role from "./controllers/RoleController";
import {authAction, authMethodAction} from "./controllers/AuthController";

    //Users
    //Signup
    router.post('/signup', User.signup)
    //Verify user
    router.post('/auth/verify', User.verify)

    //Change password
    router.post('/reset-password/:email',User.resetPassword)
    router.post('/reset-password/:userid/:token',User.changePassword)

    //AUTH
    router.post('/api/auth', authAction);
    router.post('/api/auth-method', authMethodAction);

    /* //Dashboard TEST Authentication token
    router.get("/profile", Auth.validateToken); */

    //Roles
    //Add role
    router.post("/role", Role.addRole);

export default router
