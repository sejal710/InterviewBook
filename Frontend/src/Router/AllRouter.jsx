import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Profile from '../Pages/Profile'
import Home from '../Pages/Home'
import Add from '../Pages/Add'
import QAnswer from '../Pages/QAnswer'
import Friend from '../Pages/Friend'
import Edit from '../Pages/Edit'

export default function AllRouter() {
  return (
   <Routes >
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/home' element={<Home />} />
    <Route path='/add' element={<Add />} />
    <Route path='/ans' element={<QAnswer />} />
    <Route path='/friend' element={<Friend />} />
    <Route path='/edit' element={<Edit />} />
   </Routes>
  )
}
