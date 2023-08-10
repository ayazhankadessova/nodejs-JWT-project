const CustomAPIError = require('./custom-error')

class BadRequest extends CustomAPIError {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = 400
  }
}

module.exports = CustomAPIError
