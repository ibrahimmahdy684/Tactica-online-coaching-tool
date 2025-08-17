import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import './App.css'
import './index.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Home from './Home/Home';
import Login from './components/forms/Login'
import Register from './components/forms/Register'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './context/protectedroutes';
import PlayersList from './components/Players/Players';
import MyPlayers from './components/Players/MyPlayers';
import PlayerForm from './components/Players/PlayerForm';
import TacticsBoard from './components/TacticsBoard';
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
            <Route path='/players' element={<PlayersList/>}/>
            <Route path='/my-players' element={
              <ProtectedRoute>
              <MyPlayers/>
              </ProtectedRoute>
              }/>
            <Route path='/dashboard' element={
              <ProtectedRoute>
              <Dashboard/>
              </ProtectedRoute>
              }/>
              <Route path='/player-form' element={
              <ProtectedRoute>
              <PlayerForm/>
              </ProtectedRoute>
              }/>
              <Route path='/tactics-board' element={
                <ProtectedRoute>
                  <TacticsBoard/>
                </ProtectedRoute>
              }/>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
