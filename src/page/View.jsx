import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosHeart } from 'react-icons/io';
import toast from 'react-hot-toast';

const View = ({ foodItem }) => {
    const { state } = useLocation();
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [viewReviews, setViewReviews] = useState(true);
    const navigate = useNavigate();

    const item = foodItem || state?.ele;
    
    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoadingComments(true);
                const response = await fetch('https://dummyjson.com/comments');
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const data = await response.json();
                setComments(data.comments || []);
            } catch (error) {
                console.error("Error fetching comments:", error);
                toast.error('Failed to load comments');
                setComments([]);
            } finally {
                setLoadingComments(false);
            }
        };
        fetchComments();
    }, []);

    const handleOrder = () => {
        toast.success('Added to your order list!');
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        navigate('/');
    };

    if (!item) {
        return (
            <div className="min-h-screen bg-gray-100 px-4 mt-16 flex items-center justify-center">
                <div className="max-w-md bg-white rounded-xl shadow-md p-8 text-center">
                    <h2 className="text-xl text-gray-600 mb-4">No food item selected.</h2>
                    <Link 
                        to="/" 
                        className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                        Go to Home Page
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-3 mt-16">
            <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img
                            src={item.image || item.strMealThumb}
                            alt={item.name || item.strMeal}
                            className="w-full h-fit object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/400x300?text=Food+Image';
                            }}
                        />
                    </div>
                    <div className="p-8 md:w-1/2 space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">
                            {item.name || item.strMeal}
                        </h1>
                        <p className="text-gray-600">
                            ready in ⏱️ {item.prepTimeMinutes || '30'} min
                        </p>
                        
                        <div className="flex items-center mb-4">
                            <span className="text-yellow-500 text-xl">★</span>
                            <span className="text-gray-600 ml-1 text-xl">
                                {item.rating || '4.5'} ({item.reviewCount || '24'} reviews)
                            </span>
                        </div>

                        <div className="mb-5">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2 sticky">
                                Ingredients:
                            </h2>
                            <ul className="list-disc list-inside h-50 overflow-y-auto">
                                {item.ingredients ? (
                                    item.ingredients.map((ingredient, i) => (
                                        <li key={i} className="text-gray-600">{ingredient}</li>
                                    ))
                                ) : (
                                    Array.from({ length: 20 }, (_, i) => {
                                        const num = i + 1;
                                        const ingredient = item[`strIngredient${num}`];
                                        const measure = item[`strMeasure${num}`];
                                        return ingredient?.trim() ? (
                                            <li key={num} className="text-gray-600">
                                                {ingredient}
                                                {measure?.trim() && ` (${measure.trim()})`}
                                            </li>
                                        ) : null;
                                    }).filter(Boolean)
                                )}
                            </ul>
                        </div>

                        <div className="mb-5">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2 sticky">
                                Instructions:
                            </h2>
                            <div className="h-50 overflow-y-auto">
                                <ol className="list-decimal list-inside">
                                    {item.instructions ? (
                                        item.instructions.map((step, i) => (
                                            <li key={i} className="text-gray-600 mb-1">{step}</li>
                                        ))
                                    ) : (
                                        item.strInstructions
                                            ?.split("\n")
                                            ?.filter(step => step.trim())
                                            ?.map((step, i) => (
                                                <li key={i} className="text-gray-600 mb-1">{step}</li>
                                            )) || <li className="text-gray-600">No instructions available</li>
                                    )}
                                </ol>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-yellow-600">
                                ₹{item.reviewCount * 10 || (item.idMeal ? (item.idMeal / 300).toFixed(2) : '99.99')}
                            </span>
                            <button
                                onClick={handleOrder}
                                className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                            >
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Review Section */}
                <div className="border-t border-gray-200">
                    <h1 className="text-center text-2xl font-bold italic underline bg-blue-300 py-2">
                        Customer Reviews
                    </h1>
                    {loadingComments ? (
                        <div className="p-8 text-center">Loading comments...</div>
                    ) : viewReviews && comments.length > 0 ? (
                        <div className="space-y-2 p-8 h-80 overflow-y-auto">
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="border shadow-2xl shadow-gray-700 mt-5 p-4 rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium">
                                            User: <span className="text-gray-600">{comment.user?.username || 'Anonymous'}</span>
                                        </p>
                                        <p className="text-sm mt-1">{comment.body}</p>
                                    </div>
                                    <div className="flex items-center mt-2 text-red-500">
                                        <span className="mr-1">{comment.likes || 0}</span>
                                        <IoIosHeart />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">No reviews available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default View;