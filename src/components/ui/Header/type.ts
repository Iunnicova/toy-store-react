import { IconComponent } from '../../../types/navItems';

export interface HeaderNavItem {
  to: string;
  label: string;
  icon: IconComponent;
  count?: number;
  ariaLabel: string;
}

export type THeaderProps = {
  userName?: string; // Имя пользователя
  basketTotal?: number; // Сколько денег в корзине
  favoritesCount?: number; // Сколько товаров в внутри сердечка
  // toysInCart: ToyInCart[]; //кнопка корзины считает
};
