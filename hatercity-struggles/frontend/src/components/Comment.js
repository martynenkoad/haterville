import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import callToBackend from "../lib/api/api"
import imgLib from "../data/imgData"

export default function Comment({ commentar, postId, token, setPost, userid }) {
    // States
    const [profileImg, setProfileImg] = useState()
    const [comment, setComment] = useState(commentar)

    /**
     * Function to delete the selected comment
     */
    const deleteComm = async () => {
      try {
        callToBackend.deleteComment(postId, comment._id)
          .then(data => {
            setComment(undefined)
            setPost(data)
          })
      } catch (error) { console.log(error) }
    } 

    useEffect(() => {
      const wantedImage = imgLib.findImage(comment.commentator.profileImage)
      setProfileImg(wantedImage)
    }, [])

    return(
        <>
        { 
        comment ?
          <div className="single-comment">
            <div className="single-comment-part">
              <Link to={`/diary/${comment.commentator._id}`}>
                <img className="profile-img" src={profileImg} alt="ava" />
              </Link>
              <div>
                <Link to={`/diary/${comment.commentator._id}`}>
                  <h5 className="comment-user">{comment.commentator.username}</h5>
                </Link>
                <span className="comment-text">{comment.text}</span>
              </div>
            </div>
                <span 
                  className="material-symbols-outlined delete-comment"
                  onClick={deleteComm}
                  style={comment.commentator._id === userid ? {} : { "display": "none" }}
                >
                  delete
                </span>          
          </div>
          :
          <div></div>
        }
        </>
    )
}