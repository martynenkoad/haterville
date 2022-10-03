import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SingleFollow from "./SingleFollow"
import callToBackend from "../lib/api/api"

export default function ClickHateRating() {

    // State to store all the users
    const [users, setUsers] = useState([])

    /**
     * Function to get the users depending on click-hate rating (in the descending order)
     */
    const getRating = async () => {
        try {
            callToBackend.getClickHateRating()
              .then(data => {
                setUsers(data.splice(0, 10))
              })
        } catch (error) { console.log(error) }
    }

    useEffect(() => {
        getRating()
    }, [])

    return (
        <div className="click-hate-rating">
            {
                users.length !== 0 &&
                <div className="click-hate-container">
                    <h1 className="tracking-in-contract">TOP 10 HATERS</h1>
                    <h3>Check out our "Click Hate" winners of the day ;{')'}</h3>
                    <div className="winner">
                        <h2>Winner is:</h2>
                        <SingleFollow follow={users[0]} includeButton={false} />
                    </div>
                    <h3>TOP 9:</h3>

                    <div className="click-hate-top-9">
                    {
                        users.map((person, index) => {
                            if (index === 0) return <div key={person._id}></div>
                            else {
                                return (
                                    <div className={`click-hate-card click-hate-card-${index}`} key={person._id}>
                                        <SingleFollow 
                                           follow={person}
                                           includeButton={false} 
                                        />
                                    </div>
                                )
                            }
                        })
                    }                    
                    </div>
                    <div className="click-hate-follow-section">
                        <h2>Want to get more clicks?</h2>
                        <Link to="/clickhate">
                          <button className="follow-btn">Follow me!</button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}