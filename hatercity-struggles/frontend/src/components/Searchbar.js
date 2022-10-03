import React, { useState } from "react"
import { usePostContext } from "../hooks/usePostContext"

export default function Searchbar() {
    // Context
    const { dispatch } = usePostContext()

    // State to handle the input changes
    const [input, setInput] = useState("")

    /**
     * Function to handle the changes in the search bar component
     * @param e 
     */
    const handleChange = (e) => {
        const { value } = e.target
        const searchText = value.trim().toLowerCase()

        setInput(value)
        dispatch({ type: "SEARCH_POSTS", payload: searchText })
    }    

    return(
        <form className="search-input">
            <div>
                <input 
                  type="text"
                  placeholder="Search..."
                  value={input}
                  onChange={handleChange}
                />
                <span className="material-symbols-outlined">
                    search
                </span>
            </div>
        </form>
    )
}