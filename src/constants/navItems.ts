import { BasketIcon } from '@/components/svg/BasketIcon';
import { HeartIcon } from '@/components/svg/HeartIcon';
import { ProfileIcon } from '@/components/svg/ProfileIcon';
import { THeaderNavItem } from '@/types/headerNavItem';


export const getHeaderNavItems = (
  basketTotal: number,
  favoritesCount: number,
  userName?: string
): THeaderNavItem[] => [
  {
    to: '/basket',
    // label: `${basketTotal}`,
    label: basketTotal > 0
    ? String(basketTotal)
    :'header.nav.basket',
    icon: BasketIcon,
    ariaLabel: `header.nav.basket_aria|${basketTotal}`,
    variant: 'basket',
  },
  {
    to: '/favorites',
    label: 'header.nav.favorites',
    count: favoritesCount > 0 ? favoritesCount : undefined,
    icon: HeartIcon,
    ariaLabel: `header.nav.favorites_aria|${favoritesCount}`,
    variant: 'favorites',
  },
  {
    to: '/profile',
    label: userName ? userName : 'header.nav.profile',
    icon: ProfileIcon,
    ariaLabel: userName
      ? `header.nav.profile_with_name|${userName}`
      : 'header.nav.profile_aria',
    variant: 'profile',
  },
];
