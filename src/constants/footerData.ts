// src/constants/footerData.ts

// динамический год
export const CURRENT_YEAR = new Date().getFullYear();

// текст копирайта
export const FOOTER_INFO = `© ${CURRENT_YEAR} UnnToyStore. Все права защищены.`;

// ссылки на соцсети
export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://instagram.com' },
  { name: 'Vk', url: 'https://vk.com' },
  { name: 'Facebook', url: 'https://facebook.com' },
];

// обработчик подписки
export const handleSubscribe = (email: string) => {
  console.log('Подписка:', email);
};
