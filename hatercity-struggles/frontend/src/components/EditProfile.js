import React, { useState } from "react"
import { useUserContext } from "../hooks/useUserContext"
import { useNavigate } from "react-router-dom"
import callToBackend from "../lib/api/api"
import handleStorage from "../hooks/handleStorage"

export default function EditProfile() {
    // Context
    const { user, dispatch } = useUserContext()
    const navigate = useNavigate()

    // States to handle user changes
    const [firstName, setFirstName] = useState(user ? user.firstName : "")
    const [lastName, setLastName] = useState(user ? user.lastName : "")
    const [description, setDescription] = useState(user ? user.description : "")
    const [email, setEmail] = useState(user ? user.email : "")
    const [error, setError] = useState(null)

    /**
     * Function to edit the user's profile
     * @param e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault() 
        try { 
          callToBackend.editProfile({ firstName, lastName, email, description })
            .then(data => {
              console.log(data)
              dispatch({ type: 'LOGIN', payload: data })
              handleStorage.updateUser(data)
              navigate("/")
            })
        } catch (error) { setError(error) }
    }

    return (
        <form 
          onSubmit={handleSubmit}
          className="edit-profile">
            <h1 className="tracking-in-contract">Edit Your Profile</h1>
            <div className="edit-profile-section">
                <label htmlFor="firstName">First Name</label>
                <input 
                  id="firstName"
                  className="form-input"
                  maxLength={20}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="edit-profile-section">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  id="lastName"
                  className="form-input"
                  maxLength={25}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="edit-profile-section">
                <label htmlFor="email">Email</label>
                <input 
                  id="email"
                  className="form-input"
                  maxLength={50}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <label htmlFor="descriprion">Description</label>
            <textarea 
              id="descriprion"
              className="sign-up-description"
              maxLength={320}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="follow-btn edit-btn">Edit</button>
            { error && <div className="error">{error}</div> }
        </form>
    )
}