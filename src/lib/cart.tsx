import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';

export type CartItem = {
  id: string;
  restaurantSlug: string;
  restaurantName: string;
  name: string;
  price: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  restaurantSlug: string | null;
};

type Action =
  | { type: 'ADD'; item: Omit<CartItem, 'qty'> }
  | { type: 'REMOVE'; id: string }
  | { type: 'INC'; id: string }
  | { type: 'DEC'; id: string }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; state: CartState };

const initial: CartState = { items: [], restaurantSlug: null };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      // Single-restaurant cart: clear if switching restaurants
      const wrong = state.restaurantSlug && state.restaurantSlug !== action.item.restaurantSlug;
      const baseItems = wrong ? [] : state.items;
      const exists = baseItems.find((i) => i.id === action.item.id);
      const items = exists
        ? baseItems.map((i) => (i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...baseItems, { ...action.item, qty: 1 }];
      return { items, restaurantSlug: action.item.restaurantSlug };
    }
    case 'REMOVE': {
      const items = state.items.filter((i) => i.id !== action.id);
      return { items, restaurantSlug: items.length ? state.restaurantSlug : null };
    }
    case 'INC':
      return { ...state, items: state.items.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i)) };
    case 'DEC':
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: Math.max(0, i.qty - 1) } : i))
          .filter((i) => i.qty > 0),
      };
    case 'CLEAR':
      return initial;
    case 'HYDRATE':
      return action.state;
    default:
      return state;
  }
}

const CartCtx = createContext<{
  state: CartState;
  add: (item: Omit<CartItem, 'qty'>) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  total: number;
  count: number;
} | null>(null);

const STORAGE_KEY = 'donhalls.cart.v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', state: JSON.parse(raw) });
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { /* noop */ }
  }, [state]);

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartCtx.Provider
      value={{
        state,
        add: (item) => dispatch({ type: 'ADD', item }),
        remove: (id) => dispatch({ type: 'REMOVE', id }),
        inc: (id) => dispatch({ type: 'INC', id }),
        dec: (id) => dispatch({ type: 'DEC', id }),
        clear: () => dispatch({ type: 'CLEAR' }),
        total,
        count,
      }}
    >
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
