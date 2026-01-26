import { TToy } from '@/types/toysData';

export interface CartItem {
  toyId: number;
  quantity: number;
}

export interface ToyInCart extends TToy {
  quantity: number;
}
