const express = require("express")
const carsRouter = require('./cars/cars-router')

const server = express()

// DO YOUR MAGIC
server.use(express.json())
server.get('/', (req, res) => {
    res.json({
        message: 'hi there'
    })
})
server.use('/cars', carsRouter)

module.exports = server
