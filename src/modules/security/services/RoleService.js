import Role from "../models/RoleModel";
/**
 * addRoleService
 *
 * @param {string} name
 * @param {[string]} permissions
 * @return {object} 
 */
export const addRoleService = async function (name, permissions) {
    
    const role = new Role({name, permissions})

    await role.save()

    return role

}