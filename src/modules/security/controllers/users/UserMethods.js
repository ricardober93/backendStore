import User from '../../models/UserModel'
import Role from '../../models/RoleModel'
import shortid from 'shortid'

exports.getUserByIdStrategy = async(method,id)=>{
     if(method == 'google'){
          return await User.findOne({'google.id': id})
     }
     return await User.findOne({'facebook.id': id})
}

exports.getUserByIdDb = async(user) =>{
     return await User.findById(user.id)
}

exports.createUserStrategy = async (method,user)=>{
     const newUser = new User()
     newUser.method = method

     if(method == 'google'){
          //Create user Google
          newUser.username = `${user.name.givenName}${shortid.generate()}`
          newUser.google.email = user.emails[0].value
          newUser.name = user.name.givenName
          newUser.lastname = user.name.familyName
          newUser.google.id = user.id
          newUser.provide = user.provider    
     } else{
          //Create user Facebook
          newUser.username = `${user.name.givenName}${shortid.generate()}`
          newUser.facebook.email = user.emails[0].value
          newUser.name = user.name.givenName
          newUser.lastname = user.name.familyName
          newUser.facebook.id = user.id
          newUser.provide = user.provider
     }
     const defaultRole = await Role.findOne({name:'user'})
     newUser.role = defaultRole
     
     try {
          return await newUser.save()
     } catch (error) {
          console.log(error)
     }
}