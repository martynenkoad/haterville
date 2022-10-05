const express = require('express')
const router = express.Router()
const useAuth = require('../middleware/useAuth')
const {
    logInUser, 
    signUpUser, 
    getUser, 
    getRating,
    followUser, 
    unfollowUser, 
    updateClickHate,
    updateUser, 
    forgotPassword, 
    resetPassword
} = require('../controllers/userController')

/**
 * Auth Routes:
 * 1. log in route
 * 2. sign up route
 */
router.post('/login', logInUser) 
router.post('/signup', signUpUser) 

/**
 * Other Routes:
 * 1. get user's profile
 * 2. follow the user
 * 3. unfollow the user
 * 4. forgot password route
 * 5. reset password route
 * 6. update user's click-hate rating
 */ 
router.get('/get-user/:id', useAuth, getUser) 
router.get('/rating', useAuth, getRating)
router.put('/follow/:id', useAuth, followUser) 
router.put('/unfollow/:id', useAuth, unfollowUser) 
router.put('/clickhate', useAuth, updateClickHate) 
router.put('/update-user', useAuth, updateUser)
router.post('/forgot-pass', forgotPassword) 
router.post('/reset-pass', useAuth, resetPassword) 

module.exports = router