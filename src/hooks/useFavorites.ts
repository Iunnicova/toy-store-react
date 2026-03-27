import { TToy } from '@/types/toysData';
import { useCallback, useEffect, useState } from 'react';

export type TFavoriteItem = TToy & {
  id: number;
  toyId: number;
  price?: number;
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<TFavoriteItem[]>([]);
  const [loading, setLoading] = useState(true); //загрузка установить загрузку

  const loadFavorites = async (isInitialLoad = false) => {
    if (isInitialLoad) setLoading(true); // Включаем лоадер ТОЛЬКО при первой загрузке
    const res = await fetch('http://localhost:3001/favorites');
    const data = await res.json();
    setFavorites(data);

    if (isInitialLoad) setLoading(false);
  };

  useEffect(() => {
    loadFavorites(true);
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
