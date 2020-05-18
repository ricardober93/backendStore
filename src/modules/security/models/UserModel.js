import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'assets/avatar/user.png'
  },
  state: {
    type: Boolean
  },
  tokenPassword: {
    type: String
  },
  _expirationPassword: {
    type: String
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'role'
  }
})

const User = mongoose.model('user', UserModel)

export default User