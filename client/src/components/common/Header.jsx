import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import {
  ShoppingCart,
  LogOut,
  LogIn,
  ClipboardList,
  LayoutDashboard,
  Shield,
  Utensils,
  User,
} from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const cartCount = cartItems.length;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const NavItem = ({ to, icon: Icon, label, activeColor = 'text-primary-600' }) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
          isActive
            ? `bg-slate-100 ${activeColor} font-semibold`
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        )}
      >
        <Icon size={20} className={isActive ? "stroke-[2.5px]" : ""} />
        <span>{label}</span>
      </Link>
    );
  };

  const getNavLinks = () => {
    if (!user) {
      return (
        <Link
          to="/login"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl font-medium shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all active:scale-95"
        >
          <LogIn size={20} />
          <span>Login</span>
        </Link>
      );
    }

    if (user.role === 'student') {
      return (
        <>
          <NavItem to="/" icon={Utensils} label="Canteens" />
          <NavItem to="/orders" icon={ClipboardList} label="My Orders" />

          <Link
            to="/cart"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 relative",
              location.pathname === '/cart'
                ? "bg-slate-100 text-primary-600 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <ShoppingCart size={20} className={location.pathname === '/cart' ? "stroke-[2.5px]" : ""} />
            <span>Cart</span>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-secondary-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all ml-2"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </>
      );
    }

    if (user.role === 'manager') {
      return (
        <>
          <NavItem to="/manager/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/manager/menu" icon={Utensils} label="Menu" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all ml-2"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </>
      );
    }

    if (user.role === 'admin') {
      return (
        <>
          <NavItem to="/admin" icon={Shield} label="Admin Panel" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all ml-2"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </>
      );
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <nav className="container mx-auto max-w-6xl p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform duration-200">
            <Utensils size={24} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent font-display">
            CampusEats
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          {getNavLinks()}
        </div>
      </nav>
    </header>
  );
};

export default Header;