import { useTranslation } from 'react-i18next';
import styles from './CharacteristicsProduct.module.scss';

import type { TCharacteristicsListProps } from './type';

export const CharacteristicsList = ({
  characteristics,
}: TCharacteristicsListProps) => {
  const { t } = useTranslation();

  return (
    <dl className={styles.characteristics}>
      {characteristics.map(({ label, value }) => (
        <div key={label} className={styles.row}>
          <dt>{t(`toys.characteristics.${label}`)} :</dt>
          <div className={styles.line}></div>
          <dd className={styles.value}>
            {typeof value === 'string' && value.startsWith('toys.')
              ? t(value)
              : value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
