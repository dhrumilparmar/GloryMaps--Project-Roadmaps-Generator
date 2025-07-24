import React from 'react'
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MapResult from './Pages/MapResult'

const App = () => {
  return (
    <div className="absolute inset-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map-result" element={<MapResult />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
