import { useState } from "react"
import { useUserContext } from "../hooks/useUserContext"
import callToBackend from "../lib/api/api"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useUserContext()

    const login = async (username, password) => {
        setError(null)
        setIsLoading(true)

        callToBackend.loginUser({ username, password })
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

    return { login, error, isLoading }
    
}
