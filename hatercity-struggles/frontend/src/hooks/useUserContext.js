import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export const useUserContext = () => {
    const context = useContext(UserContext)

    if(!context) {
        throw Error("useUserContext must be in UserContextProvider")
    }

    return context
}