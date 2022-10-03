import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { usePostContext } from "../hooks/usePostContext"
import { useUserContext } from "../hooks/useUserContext"
import SinglePost from "./SinglePost"
import callToBackend from "../lib/api/api"

export default function DiaryComponent() {
    // Context
    const { userid } = useParams()
    const { posts, dispatch } = usePostContext()

    // State to handle errors
    const [error, setError] = useState(null)
 
    /**
     * Function to get all the posts
     */
    const fetchPosts = async () => {
        try {
            callToBackend.getPostsOfUser(userid)
              .then(data => {
                dispatch({ type: 'SET_POSTS', payload: data.posts })
              })
        } catch(error) { setError(error) }
    }

    useEffect(() => {
        fetchPosts()
    }, [])
    
    return (
        <div className="diary-posts">
            <div className="post-section">
            {posts ? 
            posts.map(singlePost => {
                return (
                    <SinglePost 
                        key={singlePost._id}
                        post={singlePost}
                    />
                )
            })
            : 
            <h1>{error}</h1>}
            </div>
        </div>
    )
}