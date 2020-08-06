import {
  Schema,
  model
} from "mongoose";
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
    trim: true,
    unique: true,
    lowerCase: true
  },
  password: {
    type: String
  },
  google_id: {
    type: String,
    trim: true,
    unique: true,
    lowerCase: true
  },
  facebook_id: {
    type: String,
    trim: true,
    unique: true,
    lowerCase: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    // default: 'assets/avatar/user.png'
  },
  tokenState:String,
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