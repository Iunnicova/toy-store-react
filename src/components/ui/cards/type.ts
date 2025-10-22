export type TCardsProps = {
  id: number;
  title: string;
  price: number;
  toyImage: string;
  onCardClick?: (toy: any) => void;
};
