import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/whatsapp';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // --- BUSINESS LOGIC: 50% DEPOSIT ---
  const depositAmount = totalPrice / 2;

  const handleCheckout = () => {
    // Close the drawer first
    setIsCartOpen(false);
    // Navigate to the checkout page we created
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-elevated z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-xl font-semibold">Your Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-touch p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground mb-2">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground">
                    Add some love to your cart!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-3 p-3 bg-secondary/50 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-card-foreground truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-primary font-semibold">
                          {formatPrice(item.price)}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="btn-touch w-8 h-8 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="btn-touch w-8 h-8 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="btn-touch w-8 h-8 rounded-full text-destructive hover:bg-destructive/10 flex items-center justify-center ml-auto transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with DEPOSIT LOGIC */}
            {items.length > 0 && (
              <div className="border-t border-border p-4 space-y-4">
                
                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-muted-foreground text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  
                  {/* --- THE IMPORTANT DEPOSIT BOX --- */}
                  <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 space-y-1">
                    <div className="flex items-center justify-between text-rose-700">
                      <span className="font-bold text-sm">Deposit Due Now (50%)</span>
                      <span className="font-bold text-lg">{formatPrice(depositAmount)}</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-rose-600/80">
                      <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                      <p>Required by Feb 10th to confirm order. Balance due on delivery.</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="w-full btn-touch text-lg gap-2 bg-rose-600 hover:bg-rose-700 text-white"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Proceed to Checkout
                </Button>

                <button
                  onClick={clearCart}
                  className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;