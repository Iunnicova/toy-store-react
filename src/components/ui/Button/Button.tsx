import classNames from 'classnames';
import { TButtonProps } from './type';
import styles from './Button.module.scss';

export const Button = ({
  children,
  onClick,
  type = 'button',
  className,
  variant = 'primary',
}: TButtonProps) => {
  return (
    <button
      type={type}
      className={classNames(styles.button, styles[variant], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// export interface ButtonProps {
//   children: ReactNode;    //* Текст или иконка внутри кнопки
//   onClick?: () => void;   //* Обработчик клика (опционально)
//   type?: 'button' | 'submit' | 'reset';  //* "button": Кнопка по умолчанию, не имеет специального поведения.
//* "submit": Кнопка формы.
//*"reset": Форма кнопки сброса.

//  className?: string; //* Дополнительные стили
// }
//  variant?: 'primary' | 'toggle';  чтобы можно менять кнопки в других файлах

//! что бы работала в других местах сердечко тема и язык прописываем
//  <Button
//   variant="toggle"
//   className={classNames(styles.close, styles.button)}
//   </Button>
//! в стилях
// .button {
//   .toggle {
//   что нужно
//   }
// }
