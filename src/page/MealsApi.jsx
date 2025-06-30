import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStarHalfAlt, } from "react-icons/fa"
import { MdOutlineStarPurple500 } from "react-icons/md";
import toast from 'react-hot-toast';

const Meals = (props) => {
  const [search, setsearch] = useState([]);
  const apiFetch = async () => {
    const fetchdata = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${props.search}`);
    const data = await fetchdata.json();

        const mealsWithRating = (data.meals || []).map(meal => ({
          ...meal,
          rating: (Math.random() * 2 + 3).toFixed(1) 
        }));
    setsearch(mealsWithRating || []);
  };
  console.log(props.filteredFood);
  
  useEffect(() => {
    apiFetch();
  }, [props.search]);

  const handleOrder = () => {
    toast.error(
 "Thank you for your interest! Unfortunately, we don't deliver to your location yet, but we truly appreciate you thinking of us."
   , {
    duration: 6000,
  }
);
     navigate("/");
  };

  const handleViewDetails = () => {
     window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

  };

  return (
    <div>
      {search.length > 0 && (  // Changed to proper length check
        <div className='bg-black/30 py-8'>
          <h1 className='bg-blue-300 text-center text-2xl font-bold italic py-4 sticky top-0 z-10 shadow-md'>
            Meals ({search.length})
          </h1>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-6 px-4 sm:px-8 mt-8'>
            {search.map((ele, i) => (
              <div key={i} className='bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
                <div className='h-48 overflow-hidden'>
                  <img
                    src={ele.strMealThumb}
                    alt={ele.strMeal}
                    className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                  />
                </div>

                <div className='p-4'>
                  <h1 className='text-xl font-bold text-gray-800 truncate'>{ele.strMeal}</h1>
                  <p className='text-gray-600 text-sm mt-1'>{ele.strArea}</p>

                  <div className='flex justify-between items-center mt-2'>
                    <span className='text-lg font-semibold text-yellow-600'>
                      ₹{(ele.idMeal / 300).toFixed(2)}
                    </span>
                    <div className='flex items-center'>
                      {[...Array(Math.floor(ele.rating))].map((_, i) => (
                        <span key={i} className='text-yellow-500'><MdOutlineStarPurple500 /></span>
                      ))}
                      {ele.rating % 1 >= 0. && (
                        <span className='text-yellow-500'><FaStarHalfAlt /></span>
                      )}
                      <span className='text-yellow-500 ml-1 text-sm'>({ele.rating})</span>
                    </div>
                  </div>

                  <div className='flex justify-between mt-4 sm:mt-1 gap-1'>
                    <button
                      onClick={() => handleOrder(ele)}
                      className='flex-1 bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-2 px-4 sm:px-0 rounded-lg transition-colors duration-300 text-sm'
                    >
                      Order Now
                    </button>
                    <Link
                      to={'/view1'}
                      state={{ ele }}
                      onClick={() => handleViewDetails(ele)}
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

export default Meals;