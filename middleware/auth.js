const jwt = require('jsonwebtoken')
require('dotenv').config()
const CustomAPIError = require('../errors/custom-error')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log(authHeader)

  // assign Authorization header to the value
  // If authHeader does not exist or if it does not start with the Bearer, then throw our custom Error
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No Token Provided', 401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    const { id, username } = decoded
    user = { id, username }
    next()
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401)
  }
}

module.exports = authMiddleware
