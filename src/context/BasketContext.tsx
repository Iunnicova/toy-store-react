import { useCartBasket } from '@/hooks/useCartBasket/useCartBasket';
import { createContext, useContext } from 'react';

//Создаём "ящик" (контекст), в который будем класть данные корзины
const BasketContext = createContext<ReturnType<typeof useCartBasket> | null>(
  null
);

// Создаём компонент-обёртку, который будет "раздавать" данные всем детям
export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cart = useCartBasket(); // берём все данные корзины

  return (
    <BasketContext.Provider value={cart}>{children}</BasketContext.Provider>
  );
};

// Создаём функцию, чтобы дети могли легко взять данные
export const useCartContext = () => {
  const ctx = useContext(BasketContext); // спрашиваем: "что лежит в ящике?"

  if (!ctx) {
    throw new Error('useCartContext must be used inside BasketProvider');
  }

  return ctx; //отдаём всё, что там было
};
