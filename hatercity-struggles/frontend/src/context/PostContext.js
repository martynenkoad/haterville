import React, { createContext, useReducer } from "react"

export const PostContext = createContext()

export const PostReducer = (state, action) => {
    switch(action.type) {
        case "SET_POSTS":
            return {
                posts: action.payload,
                isSearchActive: false,
                foundPosts: []
            }
        case "CREATE_POST":
            return {
                posts: [action.payload],
                isSearchActive: false,
                foundPosts: []
            }
        case "DELETE_POST":
            return {
                posts: state.posts.filter(post => post._id !== action.payload._id),
                isSearchActive: false,
                foundPosts: []
            }
        case "SEARCH_POSTS":
            const searchActive = !!action.payload.length > 0 || false
            const found = state.posts.filter(item => {
                return (
                    item.postText.toLowerCase().search(action.payload.toLowerCase()) !== -1 ||
                    item.postedBy.username.toLowerCase().search(action.payload.toLowerCase()) !== -1 
                )
            })
            return {
                posts: state.posts,
                isSearchActive: searchActive,
                foundPosts: found
            }
        default:
            return state
    }
}

export const PostContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PostReducer, {
        posts: null,
        isSearchActive: false,
        foundPosts: []
    })

    return (
        <PostContext.Provider value={{ ...state, dispatch }}>
            { children }
        </PostContext.Provider>
    )
}
