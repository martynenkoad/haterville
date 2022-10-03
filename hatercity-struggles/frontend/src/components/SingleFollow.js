import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import FollowButton from "../components/FollowButton"
import imgLib from "../data/imgData"

export default function SingleFollow({ follow, includeButton }) {
    // States
    const [profileImg, setProfileImg] = useState()
    
    useEffect(() => {
        const profileImageIndex = follow.profileImage

        const wantedImage = imgLib.findImage(profileImageIndex)
        setProfileImg(wantedImage)
    }, [])

    return (
        <div className="follow-item">
            <Link to={`/diary/${follow._id}`}>
                <img 
                    src={profileImg}
                    alt="ava"
                    className="profile-img"
                />
            </Link>
            
            <div>
                <Link to={`/diary/${follow._id}`}>
                    <h4>{follow.username}</h4>
                </Link>
                <p>{follow.clickHate} hates</p>
            </div>
            {includeButton && <FollowButton userid={follow._id} />}
            
        </div>
    )
}