import { ReactNode } from 'react';

export interface TButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
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
