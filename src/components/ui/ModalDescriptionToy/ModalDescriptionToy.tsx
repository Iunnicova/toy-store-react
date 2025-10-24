import styles from './ModalDescriptionToy.module.scss';
import { memo } from 'react';

import heartIconCards from '/icon/heart.svg';
import { ModalOverlay } from '../ModalOverlay';
import { Button } from '../Button';
import { TModalDescriptionToyProps } from './type';
import classNames from 'classnames';

export const ModalDescriptionToy = memo(
  ({ title, onClose, children }: TModalDescriptionToyProps) => (
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

          <h3 className={styles.title}> {title} </h3>
          <Button
            variant="toggle"
            className={classNames(styles.close, styles.button)}
            onClick={onClose}
          >
            ✕
          </Button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </>
  )
);

//! memo //оптимизирует компонент, чтобы не перерисовывался без нужды

// Внутри компонента ModalDescriptionToy нельзя рендерить <ModalDescriptionToy> — это создаёт бесконечную рекурсию.
// Вся логика отображения модалки должна быть в родителе в Layout.
