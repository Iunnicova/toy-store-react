import favorites1 from '@images/favorites1.png';
import { Button, Cards } from '@/components/ui';
import { TToy } from '@/types/toysData';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './FavoritesPage.module.scss';
import { useFavorites } from '@/hooks/useFavorites';

// export const useFavorites = () => {
//   const [favorites] = useState<TToy[]>([]); // пока пусто для теста
//   return favorites;
// };

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { t } = useTranslation(); //хук перевода

  return (
    <section className={styles.favorites}>
      {favorites.length === 0 ? (
        // ПУСТОЕ СОСТОЯНИЕ — когда ничего нет
        <>
          <h1 className={styles.title}>{t('favorites.notAdded')}</h1>

          <img
            className={styles.imgFavorites}
            src={favorites1}
            alt="Лисёнок грустит в пустой коробке"
          />
          <p className={styles.text}>{t('favorites.justClick')}</p>
          <Link
            to="/"
            className={styles.homeLink}
            aria-label="Перейти на главную страницу"
          >
            <Button variant="headerButton" className={styles.homeButton}>
              <p className={styles.count}>{t('favorites.homeButton')}</p>
            </Button>
          </Link>
        </>
      ) : (
        // ЕСТЬ ТОВАРЫ — показываем карточки
        <div className={styles.cardsGrid}>
          {favorites.map((toy) => (
            <Cards
              key={toy.id}
              toy={toy}
              onCardClick={() => {}} // заглушка — на странице избранного модалка не нужна
            />
          ))}
        </div>
      )}
    </section>
  );
};

// export const useFavorites = () => {
//   const [favorites] = useState<TToy[]>([]); // пока пусто для теста
//   return favorites;
// };

// export const FavoritesPage = () => {
//   const favorites = useFavorites();
//   const { t } = useTranslation(); //хук перевода
//   return (
//     <section className={styles.favorites}>
//       {favorites.length === 0 ? (
//         // ПУСТОЕ СОСТОЯНИЕ — когда ничего нет
//         <>
//           <h1 className={styles.title}>{t('favorites.notAdded')}</h1>

//           <img
//             className={styles.imgFavorites}
//             src={favorites1}
//             alt="Лисёнок грустит в пустой коробке"
//           />
//           <p className={styles.text}>{t('favorites.justClick')}</p>
//           <Link
//             to="/"
//             className={styles.homeLink}
//             aria-label="Перейти на главную страницу"
//           >
//             <Button variant="headerButton" className={styles.homeButton}>
//               <p className={styles.count}>{t('favorites.homeButton')}</p>
//             </Button>
//           </Link>
//         </>
//       ) : (
//         // ЕСТЬ ТОВАРЫ — показываем карточки
//         <div className={styles.cardsGrid}>
//           {favorites.map((toy) => (
//             <Cards
//               key={toy.id}
//               toy={toy}
//               onCardClick={() => {}} // заглушка — на странице избранного модалка не нужна
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };
