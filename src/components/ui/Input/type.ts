export type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

//! Определяем тип пропсов для компонента Input
// export type InputProps =
//! Наследуем все стандартные HTML-атрибуты для <input> (например, type, value, onChange, placeholder и т.д.)
// React.InputHTMLAttributes<HTMLInputElement>
//! Добавляем дополнительное необязательное поле className для кастомных CSS-классов
// & { className?: string };
