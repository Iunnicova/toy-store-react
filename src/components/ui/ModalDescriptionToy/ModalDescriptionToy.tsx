import classNames from 'classnames';
import React from 'react';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BasketIcon } from '@/components/svg/BasketIcon';
import { HeartIcon } from '@/components/svg/HeartIcon';
import { getCharacteristics } from '@/constants/сharacteristic';
import { useCartContext } from '@/context/CartContex';
import {
  Button,
  CharacteristicsList,
  Counter,
  DescriptionProduct,
  ImageZoom,
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

    //!для изменения значка корзины
    const { cartItems, addToCart, removeFromCart } = useCartContext();
    const cartItem = cartItems.find((item) => item.toyId === toy.id); //Проверка: есть ли текущая игрушка (toy.id) уже в корзине.
    const quantity = cartItem?.quantity ?? 0;

    const add = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      addToCart(toy.id);
    };

    const remove = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      removeFromCart(toy.id);
    };

    // Блокируем скролл, когда модалка на экране
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

              {/* ЦЕНА + КОРЗИНА */}
              <div className={styles.priceBasket}>
                <span className={styles.priceModal}>
                  {t('toys.common.priceLabel')}:
                  <strong className={styles.price}>
                    {toy.price.toLocaleString('ru-RU')}
                  </strong>
                </span>
                {quantity === 0 ? (
                  <Button className={styles.button} onClick={add}>
                    <BasketIcon className={styles.icon} />
                  </Button>
                ) : (
                  <Counter
                    className={styles.counter}
                    value={quantity}
                    onIncrement={add}
                    onDecrement={remove}
                  />
                )}
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
      </ModalPortal>
    );
  }
);

//! memo //оптимизирует компонент, чтобы не перерисовывался без нужды

// Внутри компонента ModalDescriptionToy нельзя рендерить <ModalDescriptionToy> — это создаёт бесконечную рекурсию.
// Вся логика отображения модалки должна быть в родителе в Layout.
