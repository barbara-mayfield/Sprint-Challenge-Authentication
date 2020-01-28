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

test("register user with no password input", async () => {
    const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "json", password: "" })
    expect(res.status).toBe(500)
    expect(res.type).toBe("application/json")
})

test("register user", async () => {
    const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "barbaram", password: "potato" })
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body).toEqual({ id: 5, username: "barbaram" })
})

test("register user who already exists", async () => {
    const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "json", password: "abc123" })
    expect(res.status).toBe(500)
    expect(res.type).toBe("application/json")
})

test("user login", async () => {
    const res = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "json", password: "abc123" })
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
})

test("login route with wrong password", async () => {
    const res = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "barbaram", password: "tomato" })
    expect(res.status).toBe(500)
    expect(res.type).toBe("application/json")
})

test("get jokes w/ no header", async () => {
    const res = await supertest(server)
        .get("/api/jokes")
    expect(res.status).toBe(401)
    expect(res.type).toBe("application/json")
})