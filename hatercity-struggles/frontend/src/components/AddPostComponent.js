import React, { useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import callToBackend from '../lib/api/api'

export default function AddPostComponent (props) {
  // Context
  const { user } = useUserContext()

  // States
  const [postText, setPostText] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // States to handle file upload
  const [images, setImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])

  /**
   * Function to handle a click outside the 'add post component'
   * @param e
   */
  const handleParentClick = (e) => {
    e.preventDefault()

    if (e.target === e.currentTarget) {
      alert('Warning! Your post will be erased. Do you really want to close the window?')
      window.location.reload()
    }
  }

  /**
   * Function to handle a click inside the 'add post component'
   * @param e
   */
  const handleChildClick = (e) => {
    e.stopPropagation()
  }

  /**
   * Function to remove the image from the list of all images
   * @param index
   */
  const removeImage = (index) => {
    const newImages = [...images]
    const newPreviewImages = [...previewImages]

    newPreviewImages.splice(index, 1)
    newImages.splice(index, 1)

    setPreviewImages(newPreviewImages)
    setImages(newImages)
  }

  /**
   * Function to upload the images
   * @param e
   */
  const uploadImages = (e) => {
    const files = Array.from(e.target.files)

    files.forEach(file => {
      setPreviewImages(prevImages => {
        return [URL.createObjectURL(file), ...prevImages].slice(0, 4)
      })
      setImages(oldArray => [file, ...oldArray].slice(0, 4))
    })

  }

  /**
   * Function to send all data to the backend
   * @param e
   */
  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()

    if (images.length === 0 && !postText) {
      throw Error('We do not accept empty posts.')
    }

    try {
      const formData = new FormData()
      formData.append('postText', postText)
      images.forEach((image) => {
        formData.append('images[]', image)
      })

      await callToBackend.createPost(formData)
      setIsLoading(false)
      setImages([])
      window.location.reload()
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <div className={props.clicked ? 'add-post-section' : 'hidden-add-post-section'}
         onClick={handleParentClick}
    >
      <form
        onSubmit={handleSubmit}
        className="add-post-form"
        onClick={handleChildClick}
        encType="multipart/form-data"
      >
                <textarea
                  maxLength={2000}
                  className="add-post--text"
                  placeholder="What annoys you?"
                  onChange={(e) => setPostText(e.target.value)}
                  value={postText}
                />
        <small>{postText.length}/2000</small>

        <label htmlFor="add-image">
          <div className="icon-bg">
                    <span className="material-symbols-outlined icon-30">
                      add_photo_alternate
                    </span>
          </div>
        </label>

        <input
          type="file"
          id="add-image"
          max={4}
          title=" "
          multiple
          name="image"
          accept=".png, .jpg, .jpeg, .gif"
          onChange={uploadImages}
        />
        {
          previewImages &&
          previewImages.length > 0 &&
          <div className="preview-image-container">
            {previewImages.map((singleImage, index) => {
              return (
                <div className="preview-image-box">
                  <img
                    className="preview-image"
                    src={singleImage}
                    alt="preview"
                    key={index}
                  />
                  <span
                    className="image-delete"
                    onClick={() => removeImage(index)}
                  >x</span>
                </div>
              )
            })}
          </div>
        }
        <button disabled={isLoading} className="post-btn">&rarr;</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  )
}




