import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, TrendingUp, User, LogIn, UserPlus, Home, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = ({ isInHero = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#about', label: 'About' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#contact', label: 'Contact' },
  ];

  const userNavLinks = [
    { href: '/home', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className={`${isInHero 
      ? 'absolute top-0 left-0 right-0 z-50 bg-transparent' 
      : `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 shadow-lg' 
            : 'bg-transparent'
        }`
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group transition-transform duration-200 hover:scale-105"
          >
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors duration-200">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Finance<span className="text-blue-400">Tracker</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!authUser ? (
              <>
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                  </a>
                ))}
              </>
            ) : (
              <>
                {userNavLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 relative group"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                  );
                })}
              </>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!authUser ? (
              <>
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white border-0 transition-all duration-200 hover:scale-105"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm">
                  Welcome, <span className="text-white font-medium">{authUser.name}</span>
                </span>
                <Button 
                  onClick={handleLogout}
                  variant="ghost" 
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white hover:bg-gray-800/50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="pb-4 pt-2 space-y-2 bg-gray-900/95 backdrop-blur-md rounded-lg mt-2 border border-gray-800/50">
            {!authUser ? (
              <>
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-200 rounded-md mx-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="border-t border-gray-800 my-2"></div>
                <Link 
                  to="/login" 
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-200 rounded-md mx-2"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="h-4 w-4 inline mr-2" />
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-md mx-2"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus className="h-4 w-4 inline mr-2" />
                  Signup
                </Link>
              </>
            ) : (
              <>
                {userNavLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-200 rounded-md mx-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
                <div className="border-t border-gray-800 my-2"></div>
                <div className="px-4 py-2 text-gray-400 text-sm mx-2">
                  Welcome, <span className="text-white font-medium">{authUser.name}</span>
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-200 rounded-md mx-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
