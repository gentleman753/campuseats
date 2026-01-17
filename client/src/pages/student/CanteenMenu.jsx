import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart } from '../../store/cartSlice';
import apiClient from '../../api/apiClient';
import MenuItemCard from '../../components/student/MenuItemCard';
import Spinner from '../../components/common/Spinner';
import PageTransition from '../../components/common/PageTransition';
import toast from 'react-hot-toast';
import { ArrowLeft, MapPin, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const CanteenMenu = () => {
  const { id: canteenId } = useParams();
  const [canteen, setCanteen] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { canteen: cartCanteen } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchCanteenAndMenu = async () => {
      try {
        setLoading(true);
        const [canteenRes, menuRes] = await Promise.all([
          apiClient.get(`/student/canteens/${canteenId}`),
          apiClient.get(`/student/canteens/${canteenId}/menu`),
        ]);
        setCanteen(canteenRes.data);
        setMenuItems(menuRes.data);
      } catch (error) {
        toast.error('Failed to fetch canteen details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCanteenAndMenu();
  }, [canteenId]);

  const handleAddToCart = (item) => {
    if (cartCanteen && cartCanteen._id !== canteen._id) {
      if (window.confirm('Your cart contains items from another canteen. Would you like to clear it and add this item?')) {
        dispatch(clearCart());
        dispatch(addToCart({ item, canteenInfo: canteen }));
        toast.success(`${item.name} added to cart!`);
      } else {
        return;
      }
    } else {
      dispatch(addToCart({ item, canteenInfo: canteen }));
      toast.success(`${item.name} added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spinner />
      </div>
    );
  }

  if (!canteen) {
    return <p className="text-center text-gray-600 mt-10">Canteen not found.</p>;
  }

  return (
    <PageTransition className="pb-24">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={18} />
        Back to Canteens
      </Link>

      {/* Canteen Header */}
      <div className="relative mb-10 group rounded-3xl overflow-hidden shadow-xl">
        <div className="h-64 md:h-80 overflow-hidden">
          <img
            src={canteen.imageUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
            alt={canteen.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 font-display">{canteen.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm md:text-base font-medium">
              <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                <MapPin size={16} /> {canteen.location}
              </span>
              <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                <Clock size={16} /> Open Now
              </span>
              <span className="flex items-center gap-1.5 bg-yellow-500/20 backdrop-blur-md px-3 py-1 rounded-full text-yellow-300 border border-yellow-500/30">
                <Star size={16} className="fill-yellow-300" /> 4.5 Rating
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 font-display">Menu</h2>
        <div className="flex gap-2">
          {/* Categories could go here */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.length > 0 ? (
          menuItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MenuItemCard
                item={item}
                onAddToCart={() => handleAddToCart(item)}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-lg">This canteen has no items available.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default CanteenMenu;