import jsonwebtoken from "jsonwebtoken";
import { logRequest } from '../../logger/logger'
const { validationResult } = require('express-validator');
import { authService, authMethodService } from '../services/AuthService'

module.exports.authAction = async function (req, res) {

    logRequest(req)

    //Exec validations
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()[0].msg})
    }

    try {
        const authResult = await authService( req.body.email, req.body.password)

        if(authResult.status === false){
            return res.status(403).send({message: authResult.msg});
        }

        return res.status(200).json({"token": authResult.token, "user": authResult.user});
    } catch (error) {
        return res.status(500).json({"error": error});
    }
    

}

module.exports.authMethodAction = async function (req, res) {

    logRequest(req)

    let { email, givenName, familyName, googleId } = req.body;

    try {

        let authResult = await authMethodService(email, givenName, familyName, googleId)
        
        if(authResult.status === false){
            return res.status(403).send({message: authResult.msg});
        }

        return res.status(200).json({"token": authResult.token, "user": authResult.user});
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({"error": error});
    }
    

}