import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="py-12 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl mb-4">联系我们</h1>
        <p className="text-gray-500">如果您有任何问题，我们很乐意为您解答。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full mb-6">
            <Mail className="w-5 h-5 text-gray-700" />
          </div>
          <h3 className="font-medium mb-2">电子邮箱</h3>
          <p className="text-sm text-gray-500 mb-4">我们将在24小时内回复</p>
          <a href="mailto:support@lumiere.com" className="text-sm border-b border-black pb-1 hover:text-gray-600 transition-colors">
            support@lumiere.com
          </a>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full mb-6">
            <Phone className="w-5 h-5 text-gray-700" />
          </div>
          <h3 className="font-medium mb-2">服务热线</h3>
          <p className="text-sm text-gray-500 mb-4">周一至周五 9:00 - 18:00</p>
          <a href="tel:400-123-4567" className="text-sm border-b border-black pb-1 hover:text-gray-600 transition-colors">
            400-123-4567
          </a>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full mb-6">
            <MapPin className="w-5 h-5 text-gray-700" />
          </div>
          <h3 className="font-medium mb-2">品牌总部</h3>
          <p className="text-sm text-gray-500 mb-4">上海市静安区</p>
          <span className="text-sm">南京西路 1225 号</span>
        </div>
      </div>

      <div className="bg-gray-50 p-8 md:p-12">
        <h2 className="font-serif text-2xl mb-8 text-center">发送消息</h2>
        <form className="space-y-6 max-w-2xl mx-auto" onSubmit={(e) => { e.preventDefault(); alert('消息已发送'); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">姓名</label>
              <input required type="text" className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">邮箱</label>
              <input required type="email" className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">主题</label>
            <input required type="text" className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">内容</label>
            <textarea required rows={4} className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors resize-none"></textarea>
          </div>
          <div className="text-center pt-4">
            <button type="submit" className="bg-primary text-white px-12 py-4 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors">
              提交
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
