import { ShoppingBag, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const { totalItems, setIsCartOpen, justAdded } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary fill-primary" />
          <span className="font-serif text-xl font-semibold text-foreground">
            LoveBox
          </span>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative btn-touch flex items-center justify-center p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label="Open cart"
        >
          <motion.div
            animate={justAdded ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <ShoppingBag className="w-6 h-6 text-foreground" />
          </motion.div>
          
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
