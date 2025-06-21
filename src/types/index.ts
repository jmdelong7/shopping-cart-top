export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export type CartActionType = 
  | 'ADD_ITEM'
  | 'UPDATE_QUANTITY'
  | 'REMOVE_ITEM'
  | 'CLEAR_CART';

export interface CartAction {
  type: CartActionType;
  payload?: {
    product?: Product;
    productId?: number;
    quantity?: number;
  };
}