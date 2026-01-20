import { motion } from 'framer-motion';
import { Sparkles, Crown, Heart, Star, ArrowRight, Check } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/whatsapp';
import { Button } from '@/components/ui/button';

interface PremiumShowcaseProps {
  product: Product;
}

const PremiumShowcase = ({ product }: PremiumShowcaseProps) => {
  const { addToCart } = useCart();

  const features = [
    'Personalized love story timeline',
    'Beautiful photo galleries',
    'Background music integration',
    'Forever accessible online',
  ];

  return (
    <section className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-4xl mx-auto"
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-primary/10 rounded-full mb-4">
            <Crown className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600">Premium Experience</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            Our Signature Gift
          </h2>
          <p className="text-muted-foreground">
            The ultimate expression of your love story
          </p>
        </motion.div>

        {/* Main Showcase Card */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
        >
          {/* Animated border gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-pink-400 to-amber-400 p-[2px] rounded-3xl">
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['-200% 0', '200% 0'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* Card Content */}
          <div className="relative m-[2px] bg-gradient-to-br from-white via-pink-50/50 to-rose-50 rounded-3xl overflow-hidden">
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-primary/20"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.6, 0.2],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  {i % 2 === 0 ? (
                    <Heart className="w-4 h-4 fill-current" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative aspect-square md:aspect-auto overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
                
                {/* Elegant overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/80 md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />

                {/* Premium badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="absolute top-6 left-6 w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl shadow-amber-500/30"
                >
                  <div className="text-center text-white">
                    <Crown className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-[10px] font-bold uppercase">Premium</span>
                  </div>
                </motion.div>

                {/* Rating stars */}
                <div className="absolute bottom-6 left-6 flex items-center gap-1 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </motion.div>
                  ))}
                  <span className="ml-1 text-sm font-semibold text-foreground">5.0</span>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-10 flex flex-col justify-center relative">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Digital Gift
                  </p>
                  
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                    {product.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground/80">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Price and CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground line-through">
                        KES 5,000
                      </span>
                      <span className="text-4xl font-bold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 sm:flex-none"
                    >
                      <Button
                        onClick={() => addToCart(product)}
                        size="lg"
                        className="w-full sm:w-auto bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 gap-2"
                      >
                        Add to Cart
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-6 pt-6 border-t border-primary/10 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-primary" /> 500+ Happy Couples
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" /> Lifetime Access
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PremiumShowcase;
