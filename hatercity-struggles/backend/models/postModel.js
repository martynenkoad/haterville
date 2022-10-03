const mongoose = require('mongoose')

const Schema = mongoose.Schema

const imagesSchema = new Schema({
    public_id: {
        type: String
    },
    url: {
        type: String
    }
})


const postSchema = new Schema({
    postText: {
        type: String, 
    },
    images: [{
        type: imagesSchema,
        default: [{
            public_id: '',
            url: ''
        }]
    }],  
    hates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        text: String,
        created: {
            type: Date,
            default: Date.now()
        },
        commentator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)