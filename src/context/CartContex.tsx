import { useCartBasket } from '@/hooks/useCartBasket';
import { createContext, useContext } from 'react';

//Создаём "ящик" (контекст), в который будем класть данные корзины
const CartContext = createContext<ReturnType<typeof useCartBasket> | null>(null);

// Создаём компонент-обёртку, который будет "раздавать" данные всем детям
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cart = useCartBasket(); // берём все данные корзины

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
