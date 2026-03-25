import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Mock login/register
    login(email);
    
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect') || '/';
    navigate(redirect);
  };

  return (
    <div className="py-20 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 sm:p-12 border border-gray-100 shadow-sm">
        <h1 className="font-serif text-3xl mb-2 text-center">{isRegister ? '创建账户' : '欢迎回来'}</h1>
        <p className="text-gray-500 text-sm text-center mb-8">
          {isRegister ? '注册获取专属折扣及最新资讯' : '登录您的 LUMIÈRE 账户'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">电子邮箱</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">密码</label>
            <input 
              type="password" 
              required 
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
            />
          </div>
          
          {!isRegister && (
            <div className="text-right">
              <a href="#" className="text-xs text-gray-500 hover:text-black">忘记密码？</a>
            </div>
          )}

          <button type="submit" className="w-full bg-primary text-white py-4 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors">
            {isRegister ? '注册' : '登录'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            {isRegister ? '已有账户？点击登录' : '没有账户？创建新账户'}
          </button>
        </div>
      </div>
    </div>
  );
};
