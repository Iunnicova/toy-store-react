import { ToyInCart, CartItem } from '@/components/pages/BasketPage/type';
import { TToy } from '@/types/toysData';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import styles from './useCartBasket.module.scss';
import { useTranslation } from 'react-i18next';

export type TCartItem = {
  id: number;
  toyId: number;
  price: number;
  quantity: number;
};

//cartItems — массив товаров в корзине
//TCartItem[] — тип (TypeScript)
//[] — изначально корзина пустая
//loading = true → корзина ещё загружается
//loading = false → корзина готова
//finally — «сделай в любом случае»

export const useCartBasket = () => {
  const [toysInCart, setToysInCart] = useState<ToyInCart[]>([]);
  const [loading, setLoading] = useState(true); //загрузка установить загрузку
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);
  const { t } = useTranslation(); //хук перевода

  //! 1. Функция загрузки только списка ID из корзины
  const loadCart = async (isInitialLoad = false) => {
    if (isInitialLoad) setLoading(true); // Включаем лоадер ТОЛЬКО при первой загрузке

    try {
      const res = await fetch('http://localhost:3001/cart');
      if (!res.ok) throw new Error();

      const data = await res.json();
      setCartItems(data);
      setError(null); // сбрасываем старые ошибки
    } catch (err) {
      setError('Не удалось связаться с сервером. Проверьте, запущен ли он.');
      console.error('Критическая ошибка:');
    } finally {
      if (isInitialLoad) setLoading(false);
    }
  };

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
  }, []);

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
          setError(null);
        }
      } catch (err) {
        console.error('Ошибка загрузки игрушек для корзины:', err);
        if (isMounted) {
          // setError(
          //   t('basket.loadError') || 'Не удалось загрузить товары корзины'
          // );
          setError('Не удалось загрузить товары корзины');
        }
      }
    };
    fetchToys();

    return () => {
      isMounted = false;
    };
  }, [cartItems]); // Следим за изменениями в корзине

  //! 4. добавления  (без прыжков лоадера)
  const addToCart = async (toyId: number) => {
    setError(null);
    const existingItem = cartItems.find((item) => item.toyId === toyId);

    try {
      setError(null);
      const url = existingItem
        ? `http://localhost:3001/cart/${existingItem.id}`
        : `http://localhost:3001/cart`;

      const res = await fetch(url, {
        method: existingItem ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          existingItem
            ? { quantity: existingItem.quantity + 1 }
            : { toyId, quantity: 1 }
        ),
      });

      if (!res.ok) throw new Error('Ошибка сервера');

      await loadCart(false); // Обновляем данные БЕЗ setLoading(true)
    } catch (err) {
      console.error('Ошибка с сервером:', err);
      setError('Ошибка при добавлении в корзину');
      // alert("Ошибка на экране: Ошибка при добавлении в корзину");
    }
  };

  //!5.удаляем карточки корзина
  const removeFromCart = async (toyId: number) => {
    const existingItem = cartItems.find((item) => item.toyId === toyId);
    if (!existingItem) return;
    try {
      //ошибка при удалении одной единицы в карточке
      if (existingItem.quantity > 1) {
        await fetch(`http://localhost:3001/cart/${existingItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quantity: existingItem.quantity - 1,
          }),
        });
        //ошибка при удалении всей карточки
      } else {
        await fetch(`http://localhost:3001/cart/${existingItem.id}`, {
          method: 'DELETE',
        });
      }
      await loadCart(false);
    } catch (err) {
      setError('Ошибка при удалении');
      console.error('Ошибка с сервером:', err);
      // alert('Ошибка на экране: Ошибка при удалении из корзины');
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
  };
};

//************* */
