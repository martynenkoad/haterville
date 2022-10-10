require('dotenv').config()
require('module-alias/register')

const express = require('express')
const cors = require('cors')

// require user & post routes
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

// connection to mongoDB
const initMongo = require('./lib/init-mongo')

const app = express()

// parse jon
app.use(express.json({ limit: '150mb' }))
app.use(express.urlencoded({ extended: true, limit: '150mb', parameterLimit: 500000 }))

// deal with cross origin policy
app.use(
  cors({
    origin: '*'
  })
)

// auth routes
app.use('/api/user', userRoutes)
// post routes
app.use('/api/post', postRoutes)

// func listen on 5000 port
const startServer = () => {
  const port = process.env.PORT || 5000
  app.listen(port, () => {
    console.log('Server listening on port', port)
  })
}

// connect to mongo db & listen on 4000 port
initMongo(app, startServer)
