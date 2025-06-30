import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaQrcode, FaPaypal, FaMoneyBillWave } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';

const Order = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [paymentDetails, setPaymentDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    upiId: '',
    instructions: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Load order details from session storage
  useEffect(() => {
    const storedOrder = sessionStorage.getItem('orderItems');
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    } else {
      navigate('/cart'); // Redirect if no order exists
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    toast.loading('Processing your payment...');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Validate payment details based on method
      if (paymentMethod === 'credit') {
        if (!paymentDetails.number || !paymentDetails.name || !paymentDetails.expiry || !paymentDetails.cvv) {
          throw new Error('Please fill all card details');
        }
      } else if (paymentMethod === 'upi') {
        if (!paymentDetails.upiId) {
          throw new Error('Please enter UPI ID');
        }
      }

      setPaymentSuccess(true);
      sessionStorage.removeItem('orderItems');
      localStorage.removeItem('food');
      toast.dismiss();
      toast.success('Thank you for your order! 👏');

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Payment failed:', error);
      toast.dismiss();
      toast.error(error.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!orderDetails) {
    return <div className="p-4 text-center">Loading order details...</div>;
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
          <p className="text-gray-500">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Order Summary */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-4 space-y-4">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{(item.reviewCount * 10 * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">₹{orderDetails.subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Delivery Fee</p>
                <p className="text-sm font-medium text-gray-900">₹50.00</p>
              </div>
              <div className="flex justify-between pt-2">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-base font-bold text-gray-900">₹{orderDetails.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
            
            <form onSubmit={handlePaymentSubmit}>
              {/* Payment Method Selection */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                <button
                  type="button"
                  className={`py-2 px-2 border rounded-md text-sm font-medium ${
                    paymentMethod === 'credit' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setPaymentMethod('credit')}
                >
                  <FaCreditCard className="h-5 w-5 mx-auto mb-1" />
                  <span>Card</span>
                </button>
                
                <button
                  type="button"
                  className={`py-2 px-2 border rounded-md text-sm font-medium ${
                    paymentMethod === 'upi' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <FaQrcode className="h-5 w-5 mx-auto mb-1" />
                  <span>UPI</span>
                </button>
                
                <button
                  type="button"
                  className={`py-2 px-2 border rounded-md text-sm font-medium ${
                    paymentMethod === 'paypal' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <FaPaypal className="h-5 w-5 mx-auto mb-1" />
                  <span>PayPal</span>
                </button>
                
                <button
                  type="button"
                  className={`py-2 px-2 border rounded-md text-sm font-medium ${
                    paymentMethod === 'cod' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <FaMoneyBillWave className="h-5 w-5 mx-auto mb-1" />
                  <span>COD</span>
                </button>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'credit' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="card-number"
                      name="number"
                      value={paymentDetails.number}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="card-name"
                      name="name"
                      value={paymentDetails.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="card-expiry"
                        name="expiry"
                        value={paymentDetails.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="card-cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="card-cvv"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Payment Form */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700 mb-1">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="upi-id"
                      name="upiId"
                      value={paymentDetails.upiId}
                      onChange={handleInputChange}
                      placeholder="yourname@upi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-600 mb-4">OR</p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <FaQrcode className="h-24 w-24 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">Scan QR code to pay</p>
                    </div>
                  </div>
                </div>
              )}

              {/* PayPal Payment */}
              {paymentMethod === 'paypal' && (
                <div className="text-center py-8">
                  <p className="text-gray-600">You will be redirected to PayPal to complete your payment</p>
                </div>
              )}

              {/* Cash on Delivery */}
              {paymentMethod === 'cod' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaMoneyBillWave className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Pay when you receive your order</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>Please keep exact change ready for the delivery executive</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="cod-instructions" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      id="cod-instructions"
                      name="instructions"
                      value={paymentDetails.instructions}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Call before delivery, leave at security, etc."
                    />
                  </div>
                </div>
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <AiOutlineLoading className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Processing...
                    </>
                  ) : (
                    paymentMethod === 'cod' ? 'Place Order (Cash on Delivery)' : `Pay ₹${orderDetails.total.toFixed(2)}`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;