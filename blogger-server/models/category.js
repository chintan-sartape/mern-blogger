const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

// Create the Schema and pass it as argument to the model
const categorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true,
    trim: true
  },

})

// methods are accessible on instances of Models
categorySchema.methods.generateAuthToken = async function () {

  const category = this
  const token = jwt.sign({ _id: category._id.toString() }, 'secretkey')
  return token
}

// static methods are accessible on Models
// Once you separate schema from model, then you can 
// set up middleware
// User.findByCredentials
categorySchema.statics.findByCredentials = async (email, password) => {

  const category = await Category.findOne({ email: email })
  if (!category) {
    // throw new Error('Unable to Login')
    return ({ "error": "Wrong email" })
  }

  const isMatch = password === category.password
  if (!isMatch) {
    // throw new Error('Unable to Login')
    return ({ "error": "Wrong password" })
  }

  return category;
}

const Category = mongoose.model('Category', categorySchema)

module.exports = Category;