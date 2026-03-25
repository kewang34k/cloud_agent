import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Minus, Plus, X } from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-3xl mb-6">您的购物车是空的</h1>
        <p className="text-gray-500 mb-8">继续探索最新系列，寻找您的专属风格。</p>
        <Link 
          to="/products" 
          className="bg-primary text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          去购物
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="font-serif text-3xl mb-10">购物车</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="border-t border-gray-200">
            {cart.map(item => (
              <div key={item.id} className="py-6 border-b border-gray-200 flex gap-6">
                <Link to={`/product/${item.product.id}`} className="w-24 sm:w-32 flex-shrink-0 aspect-[3/4] bg-gray-100">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium mb-1">
                        <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">尺码: {item.size}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-black transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-gray-300">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-sm font-medium">¥ {item.product.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 p-6">
            <h2 className="text-lg font-medium mb-6">订单摘要</h2>
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">商品总计</span>
                <span>¥ {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">运费</span>
                <span>{subtotal >= 500 ? '免运费' : '¥ 15'}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-medium">总计</span>
                <span className="text-xl font-medium">¥ {subtotal >= 500 ? subtotal : subtotal + 15}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary text-white py-4 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              去结算
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
