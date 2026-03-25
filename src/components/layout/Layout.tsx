import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, Search, X } from 'lucide-react';
import { useStore } from '../../store';
import { useState } from 'react';

export const Layout = () => {
  const { cart, user, logout } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-surface text-primary">
      {/* Top Announcement Bar */}
      <div className="bg-primary text-white text-xs text-center py-2 tracking-widest uppercase">
        全场满 ¥500 免运费 | 7天无理由退换
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button className="sm:hidden p-2" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Links - Left */}
          <nav className="hidden sm:flex space-x-8 flex-1">
            <Link to="/products" className="text-sm font-medium hover:text-gray-500 transition-colors">最新上架</Link>
            <Link to="/products?category=clothing" className="text-sm font-medium hover:text-gray-500 transition-colors">服饰</Link>
            <Link to="/products?category=accessories" className="text-sm font-medium hover:text-gray-500 transition-colors">配饰</Link>
          </nav>

          {/* Logo - Center */}
          <Link to="/" className="font-serif text-2xl font-semibold tracking-widest flex-1 text-center">
            LUMIÈRE
          </Link>

          {/* Icons - Right */}
          <div className="flex items-center justify-end space-x-4 flex-1">
            <button className="p-2 hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            {user ? (
              <div className="relative group p-2 cursor-pointer">
                <User className="w-5 h-5" />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg hidden group-hover:block py-2">
                  <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100 truncate">{user.email}</div>
                  <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-50">我的订单</Link>
                  <button onClick={() => { logout(); navigate('/'); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600">退出登录</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="p-2">
                <User className="w-5 h-5" />
              </Link>
            )}
            <Link to="/cart" className="p-2 relative">
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 bg-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white sm:hidden flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
              <span className="font-serif text-xl tracking-widest">LUMIÈRE</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col p-4 space-y-6 flex-1">
              <Link to="/products" onClick={() => setIsMenuOpen(false)} className="text-xl">最新上架</Link>
              <Link to="/products" onClick={() => setIsMenuOpen(false)} className="text-xl">所有商品</Link>
              <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="text-xl">我的订单</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-xl">联系我们</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-xl mb-6 tracking-widest">LUMIÈRE</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              我们致力于为现代女性提供极简、优雅且高品质的日常着装。探索属于您的独特风格。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-6 uppercase tracking-wider">帮助与支持</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">联系我们</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">常见问题</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">配送信息</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">退换货政策</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-6 uppercase tracking-wider">订阅我们</h4>
            <p className="text-gray-400 text-sm mb-4">订阅获取最新系列资讯及独家优惠。</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="您的邮箱地址" 
                className="bg-transparent border-b border-gray-600 py-2 px-0 w-full focus:outline-none focus:border-white text-sm"
              />
              <button className="text-sm uppercase tracking-wider ml-4 hover:text-gray-300">订阅</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} LUMIÈRE. 保留所有权利。
        </div>
      </footer>
    </div>
  );
};
