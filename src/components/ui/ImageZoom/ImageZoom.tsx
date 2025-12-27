import { memo, useEffect, useRef } from 'react';

import { ImageZoomProps } from './type';
import { Button } from '../Button';
import styles from './ImageZoom.module.scss';

export const ImageZoom = memo(
  ({ src, alt, isOpen, onClose }: ImageZoomProps) => {
    if (!isOpen) return null;

    // ссылка для оболочки
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Закрытие по клавише Escape
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) onClose();
      };
      if (isOpen) {
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
      }
    }, [isOpen, onClose]);

    // Фокус-ловушка(a11y)
    useEffect(() => {
      if (!isOpen) return;

      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const focusable = wrapper.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      };

      first?.focus();
      window.addEventListener('keydown', handleTab);
      return () => window.removeEventListener('keydown', handleTab);
    }, [isOpen]);

    return (
      <div
        className={styles.overlay}
        role="dialog"
        aria-modal="true"
        aria-label={alt ?? 'Увеличенное изображение'}
        onClick={onClose}
      >
        {/* ссылка на игрушку */}
        <div className={styles.wrapper} ref={wrapperRef}>
          <img
            src={src}
            alt={alt ?? 'Увеличенное изображение'}
            className={styles.image}
            onClick={(e) => e.stopPropagation()}
          />
          <Button
            variant="toggle"
            className={styles.close}
            onClick={onClose}
            aria-label="Закрыть увеличенное изображение"
          >
            ✕
          </Button>
        </div>
      </div>
    );
  }
);

//! memo
// Предотвращает лишние рендеры при неизменных пропсах

//! if (!isOpen) return null
// Чистый и эффективный рендер

//! onClick={onClose}
// Закрытие по клику на фон

//! onClick={(e) => e.stopPropagation()} на img
// Без этого клик по фото → закроет модалку

//! aria-label на кнопке
// Доступность (a11y)

//! alt={alt ?? "Увеличенное изображение"}
// Даже если alt не передан — будет осмысленный текст.

//! Закрытие по клавише Escape
// useEffect(() => {
//   // Функция-обработчик нажатия клавиши
//   const handleEsc = (e: KeyboardEvent) => {
//     // Проверяем: нажата ли именно клавиша Escape
//     // И открыта ли модалка (isOpen === true)
//     if (e.key === 'Escape' && isOpen) {
//       // Закрываем модалку
//       onClose();
//     }
//   };
//   // Если модалка открыта — вешаем обработчик на window
//   if (isOpen) {
//     window.addEventListener('keydown', handleEsc);
//     // Возвращаем функцию очистки
//     return () => {
//       // Удаляем обработчик при закрытии модалки или размонтировании
//       window.removeEventListener('keydown', handleEsc);
//     };
//   }
//   // Если isOpen === false — ничего не делаем
//   // (и не вешаем обработчик)
// }, [isOpen, onClose]);

//! Фокус-ловушка(a11y)Чтобы пользователь не "вышел" из модалки по Tab:
//! что бы фокус не уходил за пределы модалки → пользователь потеряется.
// useEffect(() => {
//   // Если модалка закрыта — ничего не делаем
//   if (!isOpen) return;
//   // Находим все фокусируемые элементы внутри модалки
//   const focusable = wrapperRef.current?.querySelectorAll(
//     'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//   );
//   // Первый и последний элементы
//   const first = focusable?.[0] as HTMLElement;
//   const last = focusable?.[focusable.length - 1] as HTMLElement;
//   // Обработчик клавиши Tab
//   const handleTab = (e: KeyboardEvent) => {
//     if (e.key === 'Tab') {
//       // Shift + Tab на первом элементе → переходим к последнему
//       if (e.shiftKey && document.activeElement === first) {
//         e.preventDefault();
//         last?.focus();
//       }
//       // Tab на последнем элементе → переходим к первому
//       else if (!e.shiftKey && document.activeElement === last) {
//         e.preventDefault();
//         first?.focus();
//       }
//     }
//   };
//   // Автофокус на первый элемент при открытии
//   first?.focus();
//   // Вешаем обработчик Tab
//   window.addEventListener('keydown', handleTab);
//   // Очистка при закрытии
//   return () => window.removeEventListener('keydown', handleTab);
// }, [isOpen]);
