// check username, password in post(login) request
// if exist, create new JWT
// send back to front end

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
  res.send('Fake Login/Register/Sign Up rote')
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: `Hello, Aya`,
    secret: `Your lucky number is ${luckyNumber}. You can use it to authorize the data`,
  })
}

module.exports = { login, dashboard }
