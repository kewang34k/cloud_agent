import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, user } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    province: '',
    city: '',
    detail: '',
  });

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal >= 500 ? subtotal : subtotal + 15;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('请先登录');
      navigate('/login?redirect=/checkout');
      return;
    }
    // Save address to state or pass to payment page
    navigate('/payment', { state: { address: formData, total } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl mb-10 text-center">结算</h1>
      
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-2/3">
          <h2 className="text-xl mb-6 font-serif">收货地址</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">姓名</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 p-3 text-sm focus:border-black focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">电话</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 p-3 text-sm focus:border-black focus:outline-none transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">省份</label>
                <input required type="text" name="province" value={formData.province} onChange={handleChange} className="w-full border border-gray-300 p-3 text-sm focus:border-black focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">城市</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 p-3 text-sm focus:border-black focus:outline-none transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">详细地址</label>
              <input required type="text" name="detail" value={formData.detail} onChange={handleChange} className="w-full border border-gray-300 p-3 text-sm focus:border-black focus:outline-none transition-colors" />
            </div>
            
            <button type="submit" className="w-full bg-primary text-white py-4 mt-8 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors">
              继续支付
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-gray-50 p-6">
            <h2 className="text-lg font-medium mb-6">订单明细</h2>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 aspect-[3/4] bg-gray-200 flex-shrink-0">
                    <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium truncate">{item.product.name}</p>
                    <p className="text-gray-500 text-xs mt-1">尺寸: {item.size} | 数量: {item.quantity}</p>
                    <p className="mt-1">¥ {item.product.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">商品总计</span>
                <span>¥ {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">运费</span>
                <span>{subtotal >= 500 ? '免运费' : '¥ 15'}</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2">
                <span>总计</span>
                <span>¥ {total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
