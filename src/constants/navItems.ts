import { BasketIcon } from '../components/svg/BasketIcon';
import { HeartIcon } from '../components/svg/HeartIcon';
import { ProfileIcon } from '../components/svg/ProfileIcon';
import { HeaderNavItem } from '../components/ui/Header/type';

export const getHeaderNavItems = (
  basketTotal: number,
  favoritesCount: number,
  userName?: string
): HeaderNavItem[] => [
  {
    to: '/basket',
    label: `${basketTotal} ₽`,
    icon: BasketIcon,
    ariaLabel: `Корзина: ${basketTotal} ₽`,
  },
  {
    to: '/favorites',
    label: 'Избранное',
    count: favoritesCount > 0 ? favoritesCount : undefined,
    icon: HeartIcon,
    ariaLabel: `Избранное: ${favoritesCount} товар(ов)`,
  },
  {
    to: '/profile',
    label: userName || 'Профиль',
    icon: ProfileIcon,
    ariaLabel: userName ? `Профиль: ${userName}` : 'Войти в профиль',
  },
];
