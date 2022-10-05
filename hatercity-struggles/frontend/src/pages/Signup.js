import React, { useState } from "react"
import ProfileImage from "../components/ProfileImage"
import imgLib from "../data/imgData"
import { useSignup } from "../hooks/useSignup"


export default function Signup() {
    // Context
    const { signup, error, isLoading } = useSignup()

    // States
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState(0)
    const [description, setDescription] = useState("")
    const [images, setImages] = useState(imgLib.imgData)
    const [visible, setVisible] = useState(false)
    
    /**
     * Function to inspect which of the profile images was selected by the user
     * @param id 
     */
    function toggle(id) {
        setImages(prevImages => {
            console.log(prevImages)
            return prevImages.map((image) => {
                return id === image.id ? {...image, isSelected: true} : {...image, isSelected: false}
            })
        })
        setProfileImage(id)
    }

    /**
     * Function to sign up the user
     * @param e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(firstName, lastName, username, email, password, profileImage, description)
    }

    /**
     * Function to set the state of the 'visible' to the opposite one
     * @returns {boolean}
     */
    const handleClick = () => setVisible(!visible) 

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <div className="form-welcome-text">
                <h1>Welcome to Haterville!</h1>
            </div>
            <input 
                type="text"
                placeholder="First Name"
                className="form-input"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                maxLength={20}
            />
            <input 
                type="text"
                placeholder="Last Name"
                className="form-input"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                maxLength={25}
            />
            <input 
                type="text"
                placeholder="Username"
                className="form-input"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                maxLength={14}
            />
            <input 
                type="email"
                placeholder="Email"
                className="form-input"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                maxLength={50}
            />
              <input 
                className="form-input"
                type={visible ? "text" : "password"}
                placeholder="Password"
                value={password}
                maxLength={60}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span 
                className="material-symbols-outlined visibility"
                onClick={handleClick}
              >
                  {!visible ? "visibility" : "visibility_off"}
              </span>
            <h2 className="sign-up-text">Choose Your Fighter:</h2>
            <div className="sign-up-images">
               {images.slice(0, 8).map((singleImg) => {
                  return (
                    <ProfileImage 
                      key={singleImg.id}
                      id={singleImg.id}
                      image={singleImg.image}
                      isSelected={singleImg.isSelected}
                      toggle={toggle}
                    />
                  )
               })}
            </div>

            <h2 className="sign-up-text">Describe yourself:</h2>
            <textarea 
                maxLength={320}
                placeholder="Your Profile Description..."
                className="sign-up-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <span className="input-length">{description.length}/320</span>
            <button disabled={isLoading} className="form-btn">Ready!</button>
            {error && <div className="error">{ error }</div>}
        </form>
    )
}
