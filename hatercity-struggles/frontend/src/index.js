import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserContextProvider } from './context/UserContext'
import { PostContextProvider } from "./context/PostContext"
import "./styles/styles.css"
import { ModeContextProvider } from './context/ModeContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(  
    <React.StrictMode>
        <UserContextProvider>
            <ModeContextProvider>
              <PostContextProvider>
                  <App />
              </PostContextProvider>
            </ModeContextProvider>
        </UserContextProvider>
    </React.StrictMode>
)
