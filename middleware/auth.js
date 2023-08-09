const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log(authHeader)

  next()

  //   // assign Authorization header to the value
  //   // If authHeader does not exist or if it does not start with the Bearer, then throw our custom Error
  //   if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //     next('No Token Provided', 401)
  //   }

  //   const token = authHeader.split(' ')[1]

  //   console.log(token)

  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET)

  //     const luckyNumber = Math.floor(Math.random() * 100)
  //     res.status(200).json({
  //       msg: `Hello, ${decoded['username']}`,
  //       secret: `Your lucky number is ${luckyNumber}. You can use it to authorize the data`,
  //     })

  //     console.log(decoded)
  //   } catch (error) {
  //     throw next('Not authorized to access this route', 401)
  //   }
}

module.exports = authMiddleware
