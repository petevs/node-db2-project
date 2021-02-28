// DO YOUR MAGIC
const router = require('express').Router()
const cars = require('./cars-model')
const {checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware')

//Get Cars
router.get('/', async (req, res, next) => {
    try {
        const results = await cars.getAll()
        res.json(results)
    } catch(err) {
        next(err)
    }
})

//Get Car By ID
router.get('/:id', checkCarId, async (req, res, next) => {
    try {
        res.json(req.car)
    } catch (err) {
        next(err)
    }
})

//Post New Car
router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async ( req, res, next) => {
    try{
        const result = await cars.create(req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(500).json({
        message: 'something went wrong inside cars router',
        errMessage: err.message
    })
})

module.exports = router