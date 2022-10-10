const mongoose = require('mongoose')
const cloudinary = require('@/utils/cloudinary')
const Post = require('@/models/postModel')
const User = require('@/models/userModel')
const fs = require('fs-extra')
const busboy = require('connect-busboy')
const path = require('path')

/**
 * Get all posts
 * @param req
 * @param res
 */
const getPosts = async (req, res) => {
  await Post.find({}).sort({ createdAt: -1 })
    .populate('comments.commentator', '_id firstName lastName username email profileImage description hates followers following clickHate')
    .populate('postedBy', '_id firstName lastName username email profileImage description hates followers following clickHate')
    .then(allPosts => res.status(200).json(allPosts))
    .catch(error => res.status(400).json({ error: error.message }))
}

/**
 * Get posts of users the current user is following
 * @param req
 * @param res
 */
const getSubPosts = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  const { following } = user
  await Post.find({
    postedBy: {
      $in: following
    }
  }).sort({ createdAt: -1 })
    .populate('comments.commentator', '_id firstName lastName username email profileImage description hates followers following clickHate')
    .populate('postedBy', '_id firstName lastName username email profileImage description hates followers following clickHate')
    .then(subPosts => res.status(200).json(subPosts))
    .catch(error => res.status(400).json({ error: error.message }))
}

/**
 * Get the single post
 * @param req
 * @param res
 * @returns
 */
const getPost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Object ID' })
  }

  await Post.findOne({ _id: id })
    .populate('comments.commentator', '_id firstName lastName username email profileImage description hates followers following clickHate')
    .populate('postedBy', '_id firstName lastName username email profileImage description hates followers following clickHate')
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error: error.message }))
}

/**
 * Delete the post
 * @param req
 * @param res
 * @returns
 */
const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.stratus(400).json({ error: 'Invalid Object ID' })
  }

  const post = await Post.findOneAndDelete({ _id: id })

  if (!post) {
    return res.status(404).json({ error: 'I guess the post has already been deleted....' })
  }

  res.status(200).json(post)
}

/**
 * Like the post
 * @param req
 * @param res
 * @returns
 */
const likePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'What kind of post is it??' })
  }

  Post.findByIdAndUpdate(id, {
    $push: { hates: req.user._id }
  }, { new: true })
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err.message })
      } else {
        res.status(200).json(result)
      }
    })

}

/**
 * Unlike the post
 * @param req
 * @param res
 * @returns
 */
const unlikePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'What kind of post is it????' })
  }

  Post.findByIdAndUpdate(id, {
    $pull: { hates: req.user._id }
  }, { new: true })
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err.message })
      } else {
        res.status(200).json(result)
      }
    })
}

/**
 * Comment the post
 * @param req
 * @param res
 * @returns
 */
const commentPost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'I haven\'t seen the post like this.....' })
  }

  const comment = {
    text: req.body.items,
    commentator: req.user._id
  }

  Post.findByIdAndUpdate(id, {
    $push: { comments: comment }
  }, { new: true })
    .populate('comments.commentator', '_id firstName lastName username email profileImage description hates followers following clickHate')
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err.message })
      } else {
        res.status(200).json(result)
      }
    })
}

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params

    Post.findByIdAndUpdate(postId, {
      $pull: { comments: { _id: commentId } }
    }, { new: true })
      .populate('comments.commentator', '_id firstName lastName username email profileImage description hates followers following clickHate')
      .exec((error, result) => {
        if (error) {
          return res.status(400).json({ error: error.message })
        } else {
          res.status(200).json(result)
        }
      })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getPosts,
  getSubPosts,
  getPost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  deleteComment
}
