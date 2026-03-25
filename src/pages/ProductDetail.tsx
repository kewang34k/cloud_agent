import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, reviews } from '../utils/mockData';
import { useStore } from '../store';
import { Star, ChevronRight, Ruler, Plus, Minus } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const { addToCart } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return <div className="py-20 text-center">商品不存在</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('请先选择尺码');
      return;
    }
    addToCart(product, selectedSize);
    alert('已加入购物车');
  };

  return (
    <div className="py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-gray-500 mb-8">
        <span className="cursor-pointer hover:text-black" onClick={() => navigate('/')}>首页</span>
        <ChevronRight className="w-3 h-3" />
        <span className="cursor-pointer hover:text-black" onClick={() => navigate('/products')}>所有商品</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        {/* Left: Images */}
        <div className="w-full md:w-3/5 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:w-20 md:flex-shrink-0">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`w-20 aspect-[3/4] flex-shrink-0 overflow-hidden ${activeImage === idx ? 'border border-black' : 'opacity-70 hover:opacity-100'}`}
              >
                <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] overflow-hidden bg-gray-100">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-2/5 flex flex-col">
          <div className="mb-8">
            <h1 className="font-serif text-3xl mb-4">{product.name}</h1>
            <p className="text-xl">¥ {product.price}</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-gray-500">选择尺码</span>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-black transition-colors">
                <Ruler className="w-4 h-4" />
                <span className="underline underline-offset-4">尺码指南</span>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm border transition-colors ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-4 text-sm tracking-widest uppercase mb-6 hover:bg-gray-800 transition-colors"
          >
            加入购物车
          </button>

          <div className="prose prose-sm text-gray-600 mb-12">
            <p>{product.description}</p>
          </div>

          {/* Details Accordion (Mock) */}
          <div className="border-t border-gray-200">
            <div className="py-4 flex justify-between items-center cursor-pointer">
              <span className="text-sm font-medium">材质与保养</span>
              <Plus className="w-4 h-4" />
            </div>
            <div className="border-t border-gray-200 py-4 flex justify-between items-center cursor-pointer">
              <span className="text-sm font-medium">配送与退换</span>
              <Plus className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-24 pt-12 border-t border-gray-200">
        <h2 className="font-serif text-2xl mb-8">用户评价</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map(review => (
            <div key={review.id} className="bg-gray-50 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="font-medium mr-4">{review.user}</span>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-black text-black' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
