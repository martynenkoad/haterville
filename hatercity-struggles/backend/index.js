require('dotenv').config()
const express = require('express')
const cors = require('cors')

// require user & post routes
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

// connection to mongoDB
const initMongo = require('./lib/init-mongo')

const app = express()

// parse json
app.use(express.json({ limit: '50mb' }))

app.use(express.urlencoded({ extended: true, limit: '50mb' }))

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



// func listen on 4000 port 
const startServer = () => {
    const port = process.env.PORT || 4000 
    app.listen(port, () => {
        console.log('Server listening on port', port)
    })
}

// connect to mongo db & listen on 4000 port
initMongo(app, startServer)












//const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "./images")
//     },
//     filename: (req, file, callback) => {
//         callback(null, Date.now() + "--" + path.extname(file.originalname))
//     }
// })

// const upload = multer({ storage })

// app.use('/api/upload/single', upload.single('image'), (req, res) => {
//     console.log(req.file)
//     res.send('Single image uploaded')
// })

// app.use('/api/upload/multiple', upload.array('images', 4), (req, res) => {
//     console.log(req.files)
//     res.send('Many images uploaded')
// })