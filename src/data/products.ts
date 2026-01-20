export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'budget' | 'hampers' | 'digital';
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Love Letter Box',
    price: 450,
    category: 'budget',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop',
    description: 'Handwritten love letters with rose petals in a beautiful keepsake box.'
  },
  {
    id: '2',
    name: 'Red Rose Hamper',
    price: 2500,
    category: 'hampers',
    image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=400&fit=crop',
    description: 'Luxury hamper with roses, chocolates, wine, and scented candles.'
  },
  {
    id: '3',
    name: 'Custom Love Website',
    price: 3500,
    category: 'digital',
    image: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2?w=400&h=400&fit=crop',
    description: 'A personalized love story website with photos, music, and memories.'
  },
  {
    id: '4',
    name: 'Chocolate Heart Box',
    price: 350,
    category: 'budget',
    image: 'https://images.unsplash.com/photo-1549488497-1176d0468b21?w=400&h=400&fit=crop',
    description: 'Premium Belgian chocolates arranged in a heart-shaped box.'
  },
  {
    id: '5',
    name: 'Romantic Spa Hamper',
    price: 4500,
    category: 'hampers',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop',
    description: 'Complete spa experience with bath bombs, oils, candles, and robes for two.'
  }
];
