import Role from '../models/RoleModel'
import { logRequest, logError } from '../../logger/logger'
import { addRoleService } from '../services/RoleService'
import {
    createResponseFormat
} from '../../../helpers/responseFormat'
let response = createResponseFormat()

exports.addRoleAction = async (req,res,next) => {
    
    logRequest(req)

    const { name, permissions } = req.body;

    const role = await addRoleService(name, permissions)

    try {
        response.data = roles
        return res.status(201).send(response)
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
}