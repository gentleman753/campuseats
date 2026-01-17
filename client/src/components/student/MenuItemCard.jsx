import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Image as ImageIcon } from 'lucide-react';
import Button from '../common/Button';

const MenuItemCard = ({ item, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:border-primary-100 transition-colors flex gap-4"
    >
      <div className="w-24 h-24 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <ImageIcon size={24} />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-slate-900 text-lg font-display">{item.name}</h3>
            <span className="font-bold text-primary-600">₹{item.price}</span>
          </div>
          <p className="text-slate-500 text-sm mt-1 line-clamp-2">{item.description}</p>
        </div>

        <div className="flex justify-end mt-3">
          <Button
            onClick={onAddToCart}
            size="sm"
            variant={item.isAvailable ? 'primary' : 'secondary'}
            disabled={!item.isAvailable}
            className="rounded-lg"
          >
            {item.isAvailable ? (
              <>
                <Plus size={16} className="mr-1" /> Add
              </>
            ) : (
              'Sold Out'
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;