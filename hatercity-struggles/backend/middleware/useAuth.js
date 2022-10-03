const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

/**
 * Require authentication
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns
 */
const useAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(400).json({ error: "Aren't you authorized yet?" })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch(error) {
        return res.status(400).json({ error: 'Something went wrong with authentication :(' })
    }
}

module.exports = useAuth
