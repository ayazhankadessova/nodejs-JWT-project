const login = async (req, res) => {
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
