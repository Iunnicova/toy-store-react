import { SearchIcon } from '@/components/svg/SearchIcon';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button';
import { InputToy } from '../InputToy';
import styles from './Search.module.scss';

type TSearchProps = {
  onSearchInput: (value: string) => void; // Говорим, что это функция, принимающая строку
};

export const Search = (props: TSearchProps) => {
  const { onSearchInput } = props;

  const { t } = useTranslation();
  return (
    <section className={styles.search}>
      <h2 className={styles.searchTitle}>{t('search.title')}</h2>
      <div className={styles.searchBox}>
        <InputToy
          type="text"
          placeholder={t('search.placeholder')}
          onInput={(event) => onSearchInput(event.currentTarget.value)}
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
