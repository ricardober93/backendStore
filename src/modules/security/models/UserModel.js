import {
  Schema,
  model
} from "mongoose";
import uniqueValidator from "mongoose-unique-validator"

const UserModel = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  local: {
    email: {
      type: String,
      trim: true,
      unique: true,
      lowerCase: true
    },
    password: {
      type: String
    }
  },
  google: {
    email: {
      type: String,
      trim: true,
      unique: true,
      lowerCase: true
    },
    id: {
      type: String
    }
  },
  facebook: {
    email: {
      type: String,
      trim: true,
      unique: true,
      lowerCase: true
    },
    id: {
      type: String
    }
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