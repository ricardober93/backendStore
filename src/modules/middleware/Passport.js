require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
import passport from 'passport'
import User from '../security/models/UserModel'
import {getUserByIdStrategy,getUserByIdDb,createUserStrategy} from '../security/controllers/users/UserMethods'

passport.serializeUser(function(user,done){
     return done(null,user.id)
})

passport.deserializeUser(async function(id,done){
     User.findById(id).then(user=>{
          return done(null,id)
     })
})
//Google
passport.use(
     new GoogleStrategy({
          clientID: process.env.API_GOOGLE_OAUTH_ID,
          clientSecret: process.env.API_GOOGLE_OAUTH_SECRET,
          callbackURL: 'http://localhost:4000/auth/google/redirect'
     },async (accessToken,refreshToken,profile,done)=>{
          console.log(accessToken)

          const userFind = await getUserByIdStrategy('google',profile.id)
          
          if(!userFind){
               const newUser = await createUserStrategy('google',profile)
               console.log('New user is: ',newUser)
               return newUser? done(null,newUser) : done(null,false)
          }
          
          done(null,userFind)
     })
)

//Facebook
passport.use(
     new FacebookStrategy({
          clientID: process.env.API_FACEBOOK_CLIENTID,
          clientSecret: process.env.API_FACEBOOK_SECRET,
          callbackURL: 'http://localhost:8000/auth/facebook/callback'
     },async (accessToken,refreshToken,profile,done)=>{
          console.log(accessToken,profile,done)

          const userFind = await getUserByIdStrategy('facebook',profile.id)
          
          if(!userFind){
                const newUser = await createUserStrategy('google',profile)
               console.log('New user is: ',newUser)
                return newUser? done(null,newUser) : done(null,false)
           }
           done(null,userFind)
     })
)