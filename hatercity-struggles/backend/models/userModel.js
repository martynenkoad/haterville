const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const {
    onlyLetters, 
    replaceSpaces,
    checkLogin
} = require('../lib/string-routines')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
    profileImage: {             
        type:Number          
    },                        
    description: {
        type: String
    },
    hates: [{
        type: String
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    clickHate: {   
        type: Number,
        default: 0
    }
}, { timestamps: true })

userSchema.statics.signup = async function(firstName, lastName, username, email, password, profileImage, description, followers, following, clickHate) {
    const name = replaceSpaces(firstName)
    const surname = replaceSpaces(lastName)
    const user_name = replaceSpaces(username)
    const e_mail = replaceSpaces(email)

    if(!firstName || !lastName || !username || !email || !password) {
        throw Error('Annoying ew. Please fill all the fields')
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Please change password to strong, of course if you do not want to be hacked. E.Q.: " IHatePrunes1234!! "')
    }

    if(!validator.isEmail(e_mail)) {
        throw Error("I don't think that this is your email.")
    }

    if (!onlyLetters(name) || !onlyLetters(surname) || name.length < 2 || surname.length < 2) {
        throw Error('Does your real name actually look like this? o_0')
    }

    const exists = await this.findOne({ username: user_name })
    const email_exists = await this.findOne({ email: e_mail })

    if(!checkLogin(user_name) || exists || email_exists || user_name.length < 4) {
        throw Error("This username/email does not suit you. You deserve a better one!")
    }
    


    if(!description) {
        description = "A standart guy."
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        firstName: name,
        lastName: surname,
        username: user_name,
        email: e_mail,
        password: hash,
        profileImage,
        description,
        hates: [],
        followers: [],
        following: [],
        clickHate: 0,
    })

    return user
}


userSchema.statics.login = async function(username, password) {
    if(!username || !password) {
        throw Error('I think some fields are unfilled.')
    }

    const user = await this.findOne({ username })

    if(!user) {
        throw Error('Have you forgotten your username?')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Are you trying to hack someones profile? Heheheh')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)
