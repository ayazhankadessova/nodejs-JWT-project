const CustomAPIError = require('../errors/custom-error')
const { StatusCodes, getReasonPhrase } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(
      `${getReasonPhrase(
        StatusCodes.INTERNAL_SERVER_ERROR
      )}: Something went wrong. try again later`
    )
}

module.exports = errorHandlerMiddleware
