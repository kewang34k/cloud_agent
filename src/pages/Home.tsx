import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../utils/mockData';
import { X } from 'lucide-react';

export const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem('hasSeenPopup', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const hotSales = products.filter(p => p.isHot).slice(0, 4);

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative h-[70vh] sm:h-[80vh] w-full overflow-hidden flex items-center justify-center -mt-8">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Collection" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl mb-6 tracking-wide"
          >
            2026 春夏系列
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl mb-10 font-light tracking-widest"
          >
            极简美学，优雅随行
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/products" 
              className="inline-block bg-white text-primary px-8 py-3 text-sm tracking-widest uppercase hover:bg-gray-100 transition-colors"
            >
              探索系列
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section>
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-serif text-3xl tracking-wide">最新上架</h2>
          <Link to="/products" className="text-sm border-b border-primary pb-1 hover:text-gray-500 transition-colors">查看全部</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group block">
              <div className="aspect-[3/4] overflow-hidden mb-4 bg-gray-100">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-sm mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500">¥ {product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Campaign Banner */}
      <section className="relative h-[50vh] flex items-center bg-secondary">
        <div className="absolute inset-0 w-1/2 hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Campaign" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 md:ml-auto px-8 md:px-16 lg:px-24 py-12 flex flex-col justify-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">可持续时尚</h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-sm">
            我们采用环保面料与精湛工艺，致力于打造历久弥新的经典单品。让每一件衣物都能陪伴您走过更多岁月。
          </p>
          <div>
            <Link to="/products" className="text-sm uppercase tracking-widest border-b border-primary pb-1">了解更多</Link>
          </div>
        </div>
      </section>

      {/* Hot Sales */}
      <section>
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl tracking-wide mb-4">热销单品</h2>
          <p className="text-gray-500 text-sm">深受用户喜爱的经典之作</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotSales.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group block">
              <div className="aspect-[3/4] overflow-hidden mb-4 bg-gray-100 relative">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2 left-2 bg-white px-2 py-1 text-[10px] tracking-wider uppercase">Best Seller</div>
              </div>
              <h3 className="text-sm mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500">¥ {product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* New User Popup */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md relative overflow-hidden flex flex-col shadow-2xl"
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="h-48 bg-gray-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1434389678369-182cb14f1b20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Welcome" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="font-serif text-2xl mb-2">欢迎来到 LUMIÈRE</h3>
                <p className="text-gray-600 text-sm mb-6">注册即享首单 9 折优惠，并解锁更多专属特权。</p>
                <Link 
                  to="/login" 
                  onClick={() => setShowPopup(false)}
                  className="block w-full bg-primary text-white py-3 text-sm tracking-widest mb-3 hover:bg-gray-800 transition-colors"
                >
                  立即注册
                </Link>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="text-xs text-gray-500 underline underline-offset-4"
                >
                  暂不需要
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
