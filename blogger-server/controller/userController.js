const express = require('express')
const app = express()
const User = require('../models/user')
const auth = require('../middleware/auth')

// const router = express.Router()

// get - all documents - find()
// router.get('/', (req, res) => {    
//     // Model.find({}) -> return all data or error
//     Employee.find({})
//         .then((result) => res.status(200).send(result))
//         .catch(error => res.status(500).send(error))
// })

// async - await 
app.get('/', async (req, res) => {
  try {
    // Model.find({}) -> return all data or error
    const users = await User.find({});
    // filter admin role users
    const filterUsers = users.filter(e => e.role !== '61c6d8dd52766d61ab628a68');
    res.status(200).send(filterUsers);
  } catch (e) {
    res.status(500).send(e)
  }
})

// serach by id
// app.get('/:id', (req, res) => {
//     // read parameter from path
//     const _id = req.params.id
//     // Model.findById -> Find data by id or return error
//     Employee.findById({ _id })
//         .then((user) => {
//             if(!user){
//                 return  res.status(404).send("Employee Not Found")
//             }
//             res.status(200).send(user)
//         })
//         .catch(error => res.status(500).send(error))
// })

// async - await 
// app.get('/:id', auth, async (req, res) => {
app.get('/:id', async (req, res) => {
  // read parameter from path
  const _id = req.params.id
  try {
    const user = await User.findById(_id)
    if (!user) {
      return res.status(404).send()
    }
    // console.log(user)
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

// app.post('/', (req, res) =>{
//     // read data from body
//     const obj = req.body;
//     // console.log(obj)
//     // Model object
//     const emp = new Employee(obj); // run validator on the value
//     // insert object in mongodb
//     emp.save()
//         .then((result) => {
//             console.log(result)
//             res.status(201).send(result)
//         })
//         .catch((error) => res.status(400).send(error))
// })

app.post('/', async (req, res) => {
  const user = new User(req.body);
  // console.log(user);
  // return false;
  // insert object in mongodb
  try {
    const newUser = await user.save()
    const token = await newUser.generateAuthToken()
    res.status(201).send({ newUser, token })
  } catch (e) {
    res.status(202).send(e)
  }
})

// app.patch('/:id', auth, (req, res) => {
app.patch('/:id', (req, res) => {
  // console.log(req.body)    
  // Model.findByIdAndUpdate -> Find data by id and update the data or return error
  User.findByIdAndUpdate(req.params.id, req.body,
    {
      new: true,
      runValidators: true
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User Not Found")
      }
      res.status(200).send(user)
    })
    .catch(error => res.status(500).send(error))

})

// app.delete('/:id', auth, (req, res) => {
app.delete('/:id', (req, res) => {

  // Model.findByIdAndDelete -> Find data by id and delete the document or return error
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User Not Found")
      }
      res.status(200).send(user)
    })
    .catch(error => res.status(500).send(error))

})

app.post('/login', async (req, res) => {
  try {

    // console.log(req.body);
    // return false;
    email = req.body.email;
    password = req.body.password;

    const user = await User.findByCredentials(email, password);

    if ((user.error) && (user.error.includes("Wrong"))) {
      res.status(202).send({ "error": user.error })
    } else {
      const token = await user.generateAuthToken()
      res.send({ user, token })
    }

    //res.send(emp)
    // if response header
    // res.set({'token', token})
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = app;