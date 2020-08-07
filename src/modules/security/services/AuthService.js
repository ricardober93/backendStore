import User from "../models/UserModel";
import Role from "../models/RoleModel";
import bcryptjs from 'bcryptjs'
import jsonwebtoken from "jsonwebtoken";

function generateToken(user, roleName){
    let token = jsonwebtoken.sign(
        {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            ddi: user.ddi,
            ddn: user.ddn,
            phone: user.phone,
            email: user.email,
            role: {name: roleName},
            avatar:process.env.URL_BACKEND+'/'+user.avatar
        },
        process.env.JWT_SECRET,
        { expiresIn: '10d' }
    )
    return token
}

export const authService = async function (email, password) {
    
    const user = await User.findOne({email: email}).populate('role')

    if(!user) {
        throw ('El usuario no existe')
    }
    if(user.state === false){
        return {status: false, msg:'Disabled user'};
    }

    const validPassword = bcryptjs.compareSync(password, user.password)
    
    if (!validPassword) {
        return {status: false, msg:'The username or password is invalid'};
    }

    const token = generateToken(user, user.role.name)

    return { status:true, user, token, msg: "User successfully validated"}

}

export const authMethodService = async function (email, name, lastname, google_id) {

    let user = await User.findOne({ email: email }).populate('role')

    if(user){
        if(user.state === false){
            return {status: false, msg:'Disabled user'};
        }
        
        const token = generateToken(user, user.role.name)
    
        return { status:true, user: user, token, msg: "User successfully validated"}
        
    } else {
        
        const role = await Role.findOne({name: 'user'})

        let newUser = new User({
            username: name+google_id,
            name,
            lastname,
            email,
            google_id,
            role,
            state: true,
        })

        newUser.id = newUser._id
        await newUser.save()

        const token = generateToken(newUser, role.name)
    
        return { status:true, user: newUser, token, msg: "User successfully validated"}
    }

}