import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import AddBook from './components/AddBook'
import Layout from './components/Layout'
import Notfound from './components/Notfound'
import Explore from './components/Explore'
import Booklist from './components/Booklist'

const App = () => {
  return (
    <Router>  
      <Routes>  
      <Route path='/' element={<Layout/>}>
      <Route  index element={<Home/>}  />
      <Route path="/explore" element={<Explore/>}/>
      <Route path="/booklist" element={<Booklist/>}/>
        <Route path='/addbook'>
          <Route index element={<AddBook />} />
        </Route>
        </Route>
        <Route path='*' element={<Notfound/>}/>
      </Routes>
    </Router>
  )
}

export default App
