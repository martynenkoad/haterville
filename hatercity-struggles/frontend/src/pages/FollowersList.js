import React, { useState, useEffect } from "react"
import { useUserContext } from "../hooks/useUserContext"
import SingleFollow from "../components/SingleFollow"
import { useParams } from "react-router-dom"
import callToBackend from "../lib/api/api"

export default function FollowingList() {
    // Context
    const { user } = useUserContext()
    const { userid } = useParams()

    // State to store the list of users who follow the current user
    const [followersList, setFollowersList] = useState([])

    /** 
     * Function to get the user's followers
     */
    const fetchTheUser = async () => {
        try {
            callToBackend.getUser(userid)
              .then(data => {
                setFollowersList(data.user.followers)
              })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTheUser()
    }, [])

    return (
        <div className="follow-list">
            { 
                user &&
                followersList.length > 0 &&
                <div>
                    <h1>The Haters:</h1>
                    { followersList.map(item => {
                        return (
                            <SingleFollow 
                              key={item._id}
                              follow={item}
                              includeButton={true}
                            />
                        )
                    }) }
                </div>
            }
            {
                followersList.length === 0 &&
                <div className="no-follow">
                    <h1>Nobody is {userid === user._id ? "your" : "their"} hater yet... :{"("}</h1>
                </div>
            }
        </div>
    )
}