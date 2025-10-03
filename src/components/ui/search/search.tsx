import styles from './search.module.scss';
import searchIcon from '/icon/search.svg';
import { NavLink } from 'react-router-dom';
import { Button } from '../button';

export const Search = () => (
  <section className={styles.search}>
    <h2 className={styles.searchTitle}>Найди свою любимку!</h2>

    <div className={styles.searchBox}>
      <input
        className={styles.input}
        type="search"
        placeholder="Напиши моё имя"
      />

      <NavLink to="/">
        <Button onClick={() => alert('Поиск')} className={styles.button}>
          <img src={searchIcon} alt="Поиск" className={styles.icon} />
          <span className={styles.count}>Поиск</span>
        </Button>
      </NavLink>
    </div>
  </section>
);
