import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    // Initialize cart items with quantity property
    const [cartItems, setCartItems] = useState(() => {
        const savedItems = JSON.parse(localStorage.getItem('food')) || [];
        return savedItems.map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));
    });

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

    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('food', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className='min-h-screen bg-amber-50 py-4 md:py-8 px-2 sm:px-4'>
            <div className='max-w-4xl mx-auto'>
                <div className='bg-amber-300 mt-4 md:mt-8 py-4 md:py-6 px-4 sm:px-6 rounded-xl shadow-lg'>
                    {/* ... (header remains the same) ... */}

                    {cartItems.length === 0 ? (
                        <div className='text-center py-8 md:py-12'>
                            <p className='text-lg sm:text-xl text-amber-700'>Your cart is empty</p>
                            <Link to={'/'} className='mt-4 bg-amber-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-amber-700 transition'>
                                Browse Menu
                            </Link>
                        </div>
                    ) : (
                        <div className='overflow-x-auto'>
                            {/* Desktop Table */}
                            <table className='w-full hidden md:table'>
                                <thead className='bg-amber-400'>
                                    <tr>
                                        <th>Item</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-amber-200'>
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>
                                                <img src={item.image} alt={item.name} className='h-14 w-14 object-cover rounded-lg' />
                                            </td>
                                            <td>
                                                <div className='flex items-center space-x-2'>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className='w-7 h-7 rounded-full bg-amber-500 text-white'
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className='w-7 h-7 rounded-full bg-amber-500 text-white'
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                ₹{calculateItemSubtotal(item.reviewCount * 10, item.quantity)}
                                            </td>
                                            <td>
                                                <button 
                                                    onClick={() => handleDelete(item.id)}
                                                    className='bg-red-700 hover:bg-red-400 rounded-2xl px-2 text-white py-1'
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
                                            <div>
                                                <h3>{item.name}</h3>
                                                <p>₹{item.reviewCount * 10} each</p>
                                            </div>
                                            <img src={item.image} alt={item.name} className='h-14 w-14 object-cover rounded-lg' />
                                        </div>
                                        <div className='flex items-center justify-between mt-3'>
                                            <div className='flex items-center space-x-3'>
                                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </div>
                                            <p>₹{calculateItemSubtotal(item.reviewCount * 10, item.quantity)}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleDelete(item.id)}
                                            className='mt-2 bg-red-700 hover:bg-red-400 rounded-2xl px-2 text-white py-1 w-full'
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className='mt-6 md:mt-8 flex justify-end'>
                                <div className='bg-white p-4 sm:p-6 rounded-lg shadow-md w-full md:w-80'>
                                    <h3 className='text-lg font-bold text-amber-800 mb-4'>Order Summary</h3>
                                    <div className='flex justify-between mb-2'>
                                        <span>Subtotal</span>
                                        <span>₹{calculateCartTotal()}</span>
                                    </div>
                                    <div className='flex justify-between mb-4'>
                                        <span>Delivery</span>
                                        <span>₹50</span>
                                    </div>
                                    <div className='border-t border-amber-200 pt-4 flex justify-between font-bold'>
                                        <span>Total</span>
                                        <span>₹{calculateCartTotal() + 50}</span>
                                    </div>
                                    <button className='w-full mt-6 bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition'>
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;