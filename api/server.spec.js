const supertest = require("supertest")
const server = require("./server")
const db = require("../database/dbConfig")

beforeEach(async () => {
    await db.seed.run()
})

test("welcome route", async () => {
    const res = await supertest(server).get("/")

    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toMatch(/welcome/i)
})

test("get users", async () => {
    const res = await supertest(server).get("/api/users")
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.length).toBeGreaterThan(0)
})

test("register user", async () => {
    const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "barbaran", password: "potatoes" })
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body).toEqual({ id: 5, username: "barbaran" })
})