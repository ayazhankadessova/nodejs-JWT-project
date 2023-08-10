const jwt = require('jsonwebtoken')
require('dotenv').config()
const { UnAuthenticatedError } = require('../errors/index')

/* Authentication Error Handler Middleware */
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log(authHeader)

  // Assign Authorization header to the value
  // If authHeader does not exist or if it does not start with the Bearer, then throw our custom Error
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAuthenticatedError('No Token Provided.')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    const { id, username } = decoded
    user = { id, username }
    next()
  } catch (error) {
    throw new UnAuthenticatedError(
      'You are not authorized to access this route.'
    )
  }
}

module.exports = authMiddleware
