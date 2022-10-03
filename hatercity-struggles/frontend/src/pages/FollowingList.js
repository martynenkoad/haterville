import React, { useState, useEffect } from "react"
import { useUserContext } from "../hooks/useUserContext"
import SingleFollow from "../components/SingleFollow"
import { useParams } from "react-router-dom"
import callToBackend from "../lib/api/api"

export default function FollowingList() {
    // Context
    const { user } = useUserContext()
    const { userid } = useParams()

    // State to store users the current user is following
    const [followingList, setFollowingList] = useState([])

    /**
     * Function to get the lists of users the current user is following
     */
    const fetchTheUser = async () => {
        try {
            callToBackend.getUser(userid)
              .then(data => {
                setFollowingList(data.user.following)
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
                followingList.length > 0 &&
                <div>
                    <h1>Guys {userid === user._id ? "I" : "They"} hate:</h1>
                    { followingList.map(item => {
                        return (
                            <SingleFollow 
                              key={item._id}
                              follow={item}
                              includeButton={true}
                            />
                        )
                    }) }
                </div>
            } {
                followingList.length === 0 &&
                <div className="no-follow">
                    <h1>Nobody is {userid === user._id ? "your" : "their"} hater yet... :{"("}</h1>
                </div>
            }
        </div>
    )
}