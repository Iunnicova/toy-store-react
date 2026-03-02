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
    const existingItem = cartItems.find((item) => item.toyId === toyId);
    if (!existingItem) return;
    try {
      if (existingItem) {
        // Если есть — увеличиваем quantity (PATCH)
        await fetch(`http://localhost:3001/cart/${existingItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quantity: existingItem.quantity + 1,
          }),
        });
      } else {
        //Если нет — добавляем новый (POST)
        await fetch('http://localhost:30016/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ toyId, quantity: 1 }),
        });
      }
      await loadCart(false); // Обновляем данные БЕЗ setLoading(true)
    } catch (err) {
      console.error('Ошибка с сервером:', err);
      setError('Ошибка при добавлении в корзину');
      alert('ВНИМАНИЕ: Ошибка случилась! Текст: ');
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
    }
  };

  return {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    toysInCart,
    error,
  };
};

//************* */
// export const useCartBasket = () => {
//   const [toysInCart, setToysInCart] = useState<ToyInCart[]>([]);
//   const [loading, setLoading] = useState(true); //загрузка установить загрузку
//   const [error, setError] = useState<string | null>(null);
//   const [cartItems, setCartItems] = useState<TCartItem[]>([]);
//   const { t } = useTranslation(); //хук перевода

//   //! 1. Функция загрузки только списка ID из корзины
//   const loadCart = async (isInitialLoad = false) => {
//     if (isInitialLoad) setLoading(true); // Включаем лоадер ТОЛЬКО при первой загрузке
//     setError(null); // сбрасываем старые ошибки

//     try {
//       const res = await fetch('http://localhost:3001/cart');

//       const data = await res.json();
//       setCartItems(data);
//     } catch (err) {
//       setError('Не удалось связаться с сервером. Проверьте, запущен ли он.');
//       console.error('Критическая ошибка:');
//     } finally {
//       if (isInitialLoad) setLoading(false);
//     }
//   };

//   //срабатывает один раз при загрузке страницы
//   useEffect(() => {
//     loadCart(true);
//   }, []);

//   //следит за изменениями в корзине при изменении cartItems
//  useEffect(() => {
//  let isMounted = true;

//     const fetchToys = async () => {
//       if (cartItems.length === 0) {
//         if (isMounted)setToysInCart([]);
//           // setError(null);
//         return;
//       }

//       //сервер
//       try {
//         const res = await fetch('http://localhost:3001/toys', {
//           signal: AbortSignal.timeout(3000), // таймаут, если сервер молчит 3 секунд → ошибка
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP ${res.status}: ${res.statusText}`);
//         }
//         const allToys: TToy[] = await res.json();

//         // Соединяем: для каждого элемента корзины находим игрушку
//         const merged = cartItems
//           .map((cartItem: CartItem) => {
//             const toy = allToys.find(
//               (toyItem) => toyItem.id === cartItem.toyId
//             );
//             return toy ? { ...toy, quantity: cartItem.quantity } : null;
//           })
//           .filter((item): item is ToyInCart => item !== null);

//         if (isMounted) {
//           setToysInCart(merged);
//           setError(null);
//         }
//       } catch (err) {
//         console.error('Ошибка загрузки игрушек для корзины:', err);
//         if (isMounted) {
//           // setError(
//           //   t('basket.loadError') || 'Не удалось загрузить товары корзины'
//           // );
//           setError('Не удалось загрузить товары корзины');
//         }
//       }
//     };
//     fetchToys();

//     return () => {
//       isMounted = false;
//     };
//   }, [cartItems]);

//   const isEmpty = toysInCart.length === 0;
//   // const totalCount = toysInCart.reduce((sum, item) => sum + item.quantity, 0);

//   const addToCart = async (toyId: number) => {
//     const existingItem = cartItems.find((item) => item.toyId === toyId);

//     if (existingItem) {
//       // Если есть — увеличиваем quantity (PATCH)
//       await fetch(`http://localhost:3001/cart/${existingItem.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           quantity: existingItem.quantity + 1,
//         }),
//       });
//     } else {
//       //Если нет — добавляем новый (POST)
//       await fetch('http://localhost:3001/cart', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ toyId, quantity: 1 }),
//       });
//     }

//     await loadCart(); // 🔥 refetch
//   };

//   //добавляем удаляем карточки корзина
//   const removeFromCart = async (toyId: number) => {
//     const existingItem = cartItems.find((item) => item.toyId === toyId);
//     if (!existingItem) return;

//     if (existingItem.quantity > 1) {
//       await fetch(`http://localhost:3001/cart/${existingItem.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           quantity: existingItem.quantity - 1,
//         }),
//       });
//     } else {
//       await fetch(`http://localhost:3001/cart/${existingItem.id}`, {
//         method: 'DELETE',
//       });
//     }

//     await loadCart(); // 🔥 всегда синхронизируемся с сервером
//   };

//   return {
//     cartItems,
//     loading,
//     addToCart,
//     removeFromCart,
//     toysInCart,
//     error,
//   };
// };
