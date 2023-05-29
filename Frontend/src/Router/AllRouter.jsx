import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from '../Pages/Login'
import Register from '../Pages/Register'

export default function AllRouter() {
  return (
   <Routes >
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
   </Routes>
  )
}
