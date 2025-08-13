// --- Декларации для CSS/SCSS/SASS модулей ---
// Позволяет импортировать стили с поддержкой CSS Modules,
// где экспортируется объект с ключами-классами и значениями-хэшами.
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { [key: string]: string };
  export default classes;
}

// --- Декларация для SVG ---
// 1) ReactComponent — это возможность импортировать SVG как React-компонент:
//    import { ReactComponent as Icon } from './icon.svg';
// 2) src — путь к файлу (по умолчанию строка), для использования как обычной картинки.
declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}

// --- Декларации для картинок ---
// Позволяет импортировать картинки как модули:
// import img from './image.png'; // img: string
declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

// --- Декларация для JSON ---
// Позволяет импортировать JSON-файлы как объекты:
// import data from './data.json'; // data: any
declare module "*.json" {
  const content: any;
  export default content;
}
