import {Schema,model} from "mongoose";
import uniqueValidator from "mongoose-unique-validator"

const UserModel = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowerCase: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type:String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    // default: 'assets/avatar/user.png'
  },
  state: {
    type: Boolean,
    default: false
  },
  tokenPassword: {
    type: String,
    default: null
  },
  expirationPassword: {
    type: String,
    default: null
  },
  role: {
    type: Schema.ObjectId,
    ref: 'role'
  }
})

//Methods
UserModel.plugin(uniqueValidator)

const User = model('user', UserModel)

export default User


