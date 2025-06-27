import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosHeart } from "react-icons/io";
import toast from 'react-hot-toast';

const View = ({ foodItem }) => {
    const [Comment, setcomment] = useState([]);
    const [viewreview, setviewreview] = useState(true);

    const navigate = useNavigate()
    useEffect(() => {
        const review = async () => {
            const data = await fetch('https://dummyjson.com/comments')
            const com = await data.json()
            const comms = com.comments
            setcomment(comms)

        }
        review()
    }, [])
    const handleOrder = () => {
        toast.success('order after add to list')
      
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        navigate('/')
    }


    return (
        <div className='min-h-screen bg-gray-100  px-4 sm:px-8 '>
            {foodItem ? (
                <div className=' mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
                    <div className='md:flex'>
                        <div className='md:w-1/2'>
                            <img
                                src={foodItem.image}
                                alt={foodItem.name}
                                className='w-full h-fit object-cover'
                            />
                        </div>
                        <div className='p-8 md:w-1/2'>
                            <h1 className='text-3xl font-bold text-gray-800 mb-4'>{foodItem.name}</h1>
                            <span className='text-gray-600'>ready in ⏱️ {foodItem.prepTimeMinutes} min</span>
                            <div className='flex items-center mb-4'>
                                <span className='text-yellow-500 text-xl'>★</span>
                                <span className='text-gray-600 ml-1 text-xl'>{foodItem.rating} ({foodItem.reviewCount} reviews)</span>
                            </div>
                            <div className='mb-6'>
                                <h2 className='text-xl font-semibold text-gray-700 mb-2'>Ingredients:</h2>
                                <ul className='list-disc list-inside'>
                                    {foodItem.ingredients.map((ingredient, i) => (
                                        <li key={i} className='text-gray-600'>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className='mb-6'>
                                <h2 className='text-xl font-semibold text-gray-700 mb-2'>Instructions:</h2>
                                <ol className='list-decimal list-inside'>
                                    {foodItem.instructions.map((step, i) => (
                                        <li key={i} className='text-gray-600 mb-1'>{step}</li>
                                    ))}
                                </ol>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-2xl font-bold text-yellow-600'>₹{foodItem.reviewCount * 10}</span>
                                <button onClick={handleOrder} className='bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300'>
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* review section */}
                    <h1 className='text-center text-2xl font-bold italic underline bg-blue-300'>customer review</h1>
                    {viewreview &&
                        <div className='space-y-2'>
                            {Comment.map((ele) => (
                                <div key={ele.id} className=' border shadow-2xl shadow-black mt-5 p-2 rounded'>
                                    <div>
                                        <p className='font-medium'>User: <span className='text-gray-600'>{ele.user.username}</span></p>
                                        <p className='text-sm'>{ele.body}</p>
                                    </div>
                                    <span className='flex'>{ele.likes}<IoIosHeart /></span>
                                </div>
                            ))}
                        </div>
                    }

                </div>
            ) : (
                <div className='text-center text-xl text-gray-600 flex flex-col  '>
                    No food item selected. Please go back to the menu and select an item.
                    <Link to={"/"} className=' bg-red-600'>go to home page</Link>
                </div>
            )}
        </div>
    )
}

export default View