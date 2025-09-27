import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode; // Текст или иконка внутри кнопки
  onClick?: () => void; // Обработчик клика (опционально)
  type?: 'button' | 'submit' | 'reset';
  className?: string; // Дополнительные стили
}

// "button": Кнопка по умолчанию, не имеет специального поведения.
// "submit": Кнопка формы.
// "reset": Форма кнопки сброса.
