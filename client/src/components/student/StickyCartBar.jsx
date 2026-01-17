import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { selectCartTotal } from '../../store/cartSlice';

const StickyCartBar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const totalAmount = useSelector(selectCartTotal);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-0 right-0 px-4 z-40 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <Link to="/cart">
              <div className="bg-slate-900/90 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl shadow-slate-900/20 flex items-center justify-between group hover:scale-[1.02] transition-transform duration-200">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-300 uppercase tracking-wider font-bold">Total</span>
                    <span className="font-bold text-lg">₹{totalAmount}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-medium group-hover:translate-x-1 transition-transform">
                  <span>View Cart</span>
                  <ChevronRight size={20} />
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCartBar;