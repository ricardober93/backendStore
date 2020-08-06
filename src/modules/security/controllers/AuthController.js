import jsonwebtoken from "jsonwebtoken";
import { logRequest } from '../../logger/logger'
const { validationResult } = require('express-validator');
import { authService, authMethodService } from '../services/AuthService'
import axios from 'axios'

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

    let { token, method } = req.body;
    let user = null

    //Exec validations
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()[0].msg})
    }
    
    switch (method) {
        case 'google':
            axios.post(`/https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            break;
        case 'facebook':
            axios.post(`https://graph.facebook.com/?id=10219731834621378&access_token=${token}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            break;
        default:
            user = null
            break;
    }

    try {
        const authResult = await authMethodService(email, token, method)

        if(authResult.status === false){
            return res.status(403).send({message: authResult.msg});
        }

        return res.status(200).json({"token": authResult.token, "user": authResult.user});
    } catch (error) {
        return res.status(500).json({"error": error});
    }
    

}