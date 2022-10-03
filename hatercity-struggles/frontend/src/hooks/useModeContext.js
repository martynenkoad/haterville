import { useContext } from "react"
import { ModeContext } from "../context/ModeContext"

export const useModeContext = () => {
    const context = useContext(ModeContext)

    if(!context) {
        throw Error("useModeContext must be in ModeContextProvider")
    } 

    return context 
}
