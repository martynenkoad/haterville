import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import ClickHate from "./components/ClickHate"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { useUserContext } from "./hooks/useUserContext"
import PasswordRecovery from "./pages/PasswordRecovery"
import Settings from "./pages/Settings"
import PostPage from "./pages/PostPage" 
import AnyUserProfile from "./pages/AnyUserProfile"
import SubPosts from "./components/SubPosts"
import ForgotPassword from "./pages/ForgotPassword"
import Support from "./pages/Support"
import EditProfile from "./components/EditProfile"
import FollowersList from "./pages/FollowersList"
import FollowingList from "./pages/FollowingList"
import { useModeContext } from "./hooks/useModeContext"
import ClickHateRating from "./components/ClickHateRating"
import ImageShop from "./pages/ImageShop"

function App() {
  // Context
  const { user } = useUserContext()
  const { coldMode } = useModeContext()
  const mode = coldMode ? "cold" : "hot"

  return(
    <div className={`app-${mode}`}>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}/>
            <Route path="/clickhate" element={user ? <ClickHate /> : <Navigate to="/login"/>} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}  />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/login"/>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/passwordrecovery/:token" element={<PasswordRecovery />} />
            <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
            <Route path="/diary/:userid" element={user ? <AnyUserProfile /> : <Navigate to="/login" />} />
            <Route path="/post/:postid" element={user ? <PostPage /> : <Navigate to="/login" /> } />
            <Route path="/haters" element={user ? <SubPosts /> : < Navigate to="/login"/>} />
            <Route path="/support" element={<Support />}/>
            <Route path="/editprofile" element={user ? <EditProfile /> : <Navigate to="/login" />} />
            <Route path="/followers/:userid" element={user ? <FollowersList /> : <Navigate to="/login"/>} />
            <Route path="following/:userid" element={user ? <FollowingList /> : <Navigate to="/login" />} />
            <Route path="/click-hate-rating" element={user ? <ClickHateRating /> : <Navigate to="/login" />} />
            <Route path="/click-hate-shop" element={user ? <ImageShop /> : <Navigate to="/login" />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
