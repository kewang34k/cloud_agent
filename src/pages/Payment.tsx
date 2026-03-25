import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { CheckCircle2 } from 'lucide-react';

export const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart, cart } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const state = location.state as { total: number } | null;

  if (!state || cart.length === 0) {
    if (!isSuccess) {
      navigate('/cart');
      return null;
    }
  }

  const handlePayment = () => {
    setIsProcessing(true);
    // Mock API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      
      // Save order to localStorage for Orders page (Mock backend)
      const existingOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
      const newOrder = {
        id: `ORD${Date.now()}`,
        date: new Date().toLocaleDateString(),
        totalAmount: state?.total,
        status: 'paid',
        items: cart,
      };
      localStorage.setItem('mockOrders', JSON.stringify([newOrder, ...existingOrders]));

    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
        <h1 className="font-serif text-3xl mb-4">支付成功</h1>
        <p className="text-gray-500 mb-8">感谢您的购买，我们将尽快为您发货。</p>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/orders')}
            className="border border-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
          >
            查看订单
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 max-w-md mx-auto text-center">
      <h1 className="font-serif text-3xl mb-8">收银台</h1>
      <div className="bg-gray-50 p-8 mb-8">
        <p className="text-gray-500 text-sm mb-2">需支付金额</p>
        <p className="text-4xl font-serif">¥ {state?.total}</p>
      </div>
      
      <button 
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full bg-primary text-white py-4 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:bg-gray-400"
      >
        {isProcessing ? '处理中...' : '确认支付 (Mock)'}
      </button>
    </div>
  );
};
