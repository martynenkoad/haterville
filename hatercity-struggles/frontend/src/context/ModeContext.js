import React, { createContext,  useEffect, useState } from "react"
import handleStorage from "../hooks/handleStorage"

export const ModeContext = createContext()

export const ModeContextProvider = ({ children }) => {
    const [coldMode, setColdMode] = useState(false)

    const toggleMode = () => {
        setColdMode(!coldMode)
        handleStorage.updateMode(coldMode ? "cold" : "hot")
    }

    useEffect(() => {
        setColdMode(handleStorage.getMode() === "cold" ? false : true)
    }, [])

    return (
        <ModeContext.Provider value={{ coldMode, toggleMode }}>
            {children}
        </ModeContext.Provider>
    )
}