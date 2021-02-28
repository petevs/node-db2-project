// DO YOUR MAGIC
const router = require('express').Router()
const { whereNotExists } = require('../../data/db-config')
const cars = require('./cars-model')

//Get Cars
router.get('/', async (req, res) => {
    try {
        const results = await cars.getAll()
        res.json(results)
    } catch(err) {
        res.status(400).json(err)
    }
})

//Get Car By ID
router.get('/:id', async (req, res) => {
    try {
        const result = await cars.getById(req.params.id)
        res.json(result)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/', async ( req, res, next) => {
    try{
        const result = await cars.create(req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
})

module.exports = router