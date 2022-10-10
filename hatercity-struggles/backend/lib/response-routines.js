const { get } = require('lodash')

/**
 * Respond with a code and data.
 * @param res
 * @param data
 * @param code
 */
const respond = (res, data, code) => {
  return res.status(code).json(data)
}

/**
 * Send a success response (by default with 200 code).
 * @param res
 * @param data
 * @param code
 */
const success = (res, data = {}, code = 200) => {
  return respond(res, data, code)
}

/**
 * Send a fail response (by default with 400 error code).
 * @param res
 * @param data
 * @param code
 */
const fail = (res, data = {}, code = 400) => {
  return respond(res, data, code)
}

/**
 * Fail with JSON output containing given error message.
 * @param res
 * @param message
 * @param code
 * @returns {*}
 */
const failWithMessage = (res, message, code = 400) => {
  return fail(res, {
    error: message
  })
}

/**
 * Get user ID from request.
 * @param req
 * @return {undefined}
 */
const getUserId = (req) => {
  return get(req, 'user._id')
}

module.exports = { success, fail, failWithMessage, getUserId }
