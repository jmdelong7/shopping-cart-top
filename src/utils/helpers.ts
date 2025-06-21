import { CartItem, Product } from '../types';

/**
 * Format price as currency string
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Calculate total number of items in cart
 */
export const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Calculate total price of all items in cart
 */
export const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

/**
 * Calculate subtotal for a specific cart item
 */
export const calculateItemSubtotal = (item: CartItem): number => {
  return item.product.price * item.quantity;
};

/**
 * Find cart item by product ID
 */
export const findCartItem = (items: CartItem[], productId: number): CartItem | undefined => {
  return items.find(item => item.product.id === productId);
};

/**
 * Check if product is in stock for requested quantity
 */
export const isInStock = (product: Product, requestedQuantity: number = 1): boolean => {
  return product.stock >= requestedQuantity;
};

/**
 * Generate unique cart item ID
 */
export const generateCartItemId = (productId: number): number => {
  return parseInt(`${productId}${Date.now().toString().slice(-6)}`);
};

/**
 * Validate quantity input
 */
export const validateQuantity = (quantity: number, maxStock: number): number => {
  if (quantity < 1) return 1;
  if (quantity > maxStock) return maxStock;
  return Math.floor(quantity);
};