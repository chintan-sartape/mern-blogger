const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

// Create the Schema and pass it as argument to the model
const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email not valid")
      }
    }
  },
  password: {
    // Goal - required, length 6, trim spaces, validate not conatin "password" lowercase
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
    trim: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Cannot contain -password- as string")
      }
    }
  }

})

// methods are accessible on instances of Models
userSchema.methods.generateAuthToken = async function () {

  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'secretkey')
  return token
}

// static methods are accessible on Models
// Once you separate schema from model, then you can 
// set up middleware
// User.findByCredentials
userSchema.statics.findByCredentials = async (email, password) => {

  const user = await User.findOne({ email: email })
  if (!user) {
    // throw new Error('Unable to Login')
    return ({ "error": "Wrong email" })
  }

  const isMatch = password === user.password
  if (!isMatch) {
    // throw new Error('Unable to Login')
    return ({ "error": "Wrong password" })
  }

  return user;
}

const User = mongoose.model('User', userSchema)

module.exports = User;