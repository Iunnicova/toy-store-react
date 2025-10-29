export type TCharacteristicRow = {
  label: string;
  value: string;
};

export type TCharacteristic = {
  size: number; // "45 см"
  material: string; // "гипоаллергенный плюш"
  filler: string; // "холлофайбер"
  age: string; // "от 3 лет"
  packaging: string; // "подарочная коробка"
};

// Возраст "от 1 лет" — тоже строка, потому что текст, а не чистое число.

export type TToy = {
  id: number;
  title: string;
  price: number;
  toyImage: string;
  description: string;
  characteristic: TCharacteristic;
  onCardClick?: (toy: any) => void;
};
