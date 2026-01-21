export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'budget' | 'hampers' | 'digital' | 'Wines' | 'Services' | 'packages' | 'keepsakes';
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Love Letter Box',
    price: 450,
    category: 'budget',
    image: 'https://i.pinimg.com/1200x/19/b5/20/19b520dd2d19a3b0c51f7d88fe3e5142.jpg',
    description: 'Handwritten love letters with rose petals in a beautiful keepsake box.'
  },
  {
    id: '2',
    name: 'Red Rose Hamper',
    price: 2500,
    category: 'hampers',
    image: 'https://i.pinimg.com/736x/58/67/c5/5867c5181d6a3613073c72e23c3bc7bb.jpg',
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
    price: 900,
    category: 'budget',
    image: 'https://i.pinimg.com/736x/bf/de/ec/bfdeec4dc7ff76ab2310f9d48c846957.jpg',
    description: 'Premium Belgian chocolates arranged in a heart-shaped box.'
  },
  
  {
    id: '5',
    name: 'Teddy Bear & Roses',
    price: 1200,
    category: 'hampers',
    image: 'https://i.pinimg.com/736x/ed/49/b6/ed49b6655caaeaaf80c8a082e02aa1fc.jpg',
    description: 'Adorable plush teddy bear with a bouquet of fresh red roses.'
  },
  {
    id: '6',
    name: 'Digital Love Card',
    price: 200,
    category: 'digital',
    image: 'https://i.pinimg.com/736x/89/06/79/8906792d9aec1b30d9e4846108d0b283.jpg',
    description: 'Animated digital greeting card with personalized message and music.'
  },
  {
    id: '7',
    name: 'Scented Candle Set',
    price: 480,
    category: 'budget',
    image: 'https://i.pinimg.com/736x/7a/a1/96/7aa19681df57999da2004d355233b54d.jpg',
    description: 'Set of 3 romantic scented candles - rose, vanilla, and lavender.'
  },
 {
    id: '8',
    name: "The 'Classic Date' Bottle (Sweet Red)",
    price: 1200,
    category: "Wines",
    image: "https://imgs.search.brave.com/0odtdYUfDUo_ucRf5jdZid4wFN6RpZ5JHnoi2-vvTFs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jbXMu/Y2RuNHZlc3QuY29t/L2ltYWdlcy9zd2Vl/dC1yZWQtd2luZS1m/b3ItYmVnaW5uZXJz/LUJyYWNoZXR0by53/aWR0aC04MDAuanBn", // Use a generic wine image or specific brand
    description: "750ml Sweet Red Wine (e.g., 4th Street). Perfect for sharing. *Strictly for persons over 18.*",
  },
  {
    id: '9',
    name: "Golden Celebration (Non-Alcoholic)",
    price: 950,
    category: "Wines",
    image: "https://imgs.search.brave.com/kh475TLr7Wn8eKL4UbbWT1t4ZEaQA4GzFPJXAIyslIQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kcnln/b29kc2RyaW5rcy5j/b20vY2RuL3Nob3Av/ZmlsZXMvQ09QRU5I/QUdFTi1EVU8tU1RV/RElPXzMwMHgucG5n/P3Y9MTY5NjAyNTYz/OA",
    description: "Sparkling Grape Juice (Chamdor style). Pop the cork without the alcohol. Classy, bubbly, and delicious.",
  },
  {
    id: '10',
    name: "The 'Sip & Snack' Combo",
    price: 1600,
    category: "Wines",
    image: "https://media.istockphoto.com/id/1463587147/photo/bottle-of-red-wine-on-colored-background-for-valentine-day-with-gift-and-chocolate-heart.jpg?s=612x612&w=0&k=20&c=MGdbvX3Th-mVzUpDELmXKkeaPh5EMzB-WyYMS-HEEow=",
    description: "1 Bottle of Sweet Red Wine + 1 Large Bar of Dark Chocolate. A match made in heaven.",
  },
  // --- CATEGORY 5: SURPRISE SERVICES (100% Profit) ---
  {
    id: '11',
    name: "Service: The 'Ghost' Delivery",
    price: 150,
    category: "Services",
    image: "/images/service-secret.jpg", // Use an image of a 'shush' emoji or a mask
    description: "We deliver it anonymously. We won't reveal your identity until you are ready. Perfect for secret admirers.",
  },
  {
    id: '12',
    name: "Service: The 'Public Flex'",
    price: 250,
    category: "Services",
    image: "/images/service-public.jpg", // Use an image of a crowd or a stage
    description: "We deliver to them in Class or the Mess Hall in front of their friends. Maximum attention guaranteed.",
  },
  {
    id: '13',
    name: "Service: The 'Roommate' Setup",
    price: 200,
    category: "Services",
    image: "https://i.pinimg.com/736x/f9/10/d9/f910d9afbc0d64807f00125c7bc774c5.jpg", // Use an image of a gift on a bed
    description: "We coordinate with their roommate to place the gift on their bed before they get home. The ultimate surprise.",
  },// --- CATEGORY 6: THE LOVE PACKAGES (Best Sellers) ---
  {
    id: '14',
    name: "The 'Wine & Dine' Trio",
    price: 2400,
    category: "packages",
    image: "https://i.pinimg.com/736x/0d/1d/75/0d1d750ca4308103974c4ce1111263ed.jpg", 
    description: "The complete evening starter pack. Includes: 1 Bottle of Sweet Red Wine, a fresh bouquet of 3 Roses, and a premium 'Open Me' Love Card.",
  },
  {
    id: '15',
    name: "Sweethearts Combo (Choco + Flowers)",
    price: 1100,
    category: "packages",
    image: "https://i.pinimg.com/736x/72/4f/d8/724fd8d75620fe91cac36486dd640488.jpg", 
    description: "Simple and sweet. A large Dairy Milk chocolate bar tied together with a beautiful bunch of fresh roses.",
  },
  {
    id: '16',
    name: "Cuddles & Petals (Bear + Flowers)",
    price: 1800,
    category: "packages",
    image: "https://i.pinimg.com/736x/54/63/e5/5463e55f01317109f8eda6b6d72fb9d1.jpg", 
    description: "A cute medium-sized Teddy Bear holding a bouquet of roses. The gift that stays on her bed forever.",
  },
  {
    id: '17',
    name: "personalized keychain",
    price: 700,
    category: "keepsakes",
    image: "https://i.pinimg.com/1200x/5d/52/19/5d5219964b77793e6746ffd4661a2f0e.jpg", 
    description: "Carry a piece of them everywhere. Custom engraved with your initials or special date.",
  },
  {
    id: '18',
    name: "personalized postcards",
    price: 650,
    category: "keepsakes",
    image: "https://i.pinimg.com/736x/a3/52/7d/a3527dcda36b1c0231c4d7343174b68f.jpg", 
    description: "Turn your favorite memory into a keepsake. Premium cardstock with a custom design",
  }
];
