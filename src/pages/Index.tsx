import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FilterButtons from '@/components/FilterButtons';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import PremiumShowcase from '@/components/PremiumShowcase';
import { products } from '@/data/products';
import { Heart, ArrowRight, PackageOpen } from 'lucide-react';

// 1. UPDATED CATEGORIES
type Category = 'all' | 'budget' | 'hampers' | 'digital' | 'Wines' | 'Services' | 'packages' | 'keepsakes' | 'flowers' | 'teddy_bears';

// --- HELPER COMPONENT: The "Coming Soon" Teaser Card ---
const ComingSoonTeaser = ({ category }: { category: 'flowers' | 'teddy_bears' }) => {
  const isFlowers = category === 'flowers';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-1 sm:col-span-2 lg:col-span-3"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 to-pink-100 border border-pink-200 p-8 md:p-12 text-center shadow-inner">
        {/* Decorative background blur */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-rose-300/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Animated Icon */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center mx-auto mb-6"
          >
            <span className="text-4xl">{isFlowers ? '🌹' : '🧸'}</span>
          </motion.div>

          {/* Attractive Copy */}
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-rose-950 mb-4">
            {isFlowers ? "Blooms Worth Waiting For..." : "Cuddles Are Incoming..."}
          </h3>
          
          <p className="text-lg text-rose-800/80 leading-relaxed mb-8">
            {isFlowers 
              ? "Our florists are currently hand-picking the freshest, most romantic roses and lilies just for you. We are curating breathtaking bouquets that speak the language of love. Check back soon to secure the perfect arrangement!"
              : "We are gathering the softest, huggable companions to make this Valentine's unforgettable. From giant 6ft bears to cute desk buddies, our premium teddy collection is on its way. Watch this space!"
            }
          </p>

          <button disabled className="bg-rose-600/10 text-rose-700 font-semibold py-3 px-8 rounded-full cursor-not-allowed opacity-70">
            ✨ Dropping in 24 Hours
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const Index = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const navigate = useNavigate();

  // Get the premium product (Custom Love Website) to show separately
  const premiumProduct = products.find(p => p.id === '3');
  
  // Filter logic for the main grid
  const regularProducts = products.filter(p => p.id !== '3');
  
  const filteredProducts = regularProducts.filter((product) => {
    if (activeFilter === 'all') {
      return product.category !== 'Wines'; // Hide wines on 'All' tab
    } else {
      return product.category === activeFilter;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* --- URGENCY BANNER --- */}
      <div className="bg-red-600 text-white text-xs md:text-sm font-bold text-center py-2 px-4 sticky top-0 z-50">
        ⚠️ ORDER DEADLINE: All orders require a 50% deposit by Feb 10th to confirm!
      </div>
      
      <Navbar />
      <Hero />

      {/* Premium Showcase - Custom Love Website (Only on All or Digital tabs) */}
      {premiumProduct && (activeFilter === 'all' || activeFilter === 'digital') && (
        <PremiumShowcase product={premiumProduct} />
      )}

      {/* Products Section */}
      <section id="products" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Shop Valentine's Gifts
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              From thoughtful budget picks to luxurious hampers—find the perfect gift 
              to show your love.
            </p>
          </div>

          <FilterButtons 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* --- SCENARIO 1: BUILD YOUR OWN HAMPER CARD --- */}
              {/* Show only on 'All', 'Packages', or 'Hampers' tabs */}
              {(activeFilter === 'all' || activeFilter === 'packages' || activeFilter === 'hampers') && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate('/build-package')}
                  className="cursor-pointer group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 p-6 text-white shadow-lg transition-all hover:shadow-xl flex flex-col justify-between min-h-[300px]"
                >
                  {/* Decorative BG */}
                  <div className="absolute right-0 top-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute left-0 bottom-0 -ml-8 -mb-8 h-24 w-24 rounded-full bg-black/5 blur-xl" />
                  
                  <div className="relative z-10">
                    <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                      <PackageOpen className="text-white w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-2">Build Your Own Hamper</h3>
                    <p className="text-pink-100 text-sm leading-relaxed">
                      Want something specific? Mix and match wines, chocolates, and flowers to create a truly unique package.
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 flex items-center gap-2 font-semibold bg-white/10 w-fit px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
                    <span>Start Creating</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              )}

              {/* --- SCENARIO 2: PRODUCTS VS TEASER LOGIC --- */}
              {/* Logic: If products exist, display them. If NO products exist, check if we need to show a teaser. */}
              
              {filteredProducts.length > 0 ? (
                // 🟢 CASE A: We have products! Show them.
                filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))
              ) : (
                // 🔴 CASE B: No products found. Show Teaser OR Empty State.
                <>
                  {activeFilter === 'flowers' && <ComingSoonTeaser category="flowers" />}
                  {activeFilter === 'teddy_bears' && <ComingSoonTeaser category="teddy_bears" />}
                  
                  {/* If it's empty but NOT a special teaser tab, show generic message */}
                  {activeFilter !== 'flowers' && activeFilter !== 'teddy_bears' && activeFilter !== 'packages' && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">No products found in this category yet.</p>
                    </div>
                  )}
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-primary fill-primary" />
            <span className="font-serif text-lg font-semibold">LoveBox</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Made with love for Valentine's Day 2026
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Order • Fast Delivery around DKUT
        
          </p>
          <p>contact us via call or whatsapp at <strong>0746 043 054</strong> or Email us at <strong>lovebox.ke@gmail.com</strong></p>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
};

export default Index;