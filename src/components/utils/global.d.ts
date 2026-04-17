// Типизация для CSS Modules (*.module.scss)
// Позволяет импортировать стили как объект классов:
// import styles from './file.module.scss'
// styles.button → 'button_hash123'
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Типизация для обычных SCSS файлов (глобальные стили)
// Нужна, чтобы TypeScript не ругался на import './styles.scss'
declare module '*.scss';
