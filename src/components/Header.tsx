
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Health Assessment', path: '/assessment' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Resources', path: '/resources' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-blue-900 text-white px-4 md:px-6 py-4 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => handleNavigation('/')}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold">SOUTH ASIAN CENTER</h1>
            <p className="text-xs md:text-sm opacity-90">FOR DIABETES AND HEART HEALTH</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`text-sm font-medium transition-colors duration-200 hover:text-yellow-300 relative ${
                isActivePath(item.path) 
                  ? 'text-yellow-300 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-yellow-300' 
                  : 'text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <button className="p-2 hover:bg-blue-800 rounded-lg transition-colors">
                <Menu size={24} />
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-blue-900 text-white border-blue-700">
              <DrawerHeader className="flex items-center justify-between">
                <DrawerTitle className="text-white">Navigation Menu</DrawerTitle>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </DrawerHeader>
              <nav className="flex flex-col space-y-2 p-4">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`text-left p-4 rounded-lg transition-colors duration-200 hover:bg-blue-800 ${
                      isActivePath(item.path) 
                        ? 'bg-blue-800 text-yellow-300 border-l-4 border-yellow-300' 
                        : 'text-white'
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
