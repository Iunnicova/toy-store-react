import { TToy } from '@/types/toysData';
import { useCallback, useEffect, useState } from 'react';

// export type TFavoriteItem = TToy &{
//   id: number;
//   toyId: number;
//   price?: number;
// };

// // Хук избранного — полный и безопасный
// export const useFavorites = () => {
//   const [favorites, setFavorites] = useState<TFavoriteItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Загрузка избранного + merge с игрушками
//   const loadFavorites = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // 1. Получаем избранное (только toyId + id записи)
//       const resFav = await fetch('http://localhost:3001/favorites', {
//         signal: AbortSignal.timeout(8000),
//       });
//       if (!resFav.ok) throw new Error(`Favorites: ${resFav.status}`);

//       const favData: { id: number; toyId: number }[] = await resFav.json();

//       // 2. Получаем все игрушки
//       const resToys = await fetch('http://localhost:3001/toys', {
//         signal: AbortSignal.timeout(8000),
//       });
//       if (!resToys.ok) throw new Error(`Toys: ${resToys.status}`);

//       const allToys: TToy[] = await resToys.json();

//       // 3. Объединяем
//       const merged = favData
//         .map(fav => {
//           const toy = allToys.find(t => t.id === fav.toyId);
//           return toy ? { ...toy, id: fav.id } : null;
//         })
//         .filter((t): t is TFavoriteItem => t !== null);

//       setFavorites(merged);
//     } catch (err: any) {
//       console.error('Ошибка загрузки избранного:', err);
//       setError('Не удалось загрузить избранное');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Первичная загрузка
//   useEffect(() => {
//     loadFavorites();
//   }, [loadFavorites]);

//   // Добавление в избранное (оптимистично + откат при ошибке)
//   const addToFavorites = useCallback(async (toyId: number) => {
//     // Оптимистично добавляем (чтобы UI обновился сразу)
//     setFavorites(prev => {
//       if (prev.some(f => f.toyId === toyId)) return prev; // уже есть
//       // Временный объект — потом заменится реальными данными
//       return [...prev, { id: Date.now(), toyId, price: 0 } as TFavoriteItem];
//     });

//     try {
//       const res = await fetch('http://localhost:3001/favorites', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ toyId }),
//       });

//       if (!res.ok) throw new Error('Не удалось добавить');

//       await loadFavorites(); // синхронизируем с сервером
//     } catch (err) {
//       console.error('Ошибка добавления:', err);
//       // Откат — убираем временный элемент
//       setFavorites(prev => prev.filter(f => f.toyId !== toyId));
//     }
//   }, [loadFavorites]);

//   // Удаление из избранного (тоже оптимистично)
//   const removeFromFavorites = useCallback(async (toyId: number) => {
//     // Оптимистично удаляем
//     setFavorites(prev => prev.filter(f => f.toyId !== toyId));

//     try {
//       const item = favorites.find(f => f.toyId === toyId);
//       if (!item) return;

//       const res = await fetch(`http://localhost:3001/favorites/${item.id}`, {
//         method: 'DELETE',
//       });

//       if (!res.ok) throw new Error('Не удалось удалить');

//       await loadFavorites(); // синхронизируем
//     } catch (err) {
//       console.error('Ошибка удаления:', err);
//       // Откат — возвращаем обратно (если нужно)
//       await loadFavorites();
//     }
//   }, [favorites, loadFavorites]);

//   return {
//     favorites,
//     loading,
//     error,
//     addToFavorites,
//     removeFromFavorites,
//   };
// };

export type TFavoriteItem = TToy & {
  id: number;
  toyId: number;
  price?: number;
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<TFavoriteItem[]>([]);
  const loadFavorites = async () => {
    const res = await fetch('http://localhost:3001/favorites');
    const data = await res.json();
    setFavorites(data);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const addToFavorites = async (toyId: number) => {
    await fetch('http://localhost:3001/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toyId }),
    });

    await loadFavorites();
  };

  const removeFromFavorites = async (toyId: number) => {
    const item = favorites.find((f) => f.toyId === toyId);
    if (!item) return;

    await fetch(`http://localhost:3001/favorites/${item.id}`, {
      method: 'DELETE',
    });

    await loadFavorites();
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };
};
