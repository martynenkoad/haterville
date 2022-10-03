import React, { useState, useEffect } from "react"
import standartHater from "../img/standartHater.png"
import settings from "../img/settings.png"
import options from "../img/options.png"
import { Link } from "react-router-dom"
import { useLogOut } from "../hooks/useLogOut"
import { useUserContext } from "../hooks/useUserContext"
import imgLib from "../data/imgData"

export default function Sidebar() {

    // Context
    const { user } = useUserContext()
    const { logout } = useLogOut()

    // States
    const [isShown, setIsShown] = useState(false)
    const [profileImg, setProfileImg] = useState()

    /**
     * Function to toggle the isShown state
     */
    const toggleShown = () => setIsShown(!isShown) 

    useEffect(() => {
        const profileImgIndex = user.profileImage
        const wantedImage = imgLib.findImage(profileImgIndex)

        setProfileImg(wantedImage)
        setIsShown(false)
    }, [user])

    /**
     * Function to handle log out
     */
    const handleLogOut = () => {
        logout()
    }

    return(
      <div>
        { user &&
        <div className={isShown ? "sidebar" : "hidden-sidebar"} >
            <img 
                src={options} 
                className={isShown ? "opt sidebar-opt rotate-in-2-cw" : "opt rotate-in-2-ccw" }
                alt="options" 
                onClick={toggleShown} 
            />
            <Link className="user-info" to={`/diary/${user._id}`}>
                <img className="profile-img" src={profileImg} alt='profile pic' />
                <span className="username">{user.username}</span>
            </Link>
            <div className="options">
                <Link className="options-section" to={`/diary/${user._id}`}>
                    <img src={standartHater} alt="my profile pic" className="options-img"/>
                    <span className="option">Diary</span>
                </Link>
                <Link className="options-section" to="/clickhate">
                    <img src={standartHater} alt="my profile pic" className="options-img"/>
                    <span className="option">Click Hate</span>
                </Link>
                <Link className="options-section" to="/click-hate-shop">
                    <img src={standartHater} alt="my profile pic" className="options-img"/>
                    <span className="option">Shop</span>
                </Link>
            </div>

            <div className="options">
                <Link className="options-section" to="/settings">
                    <img src={settings} alt="settings pic" className="options-img" />
                    <span className="option">Settings</span>
                </Link>
            </div>
            { user &&
                <button
              onClick={handleLogOut}
            >Log Out</button>}
        </div>
        }
      </div>
    )
}