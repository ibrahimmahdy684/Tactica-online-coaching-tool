import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import './App.css'
import './index.css'
import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Home from './Home/Home';
import Login from './components/forms/Login'
import Register from './components/forms/Register'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './context/protectedroutes';
function App() {

  return (
    <>
      <ToastContainer position='top-center' autoClose={3000}/>
      <div className='app-container'>
        <Navbar/>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>

            <Route path='/dashboard' element={
              <ProtectedRoute>
              <Dashboard/>
              </ProtectedRoute>
              }/>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
