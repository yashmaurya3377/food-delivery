import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiBoxList } from "react-icons/ci";
import { RiFileList3Line } from "react-icons/ri";

const Navbar1 = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem('loginUser')) || {};
  const [formData, setFormData] = useState(userData);
  const [searchitem, setsearchitem] = useState('');

  const handlesearch = (e) => {
    let text = e.target.value
    props.fun(text)
    setsearchitem(text)
  }
  // Get the first character of the name if no image exists
  const startChar = formData.name ? formData.name.slice(0, 1) : '';

  return (
    <div className='left-0 right-0 top-0 z-55 fixed'>
      <div className='bg-black/80 text-white flex justify-between items-center p-5'>
        <div>
          <span className='text-3xl font-bold font-serif'>Food hub</span>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:block'>
          
          <ul className='flex gap-10 items-center'>
          <input type="text" name="search" id="" placeholder='search' className=' border my-1' onChange={handlesearch} />
            <li>
              <Link to={'/'} className='hover:text-gray-300'>Home</Link>
            </li>
            <li className='hover:text-gray-300 cursor-pointer mt-1'>
              <Link to={'/cart'} className='hover:text-gray-300'><RiFileList3Line size={20} /></Link>
            </li>
            {!formData.name ? (
              <div className='flex gap-3'>
                <li>
                  <Link to={'/signup'} className='hover:text-gray-300 cursor-pointer'>SignUp</Link>
                </li>
                <li>
                  <Link to={'/loginn'} className='hover:text-gray-300 cursor-pointer'>Login</Link>
                </li>
              </div>
            ) : (
              formData.profileImage ? (
                <Link to={'/signup'}> <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover  border-2"
                /></Link>
              ) : (
                <Link to={'signup'}><div className='bg-amber-300 text-black px-3 py-1 rounded-full w-8 h-8 flex items-center justify-center'>
                  {startChar}
                </div></Link>
              )
            )}
          </ul>
        </div>

        {/* Mobile menu button */}
        <div className='md:hidden'>
          <input type="text" name="search" id="" placeholder='search' className=' border my-1' onChange={handlesearch} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-white focus:outline-none'
          >
            {isOpen ? 'X' : <CiBoxList />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className='md:hidden bg-black/85 pb-4 px-1'>
          <ul className='flex flex-col gap-5 text-amber-300  ms-10'>
            <li>
              <Link to={'/'} className='hover:text-gray-300 block' onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li className='hover:text-gray-300 cursor-pointer' onClick={() => setIsOpen(false)}>
              <Link to={'/cart'} className='hover:text-gray-300'><RiFileList3Line /></Link>
            </li>
            {!formData.name ? (
              <div>
                <li>
                  <Link to={'/signup'} className='hover:text-gray-300 block' onClick={() => setIsOpen(false)}>SignUp</Link>
                </li>
                <li>
                  <Link to={'/loginn'} className='hover:text-gray-300 block' onClick={() => setIsOpen(false)}>Login</Link>
                </li>
              </div>
            ) : (
              formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-amber-50"
                  onClick={() => setIsOpen(false)}
                />
              ) : (
                <div
                  className='bg-amber-300 text-black px-3 py-1 rounded-full w-8 h-8 flex items-center justify-center'
                  onClick={() => setIsOpen(false)}
                >
                  {startChar}
                </div>
              )
            )}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Navbar1;