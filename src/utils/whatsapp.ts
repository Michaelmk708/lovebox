import { CartItem } from '@/context/CartContext';

export const formatWhatsAppMessage = (items: CartItem[], total: number): string => {
  const itemsList = items
    .map((item) => `${item.quantity}x ${item.name}`)
    .join(', ');

  const message = `Hello! I would like to place an order for: ${itemsList}. Total: KES ${total.toLocaleString()}. How do I pay the deposit?`;

  return message;
};

export const generateWhatsAppLink = (items: CartItem[], total: number): string => {
  const phoneNumber = '254700000000'; // Replace with actual business number
  const message = formatWhatsAppMessage(items, total);
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const formatPrice = (price: number): string => {
  return `KES ${price.toLocaleString()}`;
};
