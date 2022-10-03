import React, { useState, useEffect } from "react"
import { useUserContext } from "../hooks/useUserContext"
import callToBackend from "../lib/api/api"
import handleStorage from "../hooks/handleStorage"

export default function ClickHate() {
    // Context
    const { user, dispatch } = useUserContext()

    // State to handle input changes
    const [userInput, setUserInput] = useState("")
 
    // States to handle the output of rating & errors
    const [clicks, setClicks] = useState(0)
    const [userRating, setUserRating] = useState(user ? user.clickHate : 0)
    const [error, setError] = useState(null)

    useEffect(() => { 
        handleStorage.updateUser(user)
    }, [user])

    /**
     * Function to update the current user's click-hate rating
     */
    const handleClick = async () => {
        try {
        callToBackend.updateClickHate(clicks)
          .then(data => {
            setClicks(0)
            setError(null)
            dispatch({ type: "CLICKHATE", payload: { clickHate: data.clickHate } })
          })

        } catch(error) { setError(error) }

    }


    useEffect(() => {
        setUserRating(user.clickHate)
    }, [user.clickHate])

    return (   
        
        <div className="click-hate">
            <h2 className="tracking-in-contract">Click whenever you need to.</h2>

            <div className="button-center">
                <div className="button button-1">
                    <button
                      onClick={() => { 
                        setClicks(clicks + 1) 
                        setUserRating(userRating + 1)
                    }}
                    >{userInput ? userInput : "Click me"}</button>
                    <span></span>
                </div>
            </div>
            
            
            <form className="click-hate-form">
                <input 
                  maxLength={21}
                  type="text"
                  className="form-input"
                  placeholder="I find annoying...."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
            </form>

            <div className="click-hate-statistics"> 
                <h3>Clicks: {clicks}</h3>
                <button className="follow-btn" onClick={handleClick}>Add Clicks To My Rating</button>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
        
    )
}