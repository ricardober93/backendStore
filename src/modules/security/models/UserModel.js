import {
  Schema,
  model
} from "mongoose";

const UserModel = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String
  },
  google_id: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
  },
  address: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  avatar: {
    type: String,
    default: 'assets/avatar/user.png'
  },
  state: {
    type: Boolean,
    default: false
  },
  role: {
    type: Schema.ObjectId,
    ref: 'role'
  }
})

const User = model('user', UserModel)

export default User