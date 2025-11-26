import styles from './ModalDescriptionToy.module.scss';
import { memo, useState } from 'react';

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

    return (
      <>
        <ModalOverlay onClick={onClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* HEADER */}
            <div className={styles.header}>
              <Button variant="like" onClick={(e) => e.stopPropagation()}>
                <HeartIcon className={styles.heartIconCards} />
              </Button>
              <h2 className={styles.titleModal}>{title}</h2>
              <Button
                variant="toggle"
                className={classNames(styles.close, styles.button)}
                onClick={onClose}
              >
                X
              </Button>
            </div>

            {/* CONTENT */}
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
                    <dt>{label} :</dt>
                    <div className={styles.line}></div>
                    <dd className={styles.value}>{value}</dd>
                  </div>
                ))}
              </dl>

              {/* ОПИСАНИЕ */}
              <div className={styles.description}>
                <p className={styles.textDescription}>
                  <span className={styles.label}>Описание:</span>{' '}
                  {toy.descriptionKey ?? ''}
                </p>
                <p className={styles.additionalDescription}>
                  Подходит для игр, сна, украшения комнаты и как антистресс.
                  Игрушка легко стирается и сохраняет форму — мамы оценят!
                  Прекрасный подарок на день рождения, праздник или просто для
                  радости.
                </p>
              </div>
            </div>

            {/* ЦЕНА + КОРЗИНА */}
            <div className={styles.priceBasket}>
              <p className={styles.priceModal}>
                Цена: {toy.price.toLocaleString('ru-RU')}
              </p>
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

// <div className={styles.modalContent}>
//   <div className={styles.topContent}>

//     <img
//       src={toy.toyImage}
//       alt={toy.title}
//       className={styles.toyImage}
//     />

//     <div className={styles.characteristics}>
//       <p>Цена: {toy.price.toLocaleString('ru-RU')} ₽</p>
//       <p>Размер: {toy.characteristic.size} см</p>
//       <p>Материал: {toy.characteristic.material}</p>
//       <p>Наполнитель: {toy.characteristic.filler}</p>
//       <p>Возраст: {toy.characteristic.age}</p>
//       <p>Упаковка: {toy.characteristic.packaging}</p>
//     </div>
//   </div>

//   {/* Нижний блок: описание */}
//   <div className={styles.description}>
//     <p>{`Описание: ${toy.description ?? ''} Подходит для игр, сна, украшения комнаты и как антистресс. Игрушка легко стирается и сохраняет форму — мамы оценят! Прекрасный подарок на день рождения, праздник или просто для радости.`}</p>
//   </div>
// </div>
