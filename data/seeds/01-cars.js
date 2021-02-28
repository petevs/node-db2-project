// STRETCH
exports.seed = async function(knex) {
    await knex("cars").truncate()
    await knex("cars").insert([
        {
            vin: "v80234",
            make: "ford",
            model: "f350",
            mileage: 250000,
            title: "anonymous",
            transmission: "something"
        }
    ])


}