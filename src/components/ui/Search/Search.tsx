import { SearchIcon } from '@/components/svg/SearchIcon';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button';
import { InputToy } from '../InputToy';
import styles from './Search.module.scss';

type TSearchProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export const Search = (props: TSearchProps) => {
  //поиск
  const {
    // onSearchInput
    searchQuery,
    setSearchQuery,
  } = props;

  const { t } = useTranslation();
  return (
    <section className={styles.search}>
      <h2 className={styles.searchTitle}>{t('search.title')}</h2>
      <div className={styles.searchBox}>
        <InputToy
          type="text"
          placeholder={t('search.placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          // onInput={(event) => onSearchInput(event.currentTarget.value)}
        />
        <Button
          variant="primary"
          onClick={() => alert('Поиск')}
          className={styles.button}
        >
          <SearchIcon className={styles.icon} />
          <span className={styles.count}>{t('search.button')}</span>
        </Button>
      </div>
    </section>
  );
};
