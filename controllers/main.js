// check username, password in post(login) request
// if exist, create new JWT
// send back to front end

const jwt = require('jsonwebtoken')
require('dotenv').config()
const { BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

// setup authentication so only the request with JWT can access the dashboard

const login = async (req, res) => {
  const { username, password } = req.body

  // mongo in the future

  // joi (authentication)

  // check values

  if (!username || !password) {
    throw new BadRequestError('Please provide a username and password.')
  }

  // create token

  // normally id is provided by DB, but for demo, we use date

  // payload, jwt secret, expires in option
  // jwt secret needs to be long & unguessable
  const id = new Date().getDate()

  // try to keep payload small, better user experience
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(StatusCodes.OK).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  console.log(user)

  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(StatusCodes.OK).json({
    msg: `Hello, ${user['username']}`,
    secret: `Your lucky number is ${luckyNumber}. You can use it to authorize the data`,
  })

  //     // console.log(decoded)
  //   } catch (error) {
  //     throw new CustomAPIError('Not authorized to access this route', 401)
  //   }
}

module.exports = { login, dashboard }
