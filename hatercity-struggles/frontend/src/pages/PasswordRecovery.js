import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import callToBackend from "../lib/api/api"

// MAYBE ALSO ADD CONFIRM PASSWORD

export default function PasswordRecovery() {
    // Context
    const { token } = useParams()

    // States
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordSet, setPasswordSet] = useState(null)
    const [error, setError] = useState(null)

    /**
     * Function to set the current state 'visible' to the opposite
     * @returns {boolean}
     */
    const handleClick = () => setVisible(!visible) 

    /**
     * Function to reset the user's password
     * @param e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault()

        try { 
          // resetPassword({ password, token })
          callToBackend.resetPass(password, token)
            .then(data => {
              setError(null)
              setPasswordSet(true)
            })
        } catch (error) { 
          setError(error) 
        }
    }

    return (
        <>
          <form
            className="forgot-password"
            onSubmit={handleSubmit}
          >
              <div>
                <h1>Now it's time to reset your password!</h1>
                <p>Write it somewhere, just not to forget..</p>
              </div>
              <input 
                type={visible ? "text" : "password"}
                className="form-input"
                value={password}
                placeholder="Enter the new password...."
                onChange={(e) => setPassword(e.target.value)}
              />
              <span 
                className="material-symbols-outlined visibility"
                onClick={handleClick}
              >
                  {!visible ? "visibility" : "visibility_off"}
              </span>
              <button className="follow-btn">Reset Password</button>
              {error && <div>{error}</div>}
              {
                !error && passwordSet &&
                <Link to="/login" className="login-link">
                  Password was successfully changed!
                  Follow me to log in again (now with the new password)
                </Link>
              }
          </form>
        </>
    )
}