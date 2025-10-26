import styles from './ModalDescriptionToy.module.scss';
import { memo } from 'react';

import heartIconCards from '/icon/heart.svg';
import basketIcon from '/icon/basket.svg';
import { ModalOverlay } from '../ModalOverlay';
import { Button } from '../Button';
import { TModalDescriptionToyProps } from './type';
import classNames from 'classnames';

export const ModalDescriptionToy = memo(
  ({ title, onClose, toyImage, toy }: TModalDescriptionToyProps) => (
    <>
      <ModalOverlay onClick={onClose} /> //* Оверлей — затемнение фона
      <div className={styles.modal}>
        <div className={styles.header}>
          <Button
            variant="like"
            className={styles.heartButton}
            onClick={(e) => e.stopPropagation()} //что бы при нажатии на сердечко не открывалась модалка
          >
            <img
              className={styles.heartIconCards}
              src={heartIconCards}
              alt="Закладки"
            />
          </Button>

          <h2 className={styles.title}> {title} </h2>
          <Button
            variant="toggle"
            className={classNames(styles.close, styles.button)}
            onClick={onClose}
          >
            ✕
          </Button>
        </div>
        <div className={styles.modalContent}>
          <img src={toyImage} alt={title} className={styles.image} />
          <div className={styles.characteristics}>
           
            <p>Размер: {toy.characteristic.size} см</p>
            <p>Материал: {toy.characteristic.material}</p>
            <p>Наполнитель: {toy.characteristic.filler}</p>
            <p>Возраст: {toy.characteristic.age}</p>
            <p>Упаковка: {toy.characteristic.packaging}</p>
          </div>
          <div className={styles.description}>
            <p className={styles.textDescription}>
              {`Описание: ${toy.description ?? ''} Подходит для игр, сна, украшения комнаты и как антистресс. Игрушка легко стирается и сохраняет форму — мамы оценят! Прекрасный подарок на день рождения, праздник или просто для радости.`}
            </p>
          </div>
          <div className={styles.priceBasket}>
             <p>Цена: {toy.price.toLocaleString('ru-RU')} ₽</p>
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
      </div>
    </>
  )
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
