import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {auth, db} from "./firebase";
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Chat from './components/Chat'
function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  })
  return (
    <>
    <Router> 
      <Routes>
      <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
