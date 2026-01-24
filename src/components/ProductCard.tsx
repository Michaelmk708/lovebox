import { motion } from 'framer-motion';
import { Plus, Heart, Sparkles, Crown } from 'lucide-react';
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
  
  const isPremium = product.category === 'digital' || product.price >= 2500;

  // Helper to get the display label for categories
  const getCategoryLabel = (cat: string) => {
    if (cat === 'budget') return '💝 Under 500';
    if (cat === 'hampers') return '🎁 Luxury Hamper';
    if (cat === 'digital') return '✨ Digital Gift';
    if (cat === 'keepsakes') return '🧸 Keepsake';
    // Fallback: Capitalize the category name (e.g. "Flowers")
    return `🌹 ${cat.charAt(0).toUpperCase() + cat.slice(1)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8 }}
      className={`group relative bg-card rounded-2xl overflow-hidden transition-all duration-500 ${
        isPremium 
          ? 'shadow-[0_8px_40px_-12px_rgba(225,29,72,0.25)] hover:shadow-[0_20px_60px_-15px_rgba(225,29,72,0.4)]' 
          : 'shadow-card hover:shadow-elevated'
      }`}
    >
      {/* Premium shimmer border effect */}
      {isPremium && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(225,29,72,0.3) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Premium golden glow overlay */}
      {isPremium && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-pink-200/10 pointer-events-none z-0" />
      )}

      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary to-pink-50">
        {/* Image with smooth zoom */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        
        {/* Elegant overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Wishlist button with animation */}
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
        
        {/* Category badges */}
        {product.category === 'budget' && (
          <motion.span 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-3 left-3 px-3 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg"
          >
            ✨ Best Value
          </motion.span>
        )}
        
        {isPremium && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold rounded-full shadow-lg shadow-amber-500/30"
          >
            <Crown className="w-3.5 h-3.5" />
            Premium
          </motion.div>
        )}

        {/* Floating sparkles for premium items */}
        {isPremium && (
          <>
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="absolute bottom-4 right-4 text-amber-400"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -6, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-8 right-10 text-primary/60"
            >
              <Sparkles className="w-3 h-3" />
            </motion.div>
          </>
        )}
      </div>

      <div className="relative p-5">
        {/* Category label - UPDATED LOGIC HERE */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className={`text-xs uppercase tracking-widest mb-2 font-medium ${
            isPremium ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          {getCategoryLabel(product.category)}
        </motion.p>
        
        {/* Product name with elegant typography */}
        <h3 className={`font-serif text-xl font-semibold mb-2 transition-colors duration-300 ${
          isPremium 
            ? 'text-card-foreground group-hover:text-primary' 
            : 'text-card-foreground'
        }`}>
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price and CTA */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className={`text-2xl font-bold tracking-tight ${
              isPremium 
                ? 'bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent' 
                : 'text-primary'
            }`}>
              {formatPrice(product.price)}
            </span>
            {isPremium && (
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
                Exclusive Offer
              </span>
            )}
          </div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => addToCart(product)}
              size="sm"
              className={`btn-touch gap-1.5 font-semibold transition-all duration-300 ${
                isPremium 
                  ? 'bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30' 
                  : ''
              }`}
            >
              <Plus className="w-4 h-4" />
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;