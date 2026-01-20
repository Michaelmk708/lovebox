import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FilterButtons from '@/components/FilterButtons';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import PremiumShowcase from '@/components/PremiumShowcase';
import { products } from '@/data/products';
import { Heart } from 'lucide-react';

type Category = 'all' | 'budget' | 'hampers' | 'digital' | 'Wines' | 'Services' | 'packages';

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  // Get the premium product (Custom Love Website)
  const premiumProduct = products.find(p => p.id === '3');
  
  // Filter out the premium product from regular grid
  const regularProducts = products.filter(p => p.id !== '3');
  
  const filteredProducts = regularProducts.filter((product) => {
    if (activeFilter === 'all') return true;
    return product.category === activeFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* --- URGENCY BANNER --- */}
<div className="bg-red-600 text-white text-xs md:text-sm font-bold text-center py-2 px-4 sticky top-0 z-50">
  ⚠️ ORDER DEADLINE: All orders require a 50% deposit by Feb 10th to confirm!
</div>
      <Navbar />
      <Hero />

      {/* Premium Showcase - Custom Love Website */}
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
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
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
            Order via WhatsApp • Fast Delivery around DKUT
          </p>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
};

export default Index;
