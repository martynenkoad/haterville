import React,{ useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"
import FollowButton from "./FollowButton"
import callToBackend from "../lib/api/api"
import handleStorage from "../hooks/handleStorage"
import imgLib from "../data/imgData"

export default function AnyUserProfileInfo() {
    // Context
    const { user } = useUserContext()
    const { userid } = useParams()

    // States
    const [error, setError] = useState(null)
    const [profileImg, setProfileImg] = useState()
    const [wantedUser, setWantedUser] = useState(null)
 
    useEffect(() => {
        handleStorage.updateUser(user)
    }, [user])

    /**
     * Function to get the information about the wanted user
     */
    const fetchTheUser = async () => {
        try {
            callToBackend.getUser(userid)
              .then(data => {
                const profileImageIndex = data.user.profileImage
                setWantedUser(data.user)

                const wantedImage = imgLib.findImage(profileImageIndex)
                setProfileImg(wantedImage)
              })
            
        } catch (error) {
            setError(error)
        }
        
    }    
    
    useEffect(() => { 
        fetchTheUser()
    }, [])

    return (
        <>
        {wantedUser ?
            <div className="profile">
            <div className="profile-bg-img">
               <img 
                 className="profile-img"
                 src={profileImg}
                 alt=""
               />
            </div>
            <div className="profile-user-info">
                <span className="profile-user">{wantedUser.username}</span>
                <div className="profile-description">{wantedUser.description}</div>
            </div>
            {user._id !== userid &&
                <FollowButton userid={userid} />
            }
            <div className="user-info-prof">
                <Link to={`/followers/${userid}`} className="span">
                    <span>{wantedUser.followers.length} followers</span>
                </Link>
                <Link to={`/following/${userid}`} className="span">
                    <span>{wantedUser.following.length} following</span>
                </Link>
                <Link to="/click-hate-rating">
                    <span className="span">ClickHate Rating: {wantedUser.clickHate}</span>
                </Link>
            </div>
            
        </div>
        : <h1>{error}</h1>}
        </>
    )
}