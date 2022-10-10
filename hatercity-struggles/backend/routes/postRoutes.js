const express = require('express')
const useAuth = require('@/middleware/useAuth')
const {
  getPosts,
  getSubPosts,
  getPost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  deleteComment
} = require('@/controllers/postController')

const { createPost } = require('@/controllers/posts/createPost')
const router = express.Router()

router.use(useAuth)

// get all posts
router.get('/', getPosts)
// get posts of users the current user's following
router.get('/subposts/:id', getSubPosts)
// get single post
router.get('/:id', getPost)
// create a post /* CHECK IT */
router.post('/', createPost)
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
