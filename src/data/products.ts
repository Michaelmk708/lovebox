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
    image: 'https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=400&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
    description: 'A personalized love story website with photos, music, and memories.'
  },
  {
    id: '4',
    name: 'Chocolate Heart Box',
    price: 350,
    category: 'budget',
    image: 'https://images.unsplash.com/photo-1548741487-18d363dc4469?w=400&h=400&fit=crop',
    description: 'Premium Belgian chocolates arranged in a heart-shaped box.'
  },
  {
    id: '5',
    name: 'Romantic Spa Hamper',
    price: 4500,
    category: 'hampers',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop',
    description: 'Complete spa experience with bath bombs, oils, candles, and robes for two.'
  },
  {
    id: '6',
    name: 'Teddy Bear & Roses',
    price: 1200,
    category: 'hampers',
    image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=400&h=400&fit=crop',
    description: 'Adorable plush teddy bear with a bouquet of fresh red roses.'
  },
  {
    id: '7',
    name: 'Digital Love Card',
    price: 200,
    category: 'digital',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop',
    description: 'Animated digital greeting card with personalized message and music.'
  },
  {
    id: '8',
    name: 'Scented Candle Set',
    price: 480,
    category: 'budget',
    image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=400&fit=crop',
    description: 'Set of 3 romantic scented candles - rose, vanilla, and lavender.'
  }
];
