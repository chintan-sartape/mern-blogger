const express = require('express')
const app = express()
const Role = require('../models/role')

// async - await 
app.get('/', async (req, res) => {
    try {
        // Model.find({}) -> return all data or error
        const roles = await Role.find({})
        res.status(200).send(roles)
    } catch (e) {
        res.status(500).send(e)
    }
})

// async - await 
// app.get('/:id', auth, async (req, res) => {
app.get('/:id', async (req, res) => {
    // read parameter from path
    const _id = req.params.id
    try {
        const role = await Role.findById(_id)
        if (!role) {
            return res.status(404).send()
        }
        // console.log(role)
        res.send(role)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = app;