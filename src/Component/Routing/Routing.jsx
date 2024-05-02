

import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Reg from '../Products/Reg'
import Header from '../Layouts/Header'
import Sign from '../Auth/Sign'
import Login from '../Auth/Login'
import Profile from '../Auth/Profile'

export default function Routing() {
  return (
    <>
    <Router>
        <Header />
        <Routes>
            <Route path='' element={<Reg />} />
            <Route path='sign' element={<Sign />} />
            <Route path='login' element={<Login />} />
            <Route path='pro' element={<Profile />} />
        </Routes>
    </Router>
    </>
  )
}
