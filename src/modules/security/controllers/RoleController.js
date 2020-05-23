import Role from '../models/RoleModel'

exports.addRole = async (req,res,next) => {
    //AUTHORIZATE ONLY ADMIN

    const { name, permissions } = req.body;
    if(!name || !permissions[0]) {
        res.status(400).json({ error:true, message: 'Todos los campos son obligatorios'})
        return next()
    }

    const role = new Role({name, permissions})
    try {
        await role.save()
    } catch (error) {
        console.log(error)
        res.json({message: 'Error al crear el rol'})
        next()
    }
}