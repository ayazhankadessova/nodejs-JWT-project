// check username, password in post(login) request
// if exist, create new JWT
// send back to front end

const jwt = require('jsonwebtoken')
require('dotenv').config()
const CustomAPIError = require('../errors/custom-error')

// setup authentication so only the request with JWT can access the dashboard

const login = async (req, res) => {
  //   console.log(req.body)

  const { username, password } = req.body
  console.log(username)
  console.log(password)

  // mongo in the future

  // joi (authentication)

  // check values

  if (!username || !password) {
    throw new CustomAPIError('Please provide a username and password', 400)
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

  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  console.log(req.headers)
  const authHeader = req.headers.authorization

  // assign Authorization header to the value
  // If authHeader does not exist or if it does not start with the Bearer, then throw our custom Error
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No Token Provided', 401)
  }

  const token = authHeader.split(' ')[1]

  console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
      msg: `Hello, ${decoded['username']}`,
      secret: `Your lucky number is ${luckyNumber}. You can use it to authorize the data`,
    })

    console.log(decoded)
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401)
  }

  //   const luckyNumber = Math.floor(Math.random() * 100)
  //   res.status(200).json({
  //     msg: `Hello, Aya`,
  //     secret: `Your lucky number is ${luckyNumber}. You can use it to authorize the data`,
  //   })
}

module.exports = { login, dashboard }
