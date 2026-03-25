import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../utils/mockData';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';

export const ProductList = () => {
  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-6 md:space-y-0">
        <div>
          <h1 className="font-serif text-4xl mb-2">所有商品</h1>
          <p className="text-gray-500 text-sm">探索我们的全线系列</p>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 text-sm border border-gray-300 px-4 py-2 hover:border-black transition-colors">
            <span>筛选</span>
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <select className="text-sm border border-gray-300 px-4 py-2 bg-transparent hover:border-black focus:outline-none transition-colors">
            <option>默认排序</option>
            <option>价格从低到高</option>
            <option>价格从高到低</option>
            <option>最新上架</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/product/${product.id}`} className="group block">
              <div className="aspect-[3/4] overflow-hidden mb-4 bg-gray-100 relative">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-[10px] tracking-wider uppercase">New</div>
                )}
                {/* Secondary Image on Hover */}
                {product.images[1] && (
                  <img 
                    src={product.images[1]} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">¥ {product.price}</p>
                </div>
                <button className="text-xs border-b border-transparent group-hover:border-black transition-colors pb-0.5">
                  查看
                </button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
