exports.seed = async (knex) => {
  // Deletes ALL existing entries and resets ids
  await knex("users").truncate()

  await knex("users").insert([
    { username: "json", password: "abc123" },
    { username: "sam", password: "pancakes" },
    { username: "hats", password: "hats" },
    { username: "colt", password: "dragoon" },
  ])
}
