const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Post = require('../models/postModel')
const User = require('../models/userModel')
const sendEmail = require('../middleware/sendMails')

/**
 * Create a token for user
 * @param _id 
 * @returns {*}
 */
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: '3d' })
}
 
/**
 * Log in the user controller
 * @param req 
 * @param res  
 */
const logInUser = async (req, res) => {
    const { username, password } = req.body.items

    try {
        const user = await User.login(username, password)

        const token = createToken(user._id)

        res.status(200).json({ firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, token, profileImage: user.profileImage, description: user.description, hates: user.hates, clickHate: user.clickHate, haters: user.haters, _id: user._id, followers: user.followers, following: user.following})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



/**
 * Sign up the user controller
 * @param req 
 * @param res 
 */
const signUpUser = async (req, res) => {
    const { firstName, lastName, username, email, password, profileImage, description } = req.body.items

    try {
        const user = await User.signup(firstName, lastName, username, email, password, profileImage, description)

        const token = createToken(user._id)
        
        res.status(200).json({ firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, token, profileImage: user.profileImage, description: user.description, hates: user.hates, clickHate: user.clickHate, haters: user.haters, _id: user._id, followers: user.followers, following: user.following})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

/**
 *  Get the single user
 * @param req 
 * @param res 
 * @returns 
 */
const getUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'What kind of user is it??' })
    }

    User.findOne({ _id: id })
      .select("-password")
      .populate("following", "_id firstName lastName username email profileImage description hates followers following clickHate")
      .populate("followers", "_id firstName lastName username email profileImage description hates followers following clickHate")
      .then(user => {
        Post.find({ postedBy: id })
          .populate("postedBy", "_id firstName lastName username email profileImage description hates followers following clickHate")
          .exec((error, posts) => {
            if(error) {
                return res.status(400).json({ error: error.message })
            } 
            res.status(200).json({ user, posts })
          })
      })
      .catch(error => {
        return res.status(404).json({ error: 'This user has not moved to Haterville yet....' })
      })
}

const getRating = async (req, res) => {
    User.find({  }).sort({ clickHate: -1 })  
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error: error.message }))    
}


/**
 * Follow the user
 * @param req 
 * @param res 
 */
const followUser = async (req, res) => {
    const { id } = req.params
    const { _id } = req.user
    User.findByIdAndUpdate(id, {
        $push: { followers: _id }
    }, { new: true }, (err, result) => {
        if(err) {
            return res.status(400).json({ error: err.message })
        }
        User.findByIdAndUpdate(_id, {
            $push: { following: id }
        }, { new: true })
          .select('-password')
          .then(result => {
            res.status(200).json(result)
          })
          .catch(err => {
            return res.status(400).json({ error: err.message })
          })
    })
}

/**
 * Unfollow the user
 * @param req 
 * @param res 
 */
const unfollowUser = async (req, res) => {
    const { id } = req.params
    const { _id } = req.user
    User.findByIdAndUpdate(id, {
        $pull: { followers: _id }
    }, { new: true }, (err, result) => {
        if(err) {
            return res.status(400).json({ error: err.message })
        }
        User.findByIdAndUpdate(_id, {
            $pull: { following: id }
        }, { new: true })
          .select('-password')
          .then(result => {
            res.status(200).json(result)
          })
          .catch(err => {
            return res.status(400).json({ error: err.message })
          })
    })
}

/**
 * Update user's click-hate rating
 * @param req 
 * @param res 
 */
const updateClickHate = async (req, res) => {
    const { _id } = req.user
    const { items } = req.body
    User.findOneAndUpdate({ _id }, {
        $inc: { clickHate: items }
    }, { new: true })
      .select('-password')
      .then(result => {
        res.status(200).json(result)
      })
      .catch(error => {
        res.status(400).json({ error: error.message })
      })
}

const updateUser = async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id)

    if(!user) { 
        return res.status(404).json({ error: "How do you want to edit your profile if you do not exist? :(" })
    }

    const { items } = req.body

    user.firstName = items.firstName || user.firstName
    user.lastName = items.lastName || user.lastName
    user.email = items.email || user.email
    user.profileImage = items.profileImage || user.profileImage
    user.description = items.description || user.description

    const updated = await user.save()
    res.status(200).json({
        _id: updated._id,
        firstName: updated.firstName,
        lastName: updated.lastName,
        username: updated.username,
        email: updated.email,
        password: updated.password,
        posts: updated.posts,
        profileImage: updated.profileImage,
        description: updated.description,
        hates: updated.hates,
        followers: updated.followers,
        following: updated.following,
        clickHate: updated.clickHate,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
        token: createToken(updated._id)
    })
}

/**
 * Forgot password controller
 * @param req 
 * @param res 
 * @returns 
 */
const forgotPassword = async (req, res) => {
    try {
        // get email
        const { items } = req.body

        // check if email exists
        const user = await User.findOne({ email: items })
        if(!user) return res.status(404).json({ error: 'Oops~ User has not moved to Haterville yet....' })
        // create access token
        const accessToken = createToken(user._id)

 
        // send email with the link
        // CHANGE LATER WITH THE DOMAIN NAME
        const url = `http://localhost:3000/passwordrecovery/${accessToken}`

        const name = user.username
        const options = {
            email: items,
            subject: 'Haterville | Reset Password',
            html: `
            <div>
              <h1>Welcome to Haterville again, ${name}!</h1>
              <p>I see that you have forgotten your password. That's sad :(</p>
              <p>But no worries! Follow <a href=${url}>me</a> to </p>
            </div>`
        }
        sendEmail(options)
        // success
        res.status(200).json({ message: 'Please check your email' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

/**
 * Reset password controller
 * @param req 
 * @param res 
 * @returns 
 */
const resetPassword = async (req, res) => {
    try {
        // get password
        const { items } = req.body
        const { _id } = req.user
        console.log(req.user)

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(items, salt)

        // update password
        const user = await User.findOneAndUpdate({ _id }, {
            password: hash
        })

        if (!user) return res.status(404).json({ error: 'No such user' })

        // reset; success
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
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
}