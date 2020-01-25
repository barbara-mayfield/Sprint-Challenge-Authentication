const jwt = require("jsonwebtoken")
const secrets = require("../config/secrets")
/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = () => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization

      if(!token) {
      return res.status(401).json({ you: 'shall not pass!' });
      }

      const decoded = jwt.verify(token, secrets.jwt)
      
      req.userId = decoded.subject
      next() 
  } catch (err) {
      next(err)
    }
  }
}
      
