import styles from './ModalOverlay.module.scss';
import { ModalOverlayProps } from './type';

export const ModalOverlay = ({ onClick, children }: ModalOverlayProps) => {
  return (
    <div className={styles.overlay} onClick={onClick} data-cy="modalOverlay">
      {children}
    </div>
  );
};

//! data-cy="modalOverlay"
// атрибут данных (data attribute), используемый для тестирования элементов в интерфейсе.
