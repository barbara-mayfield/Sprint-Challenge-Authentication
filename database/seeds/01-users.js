const bcrypt = require("bcryptjs")
const hash = async(password) => await bcrypt.hash(password, 12)

exports.seed = async (knex) => {
  // Deletes ALL existing entries and resets ids
  await knex("users").truncate()

  await knex("users").insert([
    { username: "json", password: `${await hash('abc123')}`},
    { username: "sam", password: `${await hash('potato')}`},
    { username: "hats", password: `${await hash('hats')}`},
    { username: "colt", password: `${await hash('dragoon')}`},
  ])
}
