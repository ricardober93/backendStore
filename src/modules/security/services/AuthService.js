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
    console.log(user)
    const validPassword = bcryptjs.compareSync(password, user.password)
    
    if (!validPassword) {
        return {status: false, msg:'The username or password is invalid'};
    }

    const token = generateToken(user, user.role.name)

    return { status:true, user, token, msg: "User successfully validated"}

}

export const authMethodService = async function (auth, token, method) {

    var user = null
    switch (method) {
        case 'google':

            user = await User.findOne({ email: auth }).populate('role')

            if(user){
                if(user.state === false){
                    return {status: false, msg:'Disabled user'};
                }
                
                const token = generateToken(user, user.role.name)
            
                return { status:true, user: user, token, msg: "User successfully validated"}
                
            } else {
                const role = await Role.findOne({name: 'user'})

                let newUser = new User({
                    email: auth,
                    google_id: token,
                    role: role,
                    state: true,
                });

                newUser.id = newUser._id;
                await cart.save()

                const token = generateToken(newUser, role.name)
            
                return { status:true, user: newUser, token, msg: "User successfully validated"}
            }

        case 'facebook':
            user = await User.findOne({ facebook_id: token }).populate('role')

            if(user){

                if(user.state === true){
                    return {status: false, msg:'Disabled user'};
                }

                const token = generateToken(user, user.role.name)

                return { status:true, user: user, token, msg: "User successfully validated"}

            } else {

                const role = await Role.findOne({name: 'user'})

                let newUser = await User.create({
                    facebook_id: auth,
                    role: role,
                    state: true,
                });
                
                const token = generateToken(newUser, role.name)
            
                return { status:true, user: newUser, token, msg: "User successfully validated"}
            }

        default:
            return user
    }

}