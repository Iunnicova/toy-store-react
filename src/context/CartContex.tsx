import { useCart } from '@/hooks/useCart';
import { createContext, useContext } from 'react';
// import { useCart } from '../hooks/useCart';

interface CartProviderProps {
  children: React.ReactNode;
}

//Создаём "ящик" (контекст), в который будем класть данные корзины
const CartContext = createContext<ReturnType<typeof useCart> | null>(null);

// Создаём компонент-обёртку, который будет "раздавать" данные всем детям
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cart = useCart(); // берём все данные корзины

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

// Создаём функцию, чтобы дети могли легко взять данные
export const useCartContext = () => {
  const ctx = useContext(CartContext); // спрашиваем: "что лежит в ящике?"

  if (!ctx) {
    throw new Error('useCartContext must be used inside CartProvider');
  }

  return ctx; //отдаём всё, что там было
};
