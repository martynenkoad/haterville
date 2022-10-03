import React, { useState } from "react"
import { useParams } from "react-router-dom"
import AnyUserProfileInfo from "../components/AnyUserProfileInfo"
import DiaryComponent from "../components/DiaryComponent"
import SubPosts from "../components/SubPosts"
import ClickHate from "../components/ClickHate"
import { useUserContext } from "../hooks/useUserContext"

export default function AnyUserProfile() {
    // Context
    const { user } = useUserContext()
    const { userid } = useParams()

    // State
    const [page, setPage] = useState("DIARY")

    return (
        <div style={{'overflowX': 'hidden'}}>     
            <AnyUserProfileInfo />
            {user._id === userid && 
                <div className="profile-options">
                <div className={page === "DIARY" ? "profile-option-chosen" : "profile-option"} onClick={() => setPage("DIARY")}>
                    My diary
                </div>
                <div className={page === "SUBS" ? "profile-option-chosen" : "profile-option"} onClick={() => setPage("SUBS")}>
                    Haters
                </div>
                <div className={page === "CLICKHATE" ? "profile-option-chosen" : "profile-option"} onClick={() => setPage("CLICKHATE")}>
                    Click Hate
                </div>
            </div>
            } {
                page === "DIARY" &&
                <DiaryComponent />
            } {
                page === "SUBS" &&
                <SubPosts />
            } {
                page === "CLICKHATE" &&
                <ClickHate />
            }
        </div>
    )
}