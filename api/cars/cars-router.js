// DO YOUR MAGIC
const router = require('express').Router()
const cars = require('./cars-model')
const middleware = require('./cars-middleware')

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
router.get('/:id', middleware.checkCarId, async (req, res, next) => {
    try {
        res.json(req.car)
    } catch (err) {
        next(err)
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