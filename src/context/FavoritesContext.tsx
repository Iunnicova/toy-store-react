import { useFavorites } from '@/hooks/useFavorites';
import { createContext, useContext } from 'react';

//Создаём "ящик" (контекст), в который будем класть данные корзины
const FavoritesContext = createContext<ReturnType<typeof useFavorites> | null>(
  null
);

// Создаём компонент-обёртку, который будет "раздавать" данные всем детям
export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const favoritesData = useFavorites();
  return (
    <FavoritesContext.Provider value={favoritesData}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Создаём функцию, чтобы дети могли легко взять данные
export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext); // спрашиваем: "что лежит в ящике?"

  if (!context) {
    throw new Error(
      'useFavoritesContext must be used inside FavoritesProvider'
    );
  }

  return context;
};

// //Создаём "ящик" (контекст), в который будем класть данные корзины
// const FavoritesContext = createContext<ReturnType<typeof useFavorites> | null>(
//   null
// );

// // Создаём компонент-обёртку, который будет "раздавать" данные всем детям
// export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const value = useFavorites();

//   return (
//     <FavoritesContext.Provider value={value}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// // Создаём функцию, чтобы дети могли легко взять данные
// export const useFavoritesContext = () => {
//   const ctx = useContext(FavoritesContext); // спрашиваем: "что лежит в ящике?"

//   if (!ctx) {
//     throw new Error(
//       'useFavoritesContext must be used inside FavoritesProvider'
//     );
//   }

//   return ctx;
// };
