import styles from './ModalDescriptionToy.module.scss';
import { memo } from 'react';

import { ModalOverlay } from '../ModalOverlay';
import { Button } from '../Button';
import { TModalDescriptionToyProps } from './type';

export const ModalDescriptionToy = memo(
  ({ title, onClose, children }: TModalDescriptionToyProps) => (
    <>
      <ModalOverlay onClick={onClose} /> //* Оверлей — затемнение фона
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}> {title} </h3>
          <Button className={styles.close} onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  )
);

//! memo //оптимизирует компонент, чтобы не перерисовывался без нужды

// Внутри компонента ModalDescriptionToy нельзя рендерить <ModalDescriptionToy> — это создаёт бесконечную рекурсию.
// Вся логика отображения модалки должна быть в родителе в Layout.
