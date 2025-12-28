import { useEffect, useState } from 'react';

export type TCartItem = {
  id?: number;
  toyId: number;
  price: number;
  quantity: number;
};

//cartItems — массив товаров в корзине
//TCartItem[] — тип (TypeScript)
//[] — изначально корзина пустая
//loading = true → корзина ещё загружается
//loading = false → корзина готова
export const useCart = () => {
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    const res = await fetch('http://localhost:3001/cart');
    const data = await res.json();
    setCartItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (toyId: number) => {
    const existingItem = cartItems.find((item) => item.toyId === toyId);

    if (existingItem) {
      // Если есть — увеличиваем quantity (PATCH)
      await fetch(`http://localhost:3001/cart/${existingItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: existingItem.quantity + 1 }),
      });
    } else {
      //Если нет — добавляем новый (POST)
      await fetch('http://localhost:3001/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toyId, quantity: 1 }),
      });
    }

    await loadCart(); // 🔥 refetch
  };

  return {
    cartItems,
    loading,
    addToCart,
  };
};

// возвращаем API своего хука:
// cartItems → данные
// loading → состояние
// refetch → перезагрузить корзину
// 🔥 refetch —  данные устарели — обнови их СЕЙЧАС
