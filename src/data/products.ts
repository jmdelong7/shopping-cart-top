// Static products moved to products.backup.ts
// Now using Fake Store API for dynamic product data

export { fetchProducts, fetchProductById, fetchCategories, fetchProductsByCategory } from '../services/api';

// Re-export static products as fallback if needed
export { products } from './products.backup';