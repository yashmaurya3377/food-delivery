import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = ({ setSelectedFood }) => {
  const [items, setItems] = useState(false);
  const [food, setFood] = useState([]);
  const [filterfood, setfilterFood] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const navigate = useNavigate();


  const apiFetch = async () => {
    const apiData = await fetch('https://dummyjson.com/recipes')
    const obj = await apiData.json();
    const data = obj.recipes;
    setFood(data);
    setfilterFood(data);
  };

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

    // Check if item already exists in cart
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

    // Add new item to cart
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
  const handlefilter = (e, i) => {
    const filterTag = e.toLowerCase();

    const filteredItems = filterfood.filter((foodItem) =>
      foodItem.tags.some(tag => tag.toLowerCase() === filterTag)
    );
    setFood(filteredItems)
    setActiveTag(i)
    console.log("Filtered items:", filteredItems);

  };

  return (
    <div className="bg-[url('/poster.jpg')] bg-center bg-cover bg-no-repeat w-full h-96 ">
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
          <h2 className="text-lg font-semibold text-emerald-800 mb-3">Filter by Tags</h2>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            {[...new Set(filterfood.flatMap(item => item.tags))].map((tag, i) => (
              <button
                onClick={() => handlefilter(tag, i)}
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


      {(
        <div className='bg-black/30 min-h-screen py-8'>
          <h1 className='bg-blue-300 text-center text-2xl font-bold italic py-4 sticky top-0 z-10 shadow-md'>
            Food Items ({food.length})
          </h1>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 mt-8'>
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
                      <span className='text-yellow-500'>★</span>
                      <span className='text-gray-600 ml-1'>{item.rating}</span>
                    </div>
                  </div>

                  <div className='flex justify-between mt-4 space-x-2'>
                    <button
                      onClick={() => handleOrder(item)}
                      className='flex-1 bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300'
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
        </div>
      )}
    </div>
  );
};

export default HomePage;