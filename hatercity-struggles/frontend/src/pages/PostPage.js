import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import SinglePost from "../components/SinglePost"
import { useUserContext } from "../hooks/useUserContext"
import Comment from "../components/Comment"
import callToBackend from "../lib/api/api"

export default function Post() {
    // Context
    const { postid } = useParams()
    const { user } = useUserContext()
    
    // States
    const [error, setError] = useState(null)
    const [post, setPost] = useState(null)
    const [showComments, setShowComments] = useState(true)
 
    /**
     * Function to get the needed post
     */
    const fetchPost = async () => {
        try {
          callToBackend.getPost(postid)
            .then(data => setPost(data))
        } catch (error) { setError(error) }
    }

    /**
     * Function to toggle the state of the showComments
     * @returns {boolean}
     */
    const toggle = () => setShowComments(!showComments)

    useEffect(() => {
        fetchPost() 
    }, []) 


    return (
        <>
         { post ?
            <div className="single-post-page">
                <SinglePost 
                  post={post}
                />
                <div className="comment-section">
                  <div className="comment-header"> 
                    <h3>Comments {`(${post.comments.length}):`}</h3>
                    <span id="arrow"
                      className="show-more-arrow material-symbols-outlined" 
                      onClick={toggle}
                    >{showComments ? "arrow_drop_up" : "arrow_drop_down"}</span>
                  </div> 
                {
                  post.comments &&
                  showComments &&
                  post.comments.map(comment => {
                    return (
                        <Comment 
                          key={comment._id}
                          commentar={comment}
                          postId={post._id}
                          token={user.token}
                          userid={user._id}
                          setPost={setPost}
                        />
                    )
                  })
                }
                </div>
            </div> :
            <h6>{error}</h6>
            }
        </>
    )
}