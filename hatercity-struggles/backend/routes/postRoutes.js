const express = require('express')
const useAuth = require('../middleware/useAuth')
const {
    getPosts,
    getSubPosts,
    getPost,
    createPost,
    deletePost,
    likePost,
    unlikePost,
    commentPost,
    deleteComment
} = require('../controllers/postController')
const busboy = require("connect-busboy")

const router = express.Router()

router.use(useAuth)

// get all posts
router.get('/', getPosts) 
// get posts of users the current user's following
router.get('/subposts/:id', getSubPosts) 
// get single post
router.get('/:id', getPost) 
// create a post /* CHECK IT */
router.post('/', busboy({ highWaterMark: 2 * 1024 * 1024 }), createPost)
// delete the post
router.delete('/:id', deletePost)
// like the post
router.put('/like/:id', likePost) 
// unlike the post
router.put('/unlike/:id', unlikePost) 
// comment the post 
router.put('/comment/:id', commentPost) 
// delete trhe comment to the post
router.put('/del-comment/:postId/:commentId', deleteComment)

module.exports = router
