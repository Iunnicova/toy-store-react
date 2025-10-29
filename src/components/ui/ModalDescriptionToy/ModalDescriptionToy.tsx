import styles from './ModalDescriptionToy.module.scss';
import { memo } from 'react';

// import heartIconCards from '/icon/heart.svg';
import basketIcon from '/icon/basket.svg';
import { ModalOverlay } from '../ModalOverlay';
import { Button } from '../Button';
import { TModalDescriptionToyProps } from './type';
import classNames from 'classnames';
import { getCharacteristics } from '../../../constants/сharacteristic';
import { HeartIcon } from '../../svg/HeartIcon';

export const ModalDescriptionToy = memo(
  ({ title, onClose, toyImage, toy }: TModalDescriptionToyProps) => {
    const characteristics = getCharacteristics(toy.characteristic);

    return (
      <>
        <ModalOverlay onClick={onClose} /> //* Оверлей — затемнение фона
        <div className={styles.modal}>
          <div className={styles.header}>
            <Button
              variant="like"
              // className={styles.heartButton}
              onClick={(e) => e.stopPropagation()} //что бы при нажатии на сердечко не открывалась модалка
            >
              <HeartIcon className={styles.heartIconCards} />
            </Button>

            <h2 className={styles.titleModal}> {title} </h2>
            <Button
              variant="toggle"
              className={classNames(styles.close, styles.button)}
              onClick={onClose}
            >
              ✕
            </Button>
          </div>

          {/* характеристики */}
          <div className={styles.modalContent}>
            <img src={toyImage} alt={title} className={styles.image} />

            <dl className={styles.characteristics}>
              {characteristics.map(({ label, value }) => (
                <div key={label} className={styles.row}>
                  <dt>{label} :</dt>
                  <div className={styles.line}></div>
                  <dd className={styles.value}>{value}</dd>
                </div>
              ))}
            </dl>

            <div className={styles.description}>
              <p className={styles.textDescription}>
                <span className={styles.label}>Описание:</span>{' '}
                {toy.description ?? ''}
              </p>
              <p className={styles.additionalDescription}>
                Подходит для игр, сна, украшения комнаты и как антистресс.
                Игрушка легко стирается и сохраняет форму — мамы оценят!
                Прекрасный подарок на день рождения, праздник или просто для
                радости.
              </p>
            </div>
          </div>
          <div className={styles.priceBasket}>
            <p className={styles.priceModal}>
              Цена: {toy.price.toLocaleString('ru-RU')} ₽
            </p>
            <Button
              className={styles.button}
              onClick={(e) => {
                alert('Добавлено в корзину');
              }}
            >
              <img className={styles.icon} src={basketIcon} alt="Корзина" />
            </Button>
          </div>
        </div>
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
