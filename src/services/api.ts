import { Product } from '../types';

interface FakeStoreProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Transform Fake Store API product to our Product interface
 */
const transformProduct = (apiProduct: FakeStoreProduct): Product => {
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    description: apiProduct.description,
    price: apiProduct.price,
    image: apiProduct.image,
    category: apiProduct.category,
    stock: 1, // Default stock value as requested
    rating: apiProduct.rating,
  };
};

/**
 * Fetch all products from Fake Store API
 */
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: FakeStoreProduct[] = await response.json();
    return data.map(transformProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products. Please try again later.');
  }
};

/**
 * Fetch a single product by ID from Fake Store API
 */
export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: FakeStoreProduct = await response.json();
    return transformProduct(data);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error(`Failed to fetch product ${id}. Please try again later.`);
  }
};

/**
 * Fetch all product categories from Fake Store API
 */
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories. Please try again later.');
  }
};

/**
 * Fetch products by category from Fake Store API
 */
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: FakeStoreProduct[] = await response.json();
    return data.map(transformProduct);
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw new Error(`Failed to fetch products for category ${category}. Please try again later.`);
  }
};