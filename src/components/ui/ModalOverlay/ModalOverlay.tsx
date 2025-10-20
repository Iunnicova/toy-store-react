import styles from './ModalOverlay.module.scss';

export const ModalOverlay = ({ onClick }: { onClick: () => void }) => (
  <div data-cy="modalOverlay" className={styles.overlay} onClick={onClick} />
);

// - export const ModalOverlay
// - { onClick } — это кнопка-невидимка: когда ты нажимаешь на фон, она вызывает действие (например, закрыть окно).
//! для тестов - data-cy='modalOverlay' — это как метка для робота-тестера Cypress: он знает, что это фон модалки.
// - className={styles.overlay} — здесь применяются стили: фон становится тёмным, фиксируется на экране, и всё вокруг затемняется.
// - onClick={onClick} — если ты нажмёшь на этот фон, произойдёт действие, которое ты передала (например, закрытие модалки).
