// import { ToyInCart } from '@/components/pages/BasketPage/type';
import { TToy } from '@/types/toysData';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addToCartApi, getCartApi, removeFromCartApi } from '@/api/toyCardsApi';

export type TCartItem = {
  id: number;
  toyId: number;
  price: number;
  quantity: number;
};

export type ToyInCart = TToy & {
  quantity: number;
};

export const useCartBasket = () => {
  const { t } = useTranslation(); //хук перевода

  const [toysInCart, setToysInCart] = useState<ToyInCart[]>([]);
  const [loading, setLoading] = useState(true); //загрузка установить загрузку
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);

  //! 1. Загрузка списка корзины (только ID)
  const loadCart = useCallback(async (isInitialLoad = false) => {
    if (isInitialLoad) setLoading(true); // Включаем лоадер ТОЛЬКО при первой загрузке

    try {
      const res = await fetch('http://localhost:3001/cart');
      if (!res.ok) throw new Error('Не удалось загрузить корзину');

      const data: TCartItem[] = await res.json();
      setCartItems(data);
      setError(null); // сбрасываем старые ошибки
    } catch (err) {
      setError('Не удалось связаться с сервером. Проверьте, запущен ли он.');
      console.error('Критическая ошибка:', err);
    } finally {
      if (isInitialLoad) setLoading(false);
    }
  }, []);

  //!для автоматического удаления ошибки через 3 секунды
  //   useEffect(() => {
  //   if (error) {
  //     const timer = setTimeout(() => {
  //       setError(null);
  //     }, 3000); // Ошибка исчезнет сама через 3 секунды

  //     return () => clearTimeout(timer); //чистим таймер если ошибка изменилась
  //   }
  // }, [error]);

  //! 2.ПЕРВАЯ загрузки (срабатывает 1 раз при входе)
  useEffect(() => {
    loadCart(true);
  }, [loadCart]);

  //! 3. загрузка данных об игрушках (срабатывает при изменении cartItems)
  useEffect(() => {
    let isMounted = true;

    const fetchToys = async () => {
      if (cartItems.length === 0) {
        if (isMounted) setToysInCart([]);
        return;
      }

      try {
        const res = await fetch('http://localhost:3001/toys');
        // signal: AbortSignal.timeout(8000), // таймаут, если сервер молчит 3 секунд → ошибка
        if (!res.ok) throw new Error();
        const allToys: TToy[] = await res.json();

        const merged = cartItems
          .map((cartItem) => {
            const toy = allToys.find(
              (toyItem) => toyItem.id === cartItem.toyId
            );
            return toy ? { ...toy, quantity: cartItem.quantity } : null;
          })
          .filter((item): item is ToyInCart => item !== null);

        if (isMounted) {
          setToysInCart(merged);
          // setError(null);
        }
      } catch (err) {
        console.error('Ошибка загрузки игрушек для корзины:', err);
        if (isMounted) {
          setError(
            t('error.loadError') || 'Не удалось загрузить товары корзины'
          );
        }
      }
    };
    fetchToys();

    return () => {
      isMounted = false;
    };
  }, [cartItems]); // Следим за изменениями в корзине

  //! 3. Добавление в корзину
  const addToCart = useCallback(
    async (toyId: number) => {
      try {
        const existingItem = cartItems.find((item) => item.toyId === toyId);

        if (existingItem) {
          // Увеличиваем количество
          await fetch(`http://localhost:3001/cart/${existingItem.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: existingItem.quantity + 1 }),
          });
        } else {
          // Добавляем новый товар
          await fetch('http://localhost:3001/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ toyId, quantity: 1 }),
          });
        }

        await loadCart(); // обновляем список корзины
      } catch (err) {
        console.error('Ошибка при добавлении в корзину:', err);
        setError('Не удалось добавить товар в корзину');
      }
    },
    [cartItems, loadCart]
  );

  // ! 4. Удаление из корзины по одной карточке
  const removeFromCart = useCallback(
    async (toyId: number) => {
      try {
        const existingItem = cartItems.find((item) => item.toyId === toyId);
        if (!existingItem) return;

        if (existingItem.quantity > 1) {
          // Уменьшаем количество
          await fetch(`http://localhost:3001/cart/${existingItem.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: existingItem.quantity - 1 }),
          });
        } else {
          // Удаляем полностью
          await fetch(`http://localhost:3001/cart/${existingItem.id}`, {
            method: 'DELETE',
          });
        }

        await loadCart();
      } catch (err) {
        console.error('Ошибка при удалении из корзины:', err);
        setError('Не удалось удалить товар из корзины');
      }
    },
    [cartItems, loadCart]
  );

  //!удаляем всю карточку целиком
  const deleteCartItem = async (toyId: number) => {
    try {
      const existingItem = cartItems.find((item) => item.toyId === toyId);
      if (!existingItem) return;

      await fetch(`http://localhost:3001/cart/${existingItem.id}`, {
        method: 'DELETE',
      });

      await loadCart();
    } catch {
      setError('Ошибка удаления');
    }
  };

  return {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    toysInCart,
    error,
    setError,
    deleteCartItem,
  };
};
