import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Posts from './pages/Posts'
import CreatePosts from './pages/CreatePosts'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/create-post" element={<CreatePosts />} />
      </Routes>
    </Router>
  )
}

export default App