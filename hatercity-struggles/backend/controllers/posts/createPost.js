const { success, failWithMessage, getUserId } = require('@/lib/response-routines')
const Busboy = require('busboy')
const cloudinary = require('@/utils/cloudinary')
const streamifier = require('streamifier')
const Post = require('@/models/postModel')

/**
 * Check whether data contains all required fields.
 * @param data
 * @returns {boolean}
 */
const isDataValid = (data) => {
  if (!('postText' in data)) {
    return false
  }

  return true
}

/**
 * Get files and fields from form data.
 * @param req
 * @returns {Promise<unknown>}
 */
const getData = (req) => {
  return new Promise((resolve, reject) => {
    const form = new Busboy({ headers: req.headers })
    const files = []
    const fields = {}
    const buffers = {}

    form.on('field', (name, value) => {
      fields[name] = value
    })

    form.on('file', (fieldName, file, fileName) => {
      buffers[fileName] = []
      file.on('data', (data) => {
        buffers[fileName].push(data)
      })
      file.on('end', () => {
        files.push({
          fileBuffer: Buffer.concat(buffers[fileName]),
          fieldName,
          fileName
        })
      })
    })

    form.on('finish', () => resolve({ files, fields }))
    form.on('error', e => reject(e))

    req.pipe(form)
  })
}

/**
 * Upload files to cloudinary
 * @param files
 * @returns {Promise<void>}
 */
const uploadToCloudinary = async (files) => {
  if (!files.length) {
    return
  }

  return new Promise((resolve, reject) => {
    let queueSize = files.length
    const uploadedFiles = []

    for (let file of files) {
      const uploadViaStream = cloudinary.uploader.upload_stream({
        folder: process.env.CLOUDINARY_FOLDER,
        width: 200,
        height: 200,
        crop: 'fill'
      }, (error, result) => {
        queueSize--

        if (!error) {
          uploadedFiles.push({
            public_id: result.public_id,
            url: result.secure_url
          })
        }

        if (!queueSize) {
          resolve(uploadedFiles)
        }
      })

      streamifier.createReadStream(file.fileBuffer).pipe(uploadViaStream)
    }
  })
}

/**
 * Save post to database.
 * @param fields
 * @param uploadedFiles
 * @return Promise<{}>
 */
const savePostToDatabase = async ({ fields, uploadedFiles, postedBy }) => {
  const newPost = {
    postedBy,
    postText: fields.postText,
    images: uploadedFiles
  }

  console.log('creating post')
  console.log(newPost)
  return Post.create(newPost)
}

/**
 * Create a post handler.
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
const createPost = async (request, response) => {
  const { files, fields } = await getData(request)
  if (!isDataValid(fields)) {
    return failWithMessage(response, 'Please check your input!')
  }

  const uploadedFiles = await uploadToCloudinary(files)
  const post = await savePostToDatabase({
    fields,
    uploadedFiles,
    postedBy: getUserId(request)
  })

  success(response, post)
}

module.exports = { createPost }
