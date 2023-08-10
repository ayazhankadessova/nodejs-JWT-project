// check username, password in post(login) request
// if exist, create new JWT
// send back to front end

const jwt = require('jsonwebtoken')
require('dotenv').config()
const { BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

// Set Up Authentication so only the request with JWT can access the dashboard

const login = async (req, res) => {
  const { username, password } = req.body

  // We will use MongoDb here in the future

  // joi (authentication)

  // 1. Check if user has given username & password

  if (!username || !password) {
    throw new BadRequestError('Please provide a username and password.')
  }

  // 2. If there is username & password, create a token.

  // 3. Normally id is provided by DB, but for demo, we use date

  const id = new Date().getDate()

  // 4. Add payload, jwt secret, expires in option to create a Token
  // * jwt secret needs to be long & unguessable
  // try to keep payload small, better user experience
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(StatusCodes.OK).json({ msg: 'user created', token })
}

// 1. Give Access to Data if Token is present and valid
// * Use error handler middleware
const dashboard = async (req, res) => {
  //   console.log(user)

  // Generate a lucky number
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(StatusCodes.OK).json({
    msg: `Hello, ${user['username']}`,
    secret: `Your lucky number is ${luckyNumber}. You can use it to authorize the data`,
  })
}

module.exports = { login, dashboard }
