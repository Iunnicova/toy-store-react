import { ReactNode } from 'react';

export interface TButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'toggle' | 'like' | 'headerButton';
}

//! props → это то, что передаётся в компонент (как настройки).
// !props — это кубики, которые ты можешь вставлять в разные места, чтобы поменять внешний вид или поведение.

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
