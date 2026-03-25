import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="py-32 flex flex-col items-center justify-center text-center">
      <h1 className="font-serif text-4xl mb-6">敬请期待</h1>
      <p className="text-gray-500 mb-10 max-w-md">
        该页面正在筹备中，即将上线。感谢您的耐心等待与支持。
      </p>
      <Link 
        to="/" 
        className="border border-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
};
