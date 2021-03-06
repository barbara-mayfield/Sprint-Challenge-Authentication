const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const usersRouter = require('../users/users-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/jokes', authenticate(), jokesRouter);

server.get('/', (req, res, next) => {
    res.json({
        message: "Welcome to the API"
    })
})

server.use((err, req, res, next) => {
    console.log("Error:", err)

    res.status(500).json({
        message: "There was a problem with the server...",
    })
})

module.exports = server;
