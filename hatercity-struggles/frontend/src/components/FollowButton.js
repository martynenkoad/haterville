import React, { useState } from "react"
import { useUserContext } from "../hooks/useUserContext"
import callToBackend from "../lib/api/api"

export default function FollowButton({ userid }) {
    // Context
    const { user, dispatch } = useUserContext()

    // State to inspect whether the current user is following the wanted user 
    const [showFollow, setShowFollow] = useState(user ? !user.following.includes(userid) : true)

    /**
     * Function to follow the wanted user
     */
    const followUser = async () => {
        try {
            callToBackend.follow(userid)
              .then(data => {
                dispatch({ type: "UPDATE", payload: { followers: data.followers, following: data.following } })
                setShowFollow(false)
              })
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Function to unfollow the wanted user
     */
    const unfollowUser = async () => {
        try {
            callToBackend.unfollow(userid)
              .then(data => {
                dispatch({ type: "UPDATE", payload: { followers: data.followers, following: data.following } })
                setShowFollow(true)
              })
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Function to decide which function (follow/unfollow) to use
     */
    const toggleFollowState = () => showFollow ? followUser() : unfollowUser()
    
    return (
        <div>
            <button
                className="follow-btn"
                onClick={toggleFollowState}
            >{showFollow ? "Start Hating Together" : "Break Up With User"}</button>
        </div>
    )
}