import styles from './Search.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { Input } from '../Input';
import { SearchIcon } from '../../svg/SearchIcon';
import { useTranslation } from 'react-i18next';

export const Search = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.search}>
      <h2 className={styles.searchTitle}>{t('search.title')}</h2>
      <div className={styles.searchBox}>
        <Input type="text" placeholder={t('search.placeholder')} />
        <Link to="/">
          <Button
            variant="headerButton"
            onClick={() => alert('Поиск')}
            className={styles.button}
          >
            <SearchIcon className={styles.icon} />
            <span className={styles.count}>{t('search.button')}</span>
          </Button>
        </Link>
      </div>
    </section>
  );
};
