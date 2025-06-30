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
import Order from './page/Order'
import View1 from './page/View1'

function App() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [searchText, setSearchText] = useState('');
  const searchfun = (text) => {
    setSearchText(text);
    // console.log("Search text:", text);
  }
  return (
    <>
      <BrowserRouter>
        <Nabar1 fun={searchfun}  />
        <Routes>
          <Route path='/' element={<HomePage setSelectedFood={setSelectedFood} search={searchText}   />} />
          <Route path='/view' element={<View foodItem={selectedFood} />} />
          <Route path='/view1' element={<View1 />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
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