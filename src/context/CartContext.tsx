import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartState, CartAction, CartItem, Product } from '../types';
import { calculateTotalItems, calculateTotalPrice, findCartItem, generateCartItemId } from '../utils/helpers';

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      if (!action.payload?.product || !action.payload?.quantity) {
        return state;
      }

      const { product, quantity } = action.payload;
      const existingItem = findCartItem(state.items, product.id);

      let updatedItems: CartItem[];

      if (existingItem) {
        // Update quantity of existing item
        const newQuantity = existingItem.quantity + quantity;
        // Ensure we don't exceed stock
        const finalQuantity = Math.min(newQuantity, product.stock);
        
        updatedItems = state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: finalQuantity }
            : item
        );
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: generateCartItemId(product.id),
          product,
          quantity: Math.min(quantity, product.stock),
        };
        updatedItems = [...state.items, newItem];
      }

      return {
        items: updatedItems,
        totalItems: calculateTotalItems(updatedItems),
        totalPrice: calculateTotalPrice(updatedItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      if (!action.payload?.productId || typeof action.payload?.quantity !== 'number') {
        return state;
      }

      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        const updatedItems = state.items.filter(item => item.product.id !== productId);
        return {
          items: updatedItems,
          totalItems: calculateTotalItems(updatedItems),
          totalPrice: calculateTotalPrice(updatedItems),
        };
      }

      const updatedItems = state.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      );

      return {
        items: updatedItems,
        totalItems: calculateTotalItems(updatedItems),
        totalPrice: calculateTotalPrice(updatedItems),
      };
    }

    case 'REMOVE_ITEM': {
      if (!action.payload?.productId) {
        return state;
      }

      const updatedItems = state.items.filter(
        item => item.product.id !== action.payload!.productId
      );

      return {
        items: updatedItems,
        totalItems: calculateTotalItems(updatedItems),
        totalPrice: calculateTotalPrice(updatedItems),
      };
    }

    case 'CLEAR_CART': {
      return initialState;
    }

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product, quantity: number) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity },
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity },
    });
  };

  const removeItem = (productId: number) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { productId },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value: CartContextType = {
    state,
    dispatch,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};