import React, { useState } from "react"
import callToBackend from "../lib/api/api"

export default function ForgotPassword() {

    // States to store the email and handle errors
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)

    /**
     * Function to handle the submit
     * @param e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
 
        try {
            callToBackend.handleForgotPass(email)
              .then(data => setError(data.message))
        } catch (error) { console.log(error) }
    }

    return (
        <form
          className="forgot-password"
          onSubmit={handleSubmit}
        >
            <div>
                <h1>Forgot Password?</h1>
                <p>No worries! Enter your email to reset the password :{")"}</p>
            </div>
            <input 
              type="email"
              placeholder="Enter You Email Here...."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="follow-btn">&rarr;</button>
            {error && <span>{error}</span>}
        </form>
    )
}