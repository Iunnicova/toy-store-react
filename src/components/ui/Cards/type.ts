import { TToy } from '../../../types/toysData';

export type TCardProps = {
  toy: TToy;
  onCardClick?: (toy: TToy) => void;
};
