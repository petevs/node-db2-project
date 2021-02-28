const cars = require('./cars-model')
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await cars.getById(req.params.id)
    if(car)  {
      req.car = car
      next()
    } else {
      res.status(404).json({
        message: `car with id ${req.params.id} is not found`
      })
    }
  } catch(err) {
    next(err)
  }

}

const checkCarPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  if (
    !req.body.vin ||
    !req.body.make ||
    !req.body.model ||
    !req.body.mileage
    ) {
      return res.status(400).json({
        message: "field is missing"
      })
    }

  next() 
}

const checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
  const isValidVin = vinValidator.validate(req.body.vin)
  if(!isValidVin){
    return res.status(400).json({
      message: `vin ${req.body.vin} is invalid`
    })
  }
  next()
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const results = await cars.getAll()
    const vins = results.map(car => car.vin)

    if(vins.includes(req.body.vin)){
      return res.status(400).json({
        message: `vin ${req.body.vin} already exists`
      })
    } else {
      next()
    }

  } catch(err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}