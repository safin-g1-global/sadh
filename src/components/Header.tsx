
import React from 'react';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold">SOUTH ASIAN CENTER</h1>
            <p className="text-sm opacity-90">FOR DIABETES AND HEART HEALTH</p>
          </div>
        </div>
        <button className="p-2 hover:bg-blue-800 rounded-lg transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
