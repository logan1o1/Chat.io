import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Signup from './pages/Signup';
import Login from './pages/Login';
import {Toaster} from 'react-hot-toast';

function App() {
  

  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
        <Toaster/>
      </div>
    </>
  )
}

export default App
