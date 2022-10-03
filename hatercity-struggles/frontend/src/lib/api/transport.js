import defaultSettings from "./defaultSettings"

/**
 * Perform a call to the backend with the following parametres
 * @param {string} url 
 * @param {string} method 
 * @param items 
 * @param {boolean} isAuth 
 * @param {string} token 
 */
const makeCall = async (url, method, items, isAuth = true, token = "") => {
 
    const user = JSON.parse(localStorage.getItem("user"))

    const headers = isAuth ? {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token ? token : user.token}`
    } : {
        "Content-Type" : "application/json"
    }

    const params = items ? {
        method,
        headers,
        body: JSON.stringify({ items })
    } : {
        method, 
        headers
    }

    const response = await fetch(defaultSettings.baseUrl + url, params)
    const json = await response.json()

    if(response.ok) {
        return json
    } else {
        throw Error(json.error)
    }
}

export default makeCall