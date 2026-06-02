import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Challenges from './pages/Challenge'
import Analytics from './pages/Analytics'
import LeaderBoard from './pages/LeaderBoard'
import Learning from './pages/Learning'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import ProblemDetail from './pages/ProblemDetail'
import PythonLearning from './pages/PythonLearning'
import Submissions from './pages/Submissions'
import Profile from './pages/Profile'
const Layout = () => {
  const location = useLocation()
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register"
  const showFooter = location.pathname === "/home"

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/challenge" element={<Challenges />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/learning/python" element={<PythonLearning />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  )
}
const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  )
}
export default App