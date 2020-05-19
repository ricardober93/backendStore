import { Router } from 'express'
const router = Router()
import User from './controllers/UserControllers'
import Role from './controllers/RolController'
import Auth from './services/authUser'

module.exports = () =>{
    //Users
        //Signup
    router.post('/signup', User.signup)
        //Signin
    router.post('/signin', User.signin)

    //Dashboard TEST Authentication token
    router.get('/profile', Auth.validateToken)


    //Roles
        //Add role
    router.post('/role', Role.addRole)

    return router
}
