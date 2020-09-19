import Role from "../models/RoleModel";
import {
    logError
} from '../../logger/logger'
import {
    MessageResponse
} from '../../../helpers/messageResponse'
/**
 * addRoleService
 *
 * @param {string} name
 * @param {[string]} permissions
 * @return {object} 
 */
export const addRoleService = async function (name, permissions) {
    try {
        const role = new Role({ name, permissions })

        await role.save()

        return role
    } catch (error) {
        logError('addRoleService', error)
        throw (MessageResponse.serviceCatch(error))
    }

}