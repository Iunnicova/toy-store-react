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
    label: `${basketTotal}`,
    icon: BasketIcon,
    ariaLabel: `header.nav.basket_aria|${basketTotal}`,
  },
  {
    to: '/favorites',
    label: 'header.nav.favorites',
    count: favoritesCount > 0 ? favoritesCount : undefined,
    icon: HeartIcon,
    ariaLabel: `header.nav.favorites_aria|${favoritesCount}`,
  },
  {
    to: '/profile',
    label: userName ? userName : 'header.nav.profile',
    icon: ProfileIcon,
    ariaLabel: userName
      ? `header.nav.profile_with_name|${userName}`
      : 'header.nav.profile_aria',
  },
];
