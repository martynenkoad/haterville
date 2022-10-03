import React, { useState, useEffect } from "react"
import AddPostComponent from "../components/AddPostComponent"
import Sidebar from "../components/Sidebar"
import Posts from "../components/Posts"
import { usePostContext } from "../hooks/usePostContext"
import { useUserContext } from "../hooks/useUserContext"
import Searchbar from "../components/Searchbar"
import callToBackend from "../lib/api/api"

export default function Home() {
    // Context
    const { user } = useUserContext()
    const { posts, dispatch } = usePostContext()

    // State to inspect whether the 'add-post-button' is clicked
    const [addPostClicked, setAddPostClicked] = useState(false)
    
    /** 
     * Function to get all the posts from DB
     */
    const fetchPosts = async () => {
      callToBackend.getPosts()
        .then(data => dispatch({ type: 'SET_POSTS', payload: data }))
    }

    useEffect(() => {
      if(user) {
        fetchPosts()
      }
    }, [dispatch, user])


    return(
        <div className="home-page">
            <Sidebar />
            <Searchbar />
            {posts &&
              <div className="post-section">
                    <Posts />
              </div>
            }

            <button 
              onClick={setAddPostClicked}
              className="add-post-btn"
            >+</button>

            <AddPostComponent 
              setAddPostClicked={setAddPostClicked}
              clicked={addPostClicked}
            />
        </div>
    )
}