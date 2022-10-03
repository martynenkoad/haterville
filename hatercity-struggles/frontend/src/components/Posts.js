import React, { useState, useEffect } from "react"
import SinglePost from "./SinglePost"
import { usePostContext } from "../hooks/usePostContext"

export default function Post() {
    // Context
    const { posts, isSearchActive, foundPosts } = usePostContext()

    // State to store the current posts (searched/fetched)
    const [currentPosts, setCurrentPosts] = useState([])
    
    useEffect(() => {
      !isSearchActive ? setCurrentPosts(posts) : setCurrentPosts(foundPosts)
    }, [foundPosts])

    return(
        <>
            { 
              currentPosts.map((singlePost) => {
                return (
                    <SinglePost 
                        key={singlePost._id}
                        post={singlePost}
                    />
                )
              })
            }
        </>
    )
}
    