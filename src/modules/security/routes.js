import { Router } from 'express'
const router = Router()
import User from './controllers/UserControllers'
import Role from './controllers/RoleController'
import Auth from './services/authUser'

    //Users
        //Signup
    router.post('/signup', User.signup)
        //Signin
    router.post('/signin', User.signin)

        //Login Google
    router.get('/auth/google',Auth.googleScope)
    router.get('/auth/google/redirect',
                Auth.google,
                User.loginStrategy
    )

        //Login Facebook
    router.get('/auth/facebook', Auth.facebook);
    router.get('/auth/facebook/callback',
                Auth.facebook,
                User.loginStrategy
    );

    //Dashboard TEST Authentication token
    router.get('/profile', Auth.validateToken)


    //Roles
        //Add role
    router.post('/role', Role.addRole)

export default router
