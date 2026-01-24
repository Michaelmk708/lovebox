import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, LogIn, LogOut, User, History } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { items, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Check login status whenever Navbar loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    if (token) {
      setIsLoggedIn(true);
      if (email) setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    // 1. Clear Data
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    
    // 2. Update State
    setIsLoggedIn(false);
    setUserEmail('');
    
    // 3. Go Home & Refresh (to clear any cached user data)
    navigate('/');
    window.location.reload(); 
  };

  return (
    <nav className="fixed top-15 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold text-rose-600">
          <Heart className="w-6 h-6 fill-rose-600" />
          <span>LoveBox</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-rose-600 transition-colors">Shop</Link>
          <Link to="/build-package" className="text-sm font-medium hover:text-rose-600 transition-colors">Build Hamper</Link>
          
          {/* User Section */}
          <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {/* 👇 Added My Orders Link */}
                <Link to="/history" className="text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors flex items-center gap-1">
                  <History className="w-4 h-4" />
                  My Orders
                </Link>

                <span className="text-xs text-gray-500 font-medium">
                  Hi, {userEmail.split('@')[0]}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-rose-600">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200">
                    <LogIn className="w-4 h-4 mr-2" /> Join
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-rose-50 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                {items.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {items.length}
              </span>
            )}
          </button>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 shadow-lg absolute w-full">
          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-700">
              Shop Gifts
            </Link>
            <Link to="/build-package" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-700">
              Build Your Own Hamper
            </Link>
            
            <hr className="border-gray-100" />
            
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 py-2 text-rose-600 font-medium">
                  <User className="w-4 h-4" /> 
                  {userEmail}
                </div>
                {/* 👇 Added My Orders Link for Mobile */}
                <Link to="/history" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-2 text-gray-700 hover:text-rose-600">
                  <History className="w-4 h-4" />
                  My Orders
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 py-2 text-gray-500 w-full text-left">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-center bg-rose-600 hover:bg-rose-700">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;