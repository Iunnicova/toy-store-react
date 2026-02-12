import { IconComponent } from './navItems';

export type HeaderNavVariant = 'basket' | 'favorites' | 'profile';

export interface HeaderNavItem {
  to: string;
  label: string;
  icon: IconComponent;
  count?: number;
  ariaLabel: string;
  variant: HeaderNavVariant;
}
