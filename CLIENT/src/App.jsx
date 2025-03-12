import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import AddBook from './components/AddBook'

const App = () => {
  return (
    <Router>  
      <Routes>  
        <Route path='/' element={<Home />} />
        <Route path='/dashboard'>
          <Route index element={<Dashboard />} />
          <Route path='addbook' element={<AddBook />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
