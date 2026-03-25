import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

export const Orders = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/orders');
      return;
    }
    const mockOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
    setOrders(mockOrders);
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl mb-10">我的订单</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50">
          <p className="text-gray-500 mb-4">您还没有任何订单记录。</p>
          <button 
            onClick={() => navigate('/products')}
            className="text-sm border-b border-black pb-1 hover:text-gray-600 transition-colors"
          >
            去逛逛
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200">
              <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm border-b border-gray-200">
                <div className="flex space-x-6 mb-2 sm:mb-0">
                  <div>
                    <span className="text-gray-500 block text-xs mb-1">订单日期</span>
                    <span>{order.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs mb-1">总计</span>
                    <span>¥ {order.totalAmount}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs mb-1">订单号</span>
                    <span>{order.id}</span>
                  </div>
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {order.status === 'paid' ? '已支付' : order.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex gap-6 mb-6 last:mb-0">
                    <div className="w-20 aspect-[3/4] bg-gray-100 flex-shrink-0">
                      <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">{item.product.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">尺码: {item.size}</p>
                      <p className="text-sm">¥ {item.product.price} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
