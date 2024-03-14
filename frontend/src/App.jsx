import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home'
import Signup from './pages/Signup';
import Login from './pages/Login';
import {Toaster} from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";
import Profile from "./pages/Profile";

function App() {
  const {authUser} = useAuthContext()
  

  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route path="/profile/:id" element={authUser ? <Profile/> : <Navigate to={"/login"}/>} />
          <Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"}/>} />
          <Route path='/signup' element={authUser ? <Navigate to={"/"} /> : <Signup />} />
          <Route path='/login' element={authUser ? <Navigate to={"/"} /> : <Login/>} />
        </Routes>
        <Toaster/>
      </div>
    </>
  )
}

export default App
