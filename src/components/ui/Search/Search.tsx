import styles from './Search.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { Input } from '../Input';
import { SearchIcon } from '../../svg/SearchIcon';

export const Search = () => (
  <section className={styles.search}>
    <h2 className={styles.searchTitle}>Найди свою любимку!</h2>
    <div className={styles.searchBox}>
      <Input type="text" placeholder="Напиши моё имя" />
      <Link to="/">
        <Button onClick={() => alert('Поиск')} className={styles.button}>
          <SearchIcon className={styles.icon} />
          <span className={styles.count}>Поиск</span>
        </Button>
      </Link>
    </div>
  </section>
);
