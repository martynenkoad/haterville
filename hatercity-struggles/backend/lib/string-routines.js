/**
 * Check whether the given string contains only letters.
 * @param string
 * @returns {boolean}
 */
 const onlyLetters = (string) => /^[a-zA-Z]+$/.test(string)

 /**
  * Replace spaces from the given string.
  * @param string
  * @returns {*}
  */
 const replaceSpaces = (string) => string.replace(/\s+/g, '')
 
 /**
  * Check whether the login is appropriate.
  * @param login
  * @returns {boolean}
  */
 const checkLogin = (login) => /^[a-zA-Z0-9]+$/.test(login)



module.exports = {
   onlyLetters,
   replaceSpaces,
   checkLogin
}
 

