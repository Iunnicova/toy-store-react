import classNames from 'classnames';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HeartIcon } from '@/components/svg/HeartIcon';
import { getCharacteristics } from '@/constants/kharacteristic';
import {
  Button,
  CharacteristicsList,
  DescriptionProduct,
  ImageZoom,
  ModalFooter,
  ModalOverlay,
  ModalPortal,
} from '../index';

import { TModalDescriptionToyProps } from './type';
import styles from './ModalDescriptionToy.module.scss';

export const ModalDescriptionToy = memo(
  ({ title, onClose, toyImage, toy }: TModalDescriptionToyProps) => {
    const characteristics = getCharacteristics(toy.characteristic);
    const [isZoomed, setIsZoomed] = useState(false);
    const { t } = useTranslation(); //хук для перевода

    useEffect(() => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }, []);

    //Закрытие по Esc
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Чистка при закрытии модалки, чтобы не было утечек памяти
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [onClose]);

    return (
      <ModalPortal>
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
                <CharacteristicsList characteristics={characteristics} />
                <DescriptionProduct toy={toy} />
              </div>
              <ModalFooter toy={toy} />
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
      </ModalPortal>
    );
  }
);

//! memo //оптимизирует компонент, чтобы не перерисовывался без нужды

// Внутри компонента ModalDescriptionToy нельзя рендерить <ModalDescriptionToy> — это создаёт бесконечную рекурсию.
// Вся логика отображения модалки должна быть в родителе в Layout.
