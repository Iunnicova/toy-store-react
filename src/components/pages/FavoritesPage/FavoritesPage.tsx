import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  return (
    <div className={styles.favorites}>
      <h1>Вы ещё не добавили товары в избранное.</h1>
      <p>
        Просто нажмите ❤️, чтобы сохранить понравившиеся и вернуться к ним
        позже.
      </p>
    </div>
  );
};
