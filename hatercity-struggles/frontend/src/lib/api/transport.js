import defaultSettings from './defaultSettings'

/**
 * Check whether the given object is a form data or not.
 * @param data
 * @return {boolean}
 */
const isFormData = (data) => {
  return typeof data === 'object' && data instanceof FormData
}

/**
 * Perform a call to the backend with the following parametres
 * @param {string} url
 * @param {string} method
 * @param items
 * @param {boolean} isAuth
 * @param {string} token
 */
const makeCall = async (url, method, items, isAuth = true, token = '') => {
  const user = JSON.parse(localStorage.getItem('user'))

  const contentType = isFormData(items) ? 'multipart/form-data' : 'application/json'
  const headers = isAuth ? { 'Authorization': `Bearer ${token ? token : user.token}`  } : {}

  if (!isFormData(items)) {
    headers['Content-Type'] = contentType
  }

  const body = isFormData(items) ? items : JSON.stringify({ items })
  const params = items ? {
    method,
    headers,
    body
  } : {
    method,
    headers
  }

  const response = await fetch(defaultSettings.baseUrl + url, params)
  const json = await response.json()

  if (response.ok) {
    return json
  } else {
    throw Error(json.error)
  }
}

export default makeCall
