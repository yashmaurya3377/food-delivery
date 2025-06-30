import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

const Cart = () => {
    const [order, setOrder] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        const savedItems = JSON.parse(localStorage.getItem('food')) || [];
        return savedItems.map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));
    });

     const navigate=useNavigate()
    // Update quantity for specific item
    const updateQuantity = (itemId, change) => {
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.id === itemId
                    ? { 
                        ...item, 
                        quantity: Math.max(1, item.quantity + change) 
                      }
                    : item
            )
        );
    };

    // Remove item from cart
    const handleDelete = (itemId) => {
        setCartItems(prevItems => 
            prevItems.filter(item => item.id !== itemId)
        );
    };

    // Calculate subtotal for a single item
    const calculateItemSubtotal = (price, quantity) => {
        return price * quantity;
    };

    // Calculate total for all items
    const calculateCartTotal = () => {
        return cartItems.reduce((total, item) => 
            total + (item.reviewCount * 10 * item.quantity), 
        0);
    };

    // Handle order submission
    const handleOrder = () => {
        const orderData = {
            items: cartItems,
            subtotal: calculateCartTotal(),
            delivery: 50,
            total: calculateCartTotal() + 50,
            orderDate: new Date().toISOString()
        };
        
        console.log('Order data:', orderData);
        setOrder(orderData);
        sessionStorage.setItem('orderItems', JSON.stringify(orderData));
        navigate('/order')
    };

    useEffect(() => {
        localStorage.setItem('food', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className='min-h-screen bg-amber-50 mt-19'>
            <div className='max-w-4xl mx-auto'>
                <div className='bg-amber-300 md:mt-1 py-4 md:py-6 px-4 sm:px-6 rounded-xl shadow-lg'>
                    {cartItems.length === 0 ? (
                        <div className='text-center py-8 md:py-12'>
                            <p className='text-lg sm:text-xl text-amber-700'>Your cart is empty</p>
                            <Link 
                                to={'/'} 
                                className='mt-4 inline-block bg-amber-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-amber-700 transition'
                            >
                                Browse Menu
                            </Link>
                        </div>
                    ) : (
                        <div className='overflow-x-auto'>
                            {/* Desktop Table */}
                            <table className='w-full hidden md:table'>
                                <thead className='bg-amber-400'>
                                    <tr>
                                        <th className='text-left p-3'>Item</th>
                                        <th className='text-left p-3'>Image</th>
                                        <th className='text-left p-3'>Quantity</th>
                                        <th className='text-left p-3'>Price</th>
                                        <th className='text-left p-3'>Remove</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-amber-200'>
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className='hover:bg-amber-100'>
                                            <td className='p-3'>{item.name}</td>
                                            <td className='p-3'>
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className='h-14 w-14 object-cover rounded-lg' 
                                                    loading='lazy'
                                                />
                                            </td>
                                            <td className='p-3'>
                                                <div className='flex items-center space-x-2'>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className='w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition'
                                                        aria-label='Decrease quantity'
                                                    >
                                                        -
                                                    </button>
                                                    <span className='min-w-[20px] text-center'>{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className='w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition'
                                                        aria-label='Increase quantity'
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className='p-3'>
                                                ₹{calculateItemSubtotal(item.reviewCount * 10, item.quantity).toFixed(2)}
                                            </td>
                                            <td className='p-3'>
                                                <button 
                                                    onClick={() => handleDelete(item.id)}
                                                    className='bg-red-700 hover:bg-red-600 rounded-lg px-3 text-white py-1 transition'
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Mobile List */}
                            <div className='md:hidden space-y-4'>
                                {cartItems.map((item) => (
                                    <div key={item.id} className='bg-amber-200/50 p-4 rounded-lg'>
                                        <div className='flex justify-between'>
                                            <div className='flex-1'>
                                                <h3 className='font-medium'>{item.name}</h3>
                                                <p className='text-sm'>₹{(item.reviewCount * 10).toFixed(2)} each</p>
                                            </div>
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className='h-14 w-14 object-cover rounded-lg ml-2' 
                                                loading='lazy'
                                            />
                                        </div>
                                        <div className='flex items-center justify-between mt-3'>
                                            <div className='flex items-center space-x-3 bg-amber-100 px-3 py-1 rounded-full'>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className='w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition'
                                                    aria-label='Decrease quantity'
                                                >
                                                    -
                                                </button>
                                                <span className='min-w-[20px] text-center'>{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className='w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition'
                                                    aria-label='Increase quantity'
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className='font-medium'>
                                                ₹{calculateItemSubtotal(item.reviewCount * 10, item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => handleDelete(item.id)}
                                            className='mt-3 bg-red-700 hover:bg-red-600 rounded-lg px-3 text-white py-2 w-full transition'
                                        >
                                            Remove Item
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className='mt-6 md:mt-8 flex justify-end'>
                                <div className='bg-white p-4 sm:p-6 rounded-lg shadow-md w-full md:w-80'>
                                    <h3 className='text-lg font-bold text-amber-800 mb-4'>Order Summary</h3>
                                    <div className='flex justify-between mb-2'>
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span>₹{calculateCartTotal().toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between mb-4'>
                                        <span>Delivery Fee</span>
                                        <span>₹50.00</span>
                                    </div>
                                    <div className='border-t border-amber-200 pt-4 flex justify-between font-bold text-lg'>
                                        <span>Total</span>
                                        <span>₹{(calculateCartTotal() + 50).toFixed(2)}</span>
                                    </div>
                                    <button 
                                        onClick={handleOrder}
                                        className='w-full mt-6 bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition disabled:bg-amber-400'
                                        disabled={cartItems.length === 0}
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Cart;