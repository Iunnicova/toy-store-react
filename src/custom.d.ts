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
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}
declare module '*.avif' {
  const src: string;
  export default src;
}

// --- Fonts ---
// Позволяет импортировать шрифты как пути к файлам:
// import font from './font.woff2'; // font: string
declare module '*.woff' {
  const src: string;
  export default src;
}
declare module '*.woff2' {
  const src: string;
  export default src;
}
declare module '*.ttf' {
  const src: string;
  export default src;
}
declare module '*.otf' {
  const src: string;
  export default src;
}
declare module '*.eot' {
  const src: string;
  export default src;
}

// --- Video ---
// Позволяет импортировать видеофайлы как строки (пути):
// import video from './clip.mp4'; // video: string
declare module '*.mp4' {
  const src: string;
  export default src;
}
declare module '*.webm' {
  const src: string;
  export default src;
}
declare module '*.ogg' {
  const src: string;
  export default src;
}

// --- Декларация для JSON ---
// --- JSON files ---
// Позволяет импортировать JSON как объект:
// import data from './data.json'; // data: any
// (лучше включить `"resolveJsonModule": true` в tsconfig.json,
// тогда этот блок можно удалить)
declare module "*.json" {
  const content: any;
  export default content;
}
