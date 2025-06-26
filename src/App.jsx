import { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import Nabar1 from './Components/Nabar1'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './page/HomePage'
import View from './page/View';
import Cart from './page/Cart'
import Login from './page/Login'
import Registration from './page/Registration'

function App() {
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Nabar1 />
        <Routes>
          <Route path='/' element={<HomePage setSelectedFood={setSelectedFood} />} />
          <Route path='/view' element={<View foodItem={selectedFood} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/loginn' element={<Login />} />
          <Route path='/signup' element={<Registration />} />
     
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App