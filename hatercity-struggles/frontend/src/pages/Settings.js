import React from "react"
import { useModeContext } from "../hooks/useModeContext"
import { useUserContext } from "../hooks/useUserContext"
import links from "../data/links"
import { Link } from "react-router-dom"

export default function Settings () {
    const { coldMode, toggleMode } = useModeContext()
    const { user } = useUserContext()

    return (
        <div className="settings">
            <h2 className="tracking-in-contract">Settings</h2>
            <div className="settings-section">
                <h3>My Current Info</h3>
                <div className="settings-info">
                    <p><span>First Name:</span> {user.firstName}</p>
                    <p><span>Last Name:</span> {user.lastName}</p>
                    <p><span>Email:</span> {user.email}</p>
                    <p><span>Username:</span> {user.username}</p>
                    <p><span>Click Hate Rating:</span> {user.clickHate}</p>
                    <Link to="/editprofile"> 
                        <button className="follow-btn">Edit Profile</button>
                    </Link>
                </div>
            </div>
            <div className="settings-section">
                <h3>Support</h3>
                <Link to="/support">
                  Support Page
                </Link>
                <p>Connect with me on <a href={links.instaLink}>Instagram</a> {";)"}</p>
            </div>
            <div className="settings-mode">
                <span className="label">Cold Mode</span>
                <span className="material-symbols-outlined toggle-mode" onClick={toggleMode}>
                    {coldMode ? "toggle_on" : "toggle_off"}
                </span>
            </div>
        </div>
    )
}
