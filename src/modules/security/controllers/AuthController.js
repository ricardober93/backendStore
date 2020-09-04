import jsonwebtoken from "jsonwebtoken";
import { logRequest, logError } from '../../logger/logger'
import { authService, authMethodService } from '../services/AuthService'
import {
    createResponseFormat
} from '../../../helpers/responseFormat'
let response = createResponseFormat()

module.exports.authAction = async function (req, res) {

    logRequest(req)

    try {
        const authResult = await authService(req.body.email, req.body.password)

        if (authResult.status === false) {
            response.message = authResult.msg
            return res.status(403).send(message);
        }

        response.data = { "token": authResult.token, "user": authResult.user }
        return res.status(200).json(response);
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

}

module.exports.authMethodAction = async function (req, res) {

    logRequest(req)

    let { email, givenName, familyName, googleId } = req.body;

    try {
        let authResult = await authMethodService(email, givenName, familyName, googleId)
        response.data = { "token": authResult.token, "user": authResult.user }
        return res.status(200).json(response);
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

}