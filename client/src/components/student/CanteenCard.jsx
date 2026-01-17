import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star } from 'lucide-react';

const CanteenCard = ({ canteen }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
    >
      <Link to={`/canteen/${canteen._id}`} className="block h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={canteen.imageUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
            alt={canteen.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span>4.5</span>
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-2 font-display group-hover:text-primary-600 transition-colors">
            {canteen.name}
          </h3>

          <div className="space-y-2 mt-auto">
            <div className="flex items-center text-slate-500 text-sm">
              <MapPin size={16} className="mr-2 text-primary-500" />
              <span className="truncate">{canteen.location}</span>
            </div>
            <div className="flex items-center text-slate-500 text-sm">
              <Clock size={16} className="mr-2 text-primary-500" />
              <span>Open Now • Closes 9 PM</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CanteenCard;