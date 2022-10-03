import React, { useState, useEffect } from "react"
import { usePostContext } from "../hooks/usePostContext"
import { useUserContext } from "../hooks/useUserContext"
import SinglePost from "./SinglePost"
import callToBackend from "../lib/api/api"

export default function SubPosts() {
    // Context
    const { user } = useUserContext()
    const { posts, dispatch } = usePostContext()

    // State to handle errors
    const [error, setError] = useState(null)

    /**
     * Function to get the posts of users the current user is subscribed on
     */
    const fetchPosts = async () => {
        try {
            callToBackend.getSubPosts(user._id)
              .then(data => dispatch({ type: "SET_POSTS", payload: data }))
        } catch (error) { setError(error) }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className="sub-posts">
            <div className="post-section">
            {
            posts ? 
            posts.map(singlePost => {
                return (
                    <SinglePost 
                        key={singlePost._id}
                        post={singlePost}
                    />
                )
            })
            : 
            <h1>{error}</h1>
            }

            </div>
        </div>
    )
}