import RBAC from './rbac'
import roleConfigPromise from './rolesConfigMongo'

const rbac = function () {

    return new Promise((resolve, reject) => {
        roleConfigPromise.then(roleConfig => {
            resolve(new RBAC(roleConfig))
        })

    })
}

export default rbac;
