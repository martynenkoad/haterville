import { useUserContext } from "./useUserContext"

export const useLogOut = () => {
    const { dispatch } = useUserContext()

    const logout = () => {
        localStorage.removeItem("user")

        dispatch({ type: "LOGOUT", payload: null } )
    }

    return { logout }
}
