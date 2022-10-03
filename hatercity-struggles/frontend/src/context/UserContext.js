import React, { createContext, useReducer, useEffect } from "react"

export const UserContext = createContext()

export const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": 
            return {
                user: action.payload
            }
        case "LOGOUT":
            return {
                user: null
            }
        case "UPDATE":
            return {
                user: {
                    ...state.user,
                    followers: action.payload.followers,
                    following: action.payload.following        
                }
            }
        case "CLICKHATE": 
            return {
                user: {
                    ...state.user,
                    clickHate: action.payload.clickHate
                }
            }
        case "SEARCH":
            return action.payload
        default: 
            return state
    }
}

export const UserContextProvider = ({ children }) => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"))
    const [state, dispatch] = useReducer(userReducer, {
        user: userFromStorage ? userFromStorage : null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        if(user) {
            dispatch({ type: "LOGIN", payload: user })
        }
    }, [])

    return(
        <UserContext.Provider value={{...state, dispatch}}>
            { children }
        </UserContext.Provider>
    )
}
