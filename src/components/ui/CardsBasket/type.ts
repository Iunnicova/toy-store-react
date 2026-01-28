import { ToyInCart } from '@/components/pages/BasketPage/type';
import { TToy } from '@/types/toysData';

export type CardsBasketProps = {
  toysInCart: ToyInCart[];
  onAdd: (toyId: number) => void;
  onRemove: (toyId: number) => void;
  onToyClick: (toy: TToy) => void;
};
