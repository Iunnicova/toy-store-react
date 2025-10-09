import styles from './search.module.scss';
import searchIcon from '/icon/search.svg';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { Input } from '../Input';

export const Search = () => (
  <section className={styles.search}>
    <h2 className={styles.searchTitle}>Найди свою любимку!</h2>
    <div className={styles.searchBox}>
      <Input type="text" placeholder="Напиши моё имя" />
      <Link to="/">
        <Button onClick={() => alert('Поиск')} className={styles.button}>
          <img src={searchIcon} alt="Поиск" className={styles.icon} />
          <span className={styles.count}>Поиск</span>
        </Button>
      </Link>
    </div>
  </section>
);
