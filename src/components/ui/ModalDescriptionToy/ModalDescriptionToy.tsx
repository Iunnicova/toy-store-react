import styles from './ModalDescriptionToy.module.scss';
import { memo, useEffect, useState } from 'react';

// import heartIconCards from '/icon/heart.svg';
import basketIcon from '/icon/basket.svg';
import { ModalOverlay } from '../ModalOverlay';
import { Button } from '../Button';
import { TModalDescriptionToyProps } from './type';
import classNames from 'classnames';
import { getCharacteristics } from '../../../constants/сharacteristic';
import { HeartIcon } from '../../svg/HeartIcon';
import { BasketIcon } from '../../svg/BasketIcon';
import { ImageZoom } from '../ImageZoom';
import { useTranslation } from 'react-i18next';

export const ModalDescriptionToy = memo(
  ({ title, onClose, toyImage, toy }: TModalDescriptionToyProps) => {
    const characteristics = getCharacteristics(toy.characteristic);
    const [isZoomed, setIsZoomed] = useState(false);

    const { t } = useTranslation(); //хук для перевода

    // Блокируем скролл, когда модалка на экране
    useEffect(() => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }, []);

    return (
      <>
        <ModalOverlay onClick={onClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* HEADER */}
            <div className={styles.header}>
              <Button variant="like" onClick={(e) => e.stopPropagation()}>
                <HeartIcon className={styles.heartIconCards} />
              </Button>
              <h2 className={styles.titleModal}>{t(toy.titleKey)}</h2>
              <Button
                variant="toggle"
                className={classNames(styles.close, styles.button)}
                onClick={onClose}
              >
                X
              </Button>
            </div>

            <div className={styles.modalContent}>
              {/* КЛИК → ЗУМ */}
              <img
                src={toyImage}
                alt={title}
                className={styles.image}
                onClick={() => setIsZoomed(true)}
                style={{ cursor: 'zoom-in' }}
              />

              {/* ХАРАКТЕРИСТИКИ */}
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

              {/* ОПИСАНИЕ */}
              <div className={styles.description}>
                <p className={styles.textDescription}>
                  <span className={styles.label}>
                    {t('toys.common.description')}:
                  </span>{' '}
                  {toy.descriptionKey ? t(toy.descriptionKey) : ''}
                </p>
                <p className={styles.additionalDescription}>
                  {t('toys.common.additionalDescription')}
                </p>
              </div>
            </div>

            {/* ЦЕНА + КОРЗИНА */}
            <div className={styles.priceBasket}>
              <span className={styles.priceModal}>
                {t('toys.common.priceLabel')}:
                <strong className={styles.price}>
                  {toy.price.toLocaleString('ru-RU')}
                </strong>
              </span>
              <Button
                className={styles.button}
                onClick={() => alert('Добавлено в корзину')}
              >
                <BasketIcon className={styles.icon} />
              </Button>
            </div>
          </div>
        </ModalOverlay>

        {/* ЗУМ */}
        <ImageZoom
          src={toyImage}
          alt={title}
          isOpen={isZoomed}
          onClose={() => setIsZoomed(false)}
        />
      </>
    );
  }
);

//! memo //оптимизирует компонент, чтобы не перерисовывался без нужды

// Внутри компонента ModalDescriptionToy нельзя рендерить <ModalDescriptionToy> — это создаёт бесконечную рекурсию.
// Вся логика отображения модалки должна быть в родителе в Layout.
