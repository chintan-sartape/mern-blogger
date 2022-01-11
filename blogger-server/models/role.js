const mongoose = require('mongoose')

// Create the Schema and pass it as argument to the model
const roleSchema = new mongoose.Schema({

  role: {
    type: String,
    required: true,
    trim: true
  },
  role_details: {
    type: String,
    required: true,
    trim: true
  },

});

const Role = mongoose.model('Role', roleSchema)

module.exports = Role;