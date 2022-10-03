import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { formatDistance, subDays } from "date-fns"
import { useUserContext } from "../hooks/useUserContext"
import callToBackend from "../lib/api/api"
import imgLib from "../data/imgData"

export default function SinglePost(props) {
    // Context & props
    const { post } = props
    const { user } = useUserContext()

    // States
    const [profileImg, setProfileImg] = useState()
    const [singlePost, setSinglePost] = useState(post)
    const { username } = post.postedBy
    const [text, setText] = useState("")
    const [error, setError] = useState('')
    const [isImageClicked, setIsImageClicked] = useState(false)

    /**
     * Function to toggle the state of the image (whether it's clicked or not)
     * @returns {boolean}
     */
    const toggleImage = () => setIsImageClicked(!isImageClicked)

    /**
     * Function to like the post
     */
    const likePost = async () => {
        try {
            callToBackend.like(post._id)
              .then(data => setSinglePost(data))
        } catch (error) { setError(error) }
    }

    /**
     * Function to unlike the post
     */
    const unlikePost = async () => {
        try {
            callToBackend.unlike(post._id)
              .then(data => setSinglePost(data))
        } catch (error) { setError(error) }
    }

    /**
     * Function to comment the post
     */
    const commentPost = async (e) => {
        e.preventDefault()  
        if(text === '') {
            setError('Do you really want to leave the empty comment? :(')
            return
        }      
        try {
            callToBackend.comment(singlePost._id, text)
              .then(data => {
                setError(null)
                setSinglePost(data)
                setText("")
              })
        } catch (error) { setError(error) }
    }
 
    /**
     * Function to delete the post
     */
    const handleDelete = async () => {
        try { 
            callToBackend.deleteThePost(singlePost._id)
              .then(data => window.location.reload())
        } catch (error) { setError(error) }
    }

    useEffect(() => {
        const wantedImage = imgLib.findImage(singlePost.postedBy.profileImage)

        setIsImageClicked(false)
        setProfileImg(wantedImage)
    }, [])

    return(
    
    <div className="card">
        <div className="user-info">
            <Link to={`/diary/${post.postedBy._id}`}>
                <img 
                  className="profile-img"
                  alt="ava"
                  src={profileImg}
                />
            </Link>
            <Link to={`/diary/${post.postedBy._id}`}>
                <span className="username">{username}</span>
            </Link>
        </div>
    <div className="post-text">{singlePost.postText}</div>
        {singlePost.images.length >= 1 && 
        <div className={isImageClicked ? "img-bg-fullscreen" : "carousel"}> 
        <Carousel 
            className="main-slide" 
            swipeable={true}
            emulateTouch={true}
            showIndicators={false}
            showStatus={singlePost.images.length === 1 ? false : true}
        >
            { singlePost.images.map(singleImage => {
              return ( 
                <div  
                  onClick={toggleImage}
                  key={singleImage.public_id}
                >
                  <img
                      src={singleImage.url}
                      className={isImageClicked ? "user-img-fullscreen" : "user-img"}
                      alt=""
                  />
                </div>
              )
              })}
        </Carousel>
        </div>
        }
        <form onSubmit={commentPost} className="comment">
            <input 
                type="text"
                maxLength={200}
                className="form-input comment-input" 
                placeholder="Leave your thoughts...."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button className="comment-btn">Comment</button>
        </form>
        <div className="post-info">
            <span className="post-time">{formatDistance(subDays(new Date(), 0), new Date(singlePost.createdAt), { addSuffix: true })}</span>
            <div className="post-info-reactions">
                <span 
                    className={`material-symbols-outlined ${singlePost.hates.includes(user._id) ? 'liked' : ''}`} 
                    onClick={singlePost.hates.includes(user._id) ? unlikePost : likePost}
                >
                    sentiment_very_dissatisfied
                </span>
                <h6>{singlePost.hates.length} hates</h6>
                <Link to={`/post/${post._id}`}>
                    <h6>{singlePost.comments.length} comments</h6>
                </Link>
            </div>
        </div> 
        
        {error && <span>{error}</span>}
        <div className="after-post-text">
          <Link to={`/post/${post._id}`} className="show">
              Show whole post....
          </Link>
          <span 
            className="material-symbols-outlined delete-post"
            onClick={handleDelete}
            style={singlePost.postedBy._id === user._id ? {} : { "display": "none" }}
          >
            delete
          </span>
          
        </div>
    </div>
    )
}