import User from '../models/UserModel'
import Role from '../models/RoleModel'
import bcrypt from 'bcrypt'
import shortid from 'shortid'
import jwt from 'jsonwebtoken'
import { logRequest, logError } from '../../logger/logger';
import {
    updatePasswordUserService,
    updatePasswordAdmin,
    addUserService,
    getUser,
    updateUser,
    updateAddressService
} from '../services/UserService';
import { registerService } from '../services/RegisterService'
import mail from '../../middleware/nodemailer'
import templates from '../utils/templatesMail'
import {
    MessageResponse
} from '../../../helpers/messageResponse'

//Register
exports.signup = async (req, res, next) => {

    let response = logRequest(req)

    const { name, lastname, email, password } = req.body;

    const username = `${name}${shortid.generate()}`

    try {
        const user = await registerService(username, name, lastname, email, password)

        const html = templates.verifyUser(user.tokenState, user.name, 'http://localhost:8000')

        await mail.sendMail('noreply@test.com', user.email, 'Verify User', html)

        response.message = MessageResponse.registerSuccess()
        res.status(200).json(response)

    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
}

module.exports.updatePasswordUserAction = async function (req, res) {

    let response = logRequest(req)

    let { currentPassword, newPassword } = req.body
    //Verifico si el usuario existe en la base de datos
    try {
        let user = await updatePasswordUserService(req.user._id, currentPassword, newPassword);
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

    response.message = 'Se modifico la contraseña con exito'
    res.status(200).json(response)

}

module.exports.updatePasswordAdminAction = async function (req, res) {

    let response = logRequest(req)

    const user = await updatePasswordAdmin(req.params.id, req.body.password);

    if (!user) {
        response.message = 'El usuario con ese ID no existe'
        return res.status(404).json(response)
    }

    response.message = 'Se modifico la contraseña con exito'
    res.status(200).json(response)
}

module.exports.addUserAction = async function (req, res) {

    let response = logRequest(req)

    let { name, username, email, password, address,
        latitude, longitude, role, state } = req.body
    try {
        const user = await addUserService(name, username, email, password, address,
            latitude, longitude, role, state);

        response.data = user
        res.status(201).send(response)
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }


}

module.exports.getUserAction = async function (req, res) {

    const user = await getUser(req.params.id);
    if (!user)
        return res.status(404).send('No hemos encontrado un usuario con ese ID');

    res.send(user)

}

module.exports.updateUserAction = async function (req, res) {

    let response = logRequest(req)

    const { username, name, lastname, email, phone, address, latitude, longitude } = req.body

    try {
        const userUpdate = await updateUser(req.params.id, username,
            name, lastname, email, phone, address,
            latitude, longitude);

        response.data = userUpdate
        res.status(200).send(userUpdate);
    }
    catch (error) {
        response.errors.push(error);
        logError(req, error);
        res.status(500).send({ error: error.message });
    }

}

module.exports.updateAddressAction = async function (req, res) {

    let response = logRequest(req)

    const { address } = req.body;

    try {
        const userUpdate = await updateAddressService(req.user._id, address);

        response.data = userUpdate
        res.status(200).send(response);
    }
    catch (error) {
        response.errors.push(error);
        logError(req, error);
        res.status(500).send({ error: error.message });
    }

}