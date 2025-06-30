import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Meals from './MealsApi';
import { FaStarHalfAlt, } from "react-icons/fa"
import { MdOutlineStarPurple500 } from "react-icons/md";

const HomePage = ({ setSelectedFood, search }) => {
  const [items, setItems] = useState(false);
  const [food, setFood] = useState([]);
  const [filterfood, setFilterFood] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [filterToMeals, setFilterToMeals] = useState('');
  const navigate = useNavigate();

  const apiFetch = async () => {
    try {
      const apiData = await fetch('https://dummyjson.com/recipes');
      const obj = await apiData.json();
      const data = obj.recipes;
      setFood(data);
      setFilterFood(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast.error('Failed to load recipes');
    }
  };

  // Filter food based on search term
  useEffect(() => {
    if (search && search.trim() !== '') {
      const filtered = filterfood.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.cuisine.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
      setFood(filtered);
    } else {
      setFood(filterfood);
    }
  }, [search, filterfood]);

  useEffect(() => {
    apiFetch();
    const savedItems = JSON.parse(localStorage.getItem('food')) || [];
    setCartItem(savedItems);
  }, []);

  const handleViewDetails = (foodItem) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setSelectedFood(foodItem);
  };

  const handleOrder = (foodItem) => {
    const existingItems = JSON.parse(localStorage.getItem('food')) || [];
    const itemExists = existingItems.some(item => item.id === foodItem.id);

    if (itemExists) {
      toast('Item is already in your cart', {
        style: {
          border: '1px solid #713200',
          color: 'yellow',
        }
      });
      navigate('/cart');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    const updatedItems = [...existingItems, foodItem];
    setCartItem(updatedItems);
    localStorage.setItem('food', JSON.stringify(updatedItems));

    toast('Item added to cart!', {
      style: {
        border: '1px solid #713200',
        color: 'green',
      },
      icon: '🛒',
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setTimeout(() => {
      navigate('/cart');
    }, 1000);
  };

  const handleFilter = (e, i) => {
    const filterTag = e.toLowerCase();
    setFilterToMeals(filterTag);
    const filteredItems = filterfood.filter((foodItem) =>
      foodItem.tags.some(tag => tag.toLowerCase() === filterTag)
    );
    setFood(filteredItems);
    setActiveTag(i);
  };

  const resetFilters = () => {
    setFood(filterfood);
    setActiveTag(null);
    setFilterToMeals('');
  };

  return (
    <div className="bg-[url('/poster.jpg')] bg-center bg-cover bg-no-repeat w-full h-96 mt-19">
      <div className="bg-black/50 h-full w-full flex flex-col justify-center items-center px-4 py-16 text-white">
        <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center animate-fadeIn">
          FAST & TASTY DELIVERY
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
          Get your favorite meals delivered in under 30 minutes or it's free!
        </p>

        <div className="flex flex-col md:flex-row gap-2 mb-5">
          <Link
            to={'/cart'}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
          >
            Order Now ({cartItem.length})
          </Link>
          <button
            onClick={() => setItems(!items)}
            className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
          >
            {items ? 'Hide Menu' : 'View Menu'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-5xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">30<span className="text-white">min</span></div>
            <p className="text-sm">Delivery Time</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">100<span className="text-white">+</span></div>
            <p className="text-sm">Menu Items</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">4.9<span className="text-white">★</span></div>
            <p className="text-sm">Customer Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">24<span className="text-white">/7</span></div>
            <p className="text-sm">Service Hours</p>
          </div>
        </div>
      </div>

      {items && (
        <div className="bg-emerald-50 p-4 rounded-lg shadow-sm border border-emerald-100 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-emerald-800">Filter by Tags</h2>
            {activeTag !== null && (
              <button
                onClick={resetFilters}
                className="text-sm text-emerald-600 hover:text-emerald-800"
              >
                Clear Filters
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            {[...new Set(filterfood.flatMap(item => item.tags))].map((tag, i) => (
              <button
                onClick={() => handleFilter(tag, i)}
                key={i}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
                  ${activeTag === i
                    ? 'bg-emerald-600 text-black shadow-md'
                    : 'bg-black/20 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'}`}
                aria-label={`Filter by ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className='bg-black/30 min-h-screen py-8'>
        <h1 className='bg-blue-300 text-center text-2xl font-bold italic py-4 sticky top-0 z-10 shadow-md'>
          Food Items ({food.length}) {search && `- Search: "${search}"`}
        </h1>

        {food.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white">No items found</h2>
            <p className="text-white mt-2">Try a different search term or filter</p>

          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-6 px-4 sm:px-8 mt-8'>
            {food.map((item) => (
              <div
                key={item.id}
                className='bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'
              >
                <div className='h-48 overflow-hidden'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                  />
                </div>

                <div className='p-4'>
                  <h1 className='text-xl font-bold text-gray-800 truncate'>{item.name}</h1>
                  <p className='text-gray-600 text-sm mt-1'>{item.cuisine}</p>

                  <div className='flex justify-between items-center mt-2'>
                    <span className='text-lg font-semibold text-yellow-600'>
                      ₹{(item.reviewCount * 10).toFixed(2)}
                    </span>
                    <div className='flex items-center'>
                      {[...Array(Math.floor(item.rating))].map((_, i) => (
                        <span key={i} className='text-yellow-500'><MdOutlineStarPurple500 /></span>
                      ))}
                      {item.rating % 1 >= 0.3 && (
                        <span className='text-yellow-500'><FaStarHalfAlt /></span>
                      )}
                      <span className='text-yellow-500 ml-1 text-sm'>({item.rating})</span>
                    </div>
                  </div>

                  <div className='flex justify-between mt-4 sm:mt-1 gap-1'>
                    <button
                      onClick={() => handleOrder(item)}
                      className='flex-1 bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-2 px-4 sm:px-0 rounded-lg transition-colors duration-300 text-sm'
                    >
                      Order Now
                    </button>
                    <Link
                      to={'/view'}
                      onClick={() => handleViewDetails(item)}
                      className='flex-1 bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-center'
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Meals search={search} filteredFood={filterToMeals} />
      </div>
    </div>
  );
};

export default HomePage;