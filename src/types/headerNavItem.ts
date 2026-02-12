import { IconComponent } from './navItems';

export type THeaderNavVariant = 'basket' | 'favorites' | 'profile';

export interface THeaderNavItem {
  to: string;
  label: string;
  icon: IconComponent;
  count?: number;
  ariaLabel: string;
  variant: THeaderNavVariant;
}
