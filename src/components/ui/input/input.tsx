import styles from './input.module.scss';
import { InputProps } from './type';

export const Input = ({ className, ...rest }: InputProps) => {
  return <input className={`${styles.input} ${className || ''}`} {...rest} />;
};


// Рендерим HTML-элемент <input>
// Применяем стили из CSS-модуля и добавляем дополнительный класс, если он передан
// Передаём все остальные пропсы (например, type, placeholder, value, onChange и т.д.) через ...rest

// ! ...rest 
//  - Позволяет передавать любые стандартные атрибуты: type, placeholder, value, onChange, disabled, и т.д.
// - Упрощает API компонента — не нужно явно перечислять каждый проп.
// - Делает компонент гибким и совместимым с HTML-спецификацией.


//! Все эти пропсы попадут в ...rest и будут корректно переданы в <input />.

// <Input
//   type="email"
//   placeholder="Введите почту"
//   value={email}
//   onChange={handleChange}
//   disabled={isLoading}
// />
