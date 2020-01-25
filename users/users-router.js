const express = require("express")
const authenticate = require("../auth/authenticate-middleware")
const usersModel = require("./users-model")

const router = express.Router()

router.get("/", authenticate(), async (req, res, next) => {
    try {
        const users = await usersModel.find()

        res.json(users)
    } catch(err) {
        next(err)
    }
})

module.exports = router;