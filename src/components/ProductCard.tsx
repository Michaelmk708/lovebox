import { motion } from 'framer-motion';
import { Plus, Heart, Sparkles, Crown, Info, X, MessageCircle } from 'lucide-react'; // 👈 Added MessageCircle
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/whatsapp';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  
  const isPremium = product.category === 'digital' || product.price >= 2500;
  const isKeepsake = product.category === 'keepsakes'; // 👈 Check for keepsake

  // Helper to get the display label for categories
  const getCategoryLabel = (cat: string) => {
    if (cat === 'budget') return '💝 budget';
    if (cat === 'hampers') return '🎁 Luxury Hamper';
    if (cat === 'digital') return '✨ Digital Gift';
    if (cat === 'keepsakes') return '🧸 Keepsake';
    return `🌹 ${cat.charAt(0).toUpperCase() + cat.slice(1)}`;
  };

  return (
    <motion.div
      layout 
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        layout: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.5, delay: index * 0.1 }
      }}
      whileHover={{ y: -8 }}
      className={`group relative bg-card rounded-2xl overflow-hidden transition-all duration-500 flex flex-col ${
        isPremium 
          ? 'shadow-[0_8px_40px_-12px_rgba(225,29,72,0.25)] hover:shadow-[0_20px_60px_-15px_rgba(225,29,72,0.4)]' 
          : 'shadow-card hover:shadow-elevated'
      }`}
    >
      {/* Premium Effects */}
      {isPremium && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(225,29,72,0.3) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '200% 200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary to-pink-50 flex-shrink-0">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        
        {/* Wishlist & Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <motion.button 
          onClick={() => setIsLiked(!isLiked)}
          whileTap={{ scale: 0.85 }}
          className="absolute top-3 right-3 z-20"
        >
          <motion.div
            whileHover={{ scale: 1.15 }}
            animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
            className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
              isLiked 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'bg-white/90 text-primary hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </motion.div>
        </motion.button>
        
        {/* Badges */}
        {product.category === 'budget' && (
          <span className="absolute top-3 left-3 px-3 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">✨ Best Value</span>
        )}
        {isPremium && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold rounded-full shadow-lg shadow-amber-500/30">
            <Crown className="w-3.5 h-3.5" /> Premium
          </div>
        )}
      </div>

      <div className="relative p-5 flex flex-col flex-grow">
        {/* Category */}
        <p className={`text-xs uppercase tracking-widest mb-2 font-medium ${isPremium ? 'text-primary' : 'text-muted-foreground'}`}>
          {getCategoryLabel(product.category)}
        </p>
        
        {/* Name */}
        <h3 className={`font-serif text-xl font-semibold mb-2 ${isPremium ? 'text-card-foreground group-hover:text-primary' : 'text-card-foreground'}`}>
          {product.name}
        </h3>
        
        {/* Description */}
        <motion.div layout className="mb-3 relative">
            <motion.p layout className={`text-sm text-muted-foreground leading-relaxed ${!showFullDesc ? 'line-clamp-2' : ''}`}>
                {product.description}
            </motion.p>
        </motion.div>

        {/* 👇 NEW: Keepsake Customization Message */}
        {isKeepsake && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                <div className="bg-amber-100 p-1.5 rounded-full text-amber-600 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                    <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-0.5">
                        Personalize It! ✍️
                    </p>
                    <p className="text-xs text-amber-700 leading-tight">
                        WhatsApp us your custom name/caption after ordering.
                    </p>
                </div>
            </div>
        )}

        <div className="flex-grow" />

        {/* Price & Actions */}
        <div className="flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-col">
            <span className={`text-2xl font-bold tracking-tight ${isPremium ? 'bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent' : 'text-primary'}`}>
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="flex gap-2">
            {/* Info Button */}
            <Button 
                variant="outline" size="icon" onClick={() => setShowFullDesc(!showFullDesc)}
                className={`w-9 h-9 rounded-full transition-colors ${showFullDesc ? 'border-primary text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary'}`}
            >
                {showFullDesc ? <X className="w-4 h-4" /> : <Info className="w-4 h-4" />}
            </Button>

            {/* Add Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => addToCart(product)} size="sm" className="btn-touch gap-1.5 font-semibold h-9">
                    <Plus className="w-4 h-4" /> Add
                </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;