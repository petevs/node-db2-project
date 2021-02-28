const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db.select('*').from('cars')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db.select('*')
    .from("cars")
    .where("id", id)
    .first()
}

const create = async (car) => {
  // DO YOUR MAGIC
  const [id] = await db.insert({
    "vin": car.vin,
    "make": car.make,
    "model": car.model,
    "mileage": car.mileage,
    "title": car.title,
    "transmission": car.transmission
  })
  .into("cars")

  const result = await db("cars")
    .where("id", id)
    .first()

  return result
}

module.exports = {
  getAll,
  getById,
  create
}