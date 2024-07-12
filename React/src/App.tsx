import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Rform from './components/Register'
import GetDetails from './components/Getdetails'
import UploadExcel from './components/UploadExcel'
import { Loading } from './components/loading'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Loading/>
      <BrowserRouter>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/getdetails" element={<GetDetails />}/>
        <Route path="/register" element={<Rform/>}/>
        <Route path="/fileupload" element={<UploadExcel/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
