export type TFooterProps = {
  info: string;

  socialLinks: {
    name: string;
    url: string;
  }[];

  onSubscribe: (email: string) => void;
};

//info: string;   //*Текст под копирайт, например "© 2025 ...
// socialLinks:   //* Список соцсетей
// name: string;   //* Название соцсети (Instagram, Telegram, YouTube и т.д.)
// url: string;    //* Ссылка
// onSubscribe: (email: string) => void;  //*Функция, которая вызывается при вводе email
