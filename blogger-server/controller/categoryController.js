const express = require('express')
const app = express()
const Category = require('../models/category')
const auth = require('../middleware/auth')

// async - await 
app.get('/', async (req, res) => {
    try {
        // Model.find({}) -> return all data or error
        const categories = await Category.find({})
        res.status(200).send(categories)
    } catch (e) {
        res.status(500).send(e)
    }
})
// async - await 
// get single category by id
app.get('/:id', async (req, res) => {
    // read parameter from path
    const _id = req.params.id
    try {
        const category = await Category.findById(_id)
        if (!category) {
            return res.status(404).send()
        }
        // console.log(category)
        res.send(category)
    } catch (e) {
        res.status(500).send(e)
    }
})

// async - await 
// get user blogs by author id
app.get('/category/:id', async (req, res) => {
    // read parameter from path
    const author_id = req.params.id
    // console.log(req.params);
    try {
        const categories = await Category.find({ 'author_id': author_id })
        if (!categories) {
            return res.status(404).send()
        }
        res.send(categories)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post('/', async (req, res) => {
    const category = new Category(req.body);
    // console.log(blog);
    // return false;
    // insert object in mongodb
    try {
        const newCategory = await category.save()
        const token = await newCategory.generateAuthToken()
        res.status(201).send({ newCategory, token })
    } catch (e) {
        res.status(202).send(e)
    }
})

// app.patch('/:id', auth, (req, res) => {
app.patch('/:id', (req, res) => {
    // console.log(req.body)    
    // Model.findByIdAndUpdate -> Find data by id and update the data or return error
    Blog.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true
        })
        .then((blog) => {
            if (!blog) {
                return res.status(404).send("blog Not Found")
            }
            res.status(200).send(blog)
        })
        .catch(error => res.status(500).send(error))

})

// app.delete('/:id', auth, (req, res) => {
app.delete('/:id', (req, res) => {

    // Model.findByIdAndDelete -> Find data by id and delete the document or return error
    Category.findByIdAndDelete(req.params.id)
        .then((category) => {
            if (!category) {
                return res.status(404).send("category Not Found")
            }
            res.status(200).send(category)
        })
        .catch(error => res.status(500).send(error))

})

app.post('/login', async (req, res) => {
    try {

        // console.log(req.body);
        // return false;
        email = req.body.email;
        password = req.body.password;

        const category = await Category.findByCredentials(email, password);

        if ((category.error) && (category.error.includes("Wrong"))) {
            res.status(202).send({ "error": category.error })
        } else {
            const token = await category.generateAuthToken()
            res.send({ category, token })
        }

        //res.send(emp)
        // if response header
        // res.set({'token', token})
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = app;