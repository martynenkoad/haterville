import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"

export default function Login() {
    // Context
    const { login, error, isLoading } = useLogin()

    // States 
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)

    /**
     * Function to log in the user
     * @param e 
     */
    async function handleSubmit(e) {
      e.preventDefault()
      await login(username, password)
    } 

    // Function to set the state of 'visible' to the opposite
    const handleClick = () => setVisible(!visible) 

    return (
      <div>
        
        <form className="login" onSubmit={handleSubmit}>
            <div className="form-welcome-text">
                <h1>Welcome to Haterville!</h1>
            </div>
            <input 
              className="form-input"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            
                <input 
                  className="form-input"
                  placeholder="Password"
                  type={visible ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <span 
                  className="material-symbols-outlined visibility"
                  onClick={handleClick}
                >
                    {!visible ? "visibility" : "visibility_off"}
                </span>

            <button disabled={isLoading} className="form-btn">Log In</button>

            <div className="form-text">
              <Link to="/forgot-password">
                Password recovery
              </Link>
              <Link to="/signup">
                Registration
              </Link>
            </div>
	   {error &&  <div className="error">{error.message}</div>}

        </form>
      </div>
    )
}
