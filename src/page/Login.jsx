import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import image from '../assets/image.jpg';
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const retData = JSON.parse(localStorage.getItem('user')) || [];
  const [formData, setFormData] = useState(retData);
  const [user, setUser] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => { setUser({ ...user, [e.target.name]: e.target.value }); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email == formData.email || user.password == formData.password) {
      toast.success('Login successful');
      localStorage.setItem('loginUser',JSON.stringify(retData))
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        navigate('/');
      }, 300);
    } 
    else {
      toast.error('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-amber-50 to-amber-300">
      <div className="relative lg:w-1/2 h-20   lg:h-auto">
        <img src={image} alt="Decorative background" className="w-full h-full object-cover hidden   lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-amber-900/30 to-transparent flex items-end lg:items-center ps-7 ">
          <div className="sm:text-white ">
            <h1 className="text-3xl lg:text-4xl font-bold lg:mb-2 mb-0">Welcome Back</h1>
            <p className="sm:text-amber-100 ">Login to access your personalized dashboard and continue your order.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-2 lg:p-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-3">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-amber-900 mb-1">Log In</h2>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FiMail className="text-gray-400" /></div>
                <input id="email" name="email" type="email" onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="you@example.com" required />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FiLock className="text-gray-400" /></div>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} onChange={handleChange} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="••••••••" required minLength="6" />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="h-4 w-4 text-amber-600 rounded focus:ring-amber-500" />
                Remember me
              </label>
              <Link to="/signup" className="text-sm text-amber-700 hover:text-amber-800 hover:underline">Forgot password?</Link>
            </div>

            <button type="submit" className="bg-green-500 w-full p-2 rounded-2xl">Login</button>

            <div className="relative flex items-center py-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="grid grid-cols-2 gap-1">
              <button type="button" className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <FcGoogle /> Google
              </button>
              <button type="button" className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <FaFacebookSquare /> Facebook
              </button>
            </div>

            <p className="text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-amber-700 font-medium hover:underline hover:text-amber-800">Create one</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;