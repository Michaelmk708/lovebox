import { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '@/data/products'; // Import your data
import { useCart } from '@/context/CartContext';
import { Search, Plus, Check, ShoppingBag, PackageOpen, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils/whatsapp';

const BuildPackage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // State for selected items
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter out existing hampers (so you don't put a hamper inside a hamper)
  const availableItems = products.filter(
    p => p.category !== 'hampers' && 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const selectedProducts = products.filter(p => selectedIds.includes(p.id));
  const totalPrice = selectedProducts.reduce((sum, item) => sum + item.price, 0);
  const packagingFee = 500; // Optional: Cost for the box/basket itself
  const finalTotal = totalPrice + packagingFee;

  const toggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleAddBundleToCart = () => {
    if (selectedIds.length === 0) return;

    // 🪄 THE TRICK: Create one "Mega Product" containing everything
    const bundleDescription = selectedProducts.map(p => p.name).join(', ');

  const customHamper = {
      id: `custom-${Date.now()}`,
      name: "Custom Valentine's Package",
      price: finalTotal,
      // 👇 ADD 'as const' HERE
      category: 'hampers' as const, 
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000",
      description: `A personalized selection containing: ${bundleDescription}`,
      customText: bundleDescription 
    };

    // If 'as const' doesn't work because your Product type is very strict, 
    // use this backup line instead:
    // addToCart(customHamper as any); 

    addToCart(customHamper);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-pink-50/50 pb-32">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 border-b border-pink-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-serif font-bold text-rose-900 flex items-center gap-2">
              <PackageOpen className="text-rose-600" /> Build Your Hamper
            </h1>
            <Button variant="ghost" onClick={() => navigate('/')}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              placeholder="Search chocolates, wine, flowers..." 
              className="w-full pl-10 pr-4 py-2 rounded-full border border-pink-200 focus:ring-2 focus:ring-rose-500 outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableItems.map((product) => {
            const isSelected = selectedIds.includes(product.id);
            return (
              <motion.div 
                key={product.id}
                layoutId={product.id}
                onClick={() => toggleItem(product.id)}
                className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  isSelected ? 'border-rose-500 shadow-lg bg-rose-50' : 'border-transparent bg-white shadow-sm hover:shadow-md'
                }`}
              >
                {/* Selection Indicator */}
                <div className={`absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-rose-600 text-white' : 'bg-black/10 text-transparent'
                }`}>
                  <Check className="w-4 h-4" />
                </div>

                <div className="aspect-square relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {isSelected && <div className="absolute inset-0 bg-rose-900/10" />}
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</h3>
                  <p className="text-rose-600 font-bold text-sm mt-1">{formatPrice(product.price)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-30">
        <div className="container mx-auto max-w-2xl flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500">
              {selectedIds.length} Items + Packaging ({formatPrice(packagingFee)})
            </p>
            <p className="text-xl font-bold text-rose-700">{formatPrice(finalTotal)}</p>
          </div>
          
          <Button 
            onClick={handleAddBundleToCart}
            disabled={selectedIds.length === 0}
            className="bg-rose-600 hover:bg-rose-700 text-white px-8 rounded-full h-12 shadow-lg shadow-rose-200"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add Package
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuildPackage;