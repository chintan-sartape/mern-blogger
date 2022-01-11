const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// Create the Schema and pass it as argument to the model
const blogSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true
  },
  author_id: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true,
    trim: true
  },
  blogImg: {
    type: String,
    required: true,
    trim: true
  },

})

// methods are accessible on instances of Models
blogSchema.methods.generateAuthToken = async function () {

  const blog = this
  const token = jwt.sign({ _id: blog._id.toString() }, 'secretkey')
  return token
}

// static methods are accessible on Models
// Once you separate schema from model, then you can 
// set up middleware
// Blog.findByCredentials
blogSchema.statics.findByCredentials = async (email, password) => {

  const blog = await Blog.findOne({ email: email })
  if (!blog) {
    // throw new Error('Unable to Login')
    return ({ "error": "Wrong email" })
  }

  const isMatch = password === blog.password
  if (!isMatch) {
    // throw new Error('Unable to Login')
    return ({ "error": "Wrong password" })
  }

  return blog;
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;