const express = require('express')
const cors = require('cors')

const { mongoose } = require('./db')
var userController = require('./controller/userController');
var blogController = require('./controller/blogController');
var categoryController = require('./controller/categoryController');
var roleController = require('./controller/roleController');

var app = express()
// app.use(bodyParser.json())
app.use(express.json())

// allow frontend to access API endpoint
app.use(cors({ origin: 'http://localhost:3000' }))

// allow to access static folder publically
app.use('/uploads', express.static('uploads')); 

PORT = 3400;
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))

app.use('/users', userController)
app.use('/blogs', blogController)
app.use('/categories', categoryController)
app.use('/roles', roleController)