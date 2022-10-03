import { useState } from "react"
import callToBackend from "../lib/api/api"
import { useUserContext } from "./useUserContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useUserContext()
 
    const signup = async (firstName, lastName, username, email, password, profileImage, description) => {
        setIsLoading(true)
        setError(null)

        callToBackend.signupUser({ firstName, lastName, username, email, password, profileImage, description })
          .then(data => {
            localStorage.setItem("user", JSON.stringify(data))
            dispatch({ type: "LOGIN", payload: data })
            setIsLoading(false)
          })
          .catch(error => {
            setError(error)
            setIsLoading(false)
          })
    }
    
    return { signup, error, isLoading }
    
}
