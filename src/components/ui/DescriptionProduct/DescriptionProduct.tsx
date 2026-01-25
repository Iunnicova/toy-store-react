import { useTranslation } from 'react-i18next';
import { TDescriptionProductProps } from './type';
import styles from './DescriptionProduct.module.scss';

export const DescriptionProduct = ({ toy }: TDescriptionProductProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.description}>
      <p className={styles.textDescription}>
        <span className={styles.label}>{t('toys.common.description')}:</span>{' '}
        {toy.descriptionKey ? t(toy.descriptionKey) : ''}
      </p>
      <p className={styles.additionalDescription}>
        {t('toys.common.additionalDescription')}
      </p>
    </div>
  );
};
