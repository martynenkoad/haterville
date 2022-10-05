import React, { useState, useEffect } from "react"
import imgLib from "../data/imgData"
import { useUserContext } from "../hooks/useUserContext"
import ProfileImage from "../components/ProfileImage"
import { Link } from "react-router-dom"
import callToBackend from "../lib/api/api"
import handleStorage from "../hooks/handleStorage"

export default function ImageShop() {
    // Context
    const { user, dispatch } = useUserContext()

    // States 
    const [images, setImages] = useState(imgLib.imgData)
    const [error, setError] = useState(null)
    const [showImage, setShowImage] = useState()

    /**
     * Function to inspect which image has been selected by the user
     * @param id 
     */
    const toggle = (id) => {
        setImages(prevImages => {
            return prevImages.map((image) => {
                return id === image.id ? {...image, isSelected: true} : {...image, isSelected: false}
            })
        })
        setShowImage(imgLib.imgData.find(img => img.id === id))
    }

    /**
     * Function to find the image chosen by the user
     */
    const lockedHater = imgLib.imgData.find(img => img.id === 0)

    /**
     * Function to set the unlocked images for the current user depending on their click-hate rating
     */
    const setUnlocked = () => {
        let newImages = []
        images.forEach((image, index) => {
            if (image.numOfClicks && user.clickHate < image.numOfClicks) {
                newImages.push({...lockedHater, id: index + 3000})
            } else {
                newImages.push(image)
            }
        })
        setImages(newImages)
    }

    /**
     * Function to update the user's profile image to the selected one
     */
    const updateProfileImage = async () => {
        try {
            const profileImage = showImage.id
            callToBackend.editProfile({ profileImage })
              .then(data => {
                dispatch({ type: "LOGIN", payload: data })
                handleStorage.updateUser(data) 
              })
        } catch (error) { setError(error) }
    }

    useEffect(() => {
       setUnlocked()
    }, [])

    return (
        
            <div className="shop-images-container">
                <h1 className="tracking-in-contract">Click Hate Shop</h1>
                <h4>Check out the profile images we've prepared for you ;{")"}</h4>
                <div className="shop-images">
                <>
               {images.map((singleImg, index) => {    
                    if(singleImg.id !== 0) {
                      return (
                        <div className="single-image" key={singleImg.id + 40}>
                            <ProfileImage 
                              id={singleImg.id}
                              image={singleImg.image}
                              isSelected={singleImg.isSelected}
                              toggle={toggle}
                            />
                            <p>{imgLib.imgData[index].numOfClicks}</p>
                          </div>
                      )        
                    }
               })}
               </>
               {
                showImage &&
                <div className="popup-image">
                    <img 
                      src={showImage.image}
                      alt=""
                      onClick={() => setShowImage(false)}
                    />
                    <h3>{showImage.description.title}</h3>
                    <p>Superpower: {showImage.description.superpower}</p>
                    { user.profileImage !== showImage.id  &&
                    <button 
                    onClick={updateProfileImage}
                    className="follow-btn">Choose Profile Image</button>
                    }
                </div>
               }
               </div>

               <div className="shop-links">
                  <h3>Wanna get more click-hates?</h3>
                  <Link 
                    to="/clickhate"
                    className="follow-btn"
                  >Get More Click-Hates &rarr;</Link>

                  <h3>Want to take a look at guys with cool profile images?</h3>
                  <Link 
                    to="/click-hate-rating"
                    className="follow-btn"
                  >Click Hate Rating &rarr;</Link>
               </div>
               {error && <div>{error}</div>}
            </div>
    )
}