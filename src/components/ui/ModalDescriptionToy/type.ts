import { ReactNode } from 'react';

export type TModalDescriptionToyProps = {
  title: string; // 🏷 Заголовок модального окна — например, "Милашка Луна-дарит волшебный мёд"
  toyImage: string; //🎀 картинка
  onClose: () => void; // ❌ Кнопка закрытия: что делать, когда пользователь нажмёт "Закрыть"
  children: React.ReactNode; // 🧩 Внутренности модалки — текст, картинки, кнопки (можно не передавать)
};
