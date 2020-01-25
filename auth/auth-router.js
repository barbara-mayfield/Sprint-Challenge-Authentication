const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersModel = require("../users/users-model");
const secrets = require("../config/secrets");
const router = require('express').Router();

router.post('/register', async (req, res, next) => {
  try {
    const saved = await usersModel.add(req.body)

    res.status(201).json(saved)
  } catch(err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  try {
  const { username, password } = req.body
  const user = await usersModel.findBy({ username }).first()
  const passwordValid = await bcrypt.compare(password, user.password)

  if (user && passwordValid) {
    const token = jwt.sign({
      subject: user.id,
      username: user.username,
    }, secrets.jwt, {
      expiresIn: "7d",
    })

    res.status(200).json({
      message: `Welcome ${user.username} to the Joke API`,
      token: token,
    })
  } else {
    res.status(401).json({
      message: "Invalid Credentials",
    })
  }
  } catch(err) {
    next(err)
  }
});

module.exports = router;
