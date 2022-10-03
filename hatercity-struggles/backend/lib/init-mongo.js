const mongoose = require('mongoose')

/**
 * Function to connect to MongoDB
 * @param {*} app 
 * @param {boolean} done 
 */
const initMongo = (app, done) => {
    const mongoUrl = process.env.MONGO_URL
    mongoose.Promise = global.Promise
    mongoose.connect(mongoUrl, { useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB: ', mongoUrl)
            if(done) {
                done()
            }
        })
        .catch(error => console.log("Connection to DB failed: ", error)) 
}

module.exports = initMongo
