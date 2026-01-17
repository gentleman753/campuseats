import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import CanteenCard from '../../components/student/CanteenCard';
import Spinner from '../../components/common/Spinner';
import PageTransition from '../../components/common/PageTransition';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Home = () => {
  const [canteens, setCanteens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get('/student/canteens');
        setCanteens(data);
      } catch (error) {
        toast.error('Failed to fetch canteens');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCanteens();
  }, []);

  const filteredCanteens = canteens.filter(canteen =>
    canteen.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <PageTransition className="pb-24">
      {/* Hero Section */}
      <div className="relative bg-primary-600 text-white rounded-3xl p-8 mb-10 overflow-hidden shadow-xl shadow-primary-500/20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-2xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-4 font-display"
          >
            Hungry? We've got you covered.
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-primary-100 text-lg mb-8"
          >
            Skip the queue and pre-order from your favorite campus canteens.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-md"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search canteens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
            />
          </motion.div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 font-display">
          Available Canteens
        </h2>
        <span className="text-slate-500 text-sm font-medium bg-slate-100 px-3 py-1 rounded-full">
          {filteredCanteens.length} Open
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCanteens.length > 0 ? (
          filteredCanteens.map((canteen, index) => (
            <motion.div
              key={canteen._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CanteenCard canteen={canteen} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-lg">No canteens found matching your search.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Home;