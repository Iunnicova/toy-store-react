export type TCharacteristic = {
  size: number; // Чистое число, например 45
  materialKey: string; // Ключ перевода, например 'toys.tiger_dream_keeper.material'
  fillerKey: string; // 'toys.tiger_dream_keeper.filler'
  ageKey: string; // 'toys.tiger_dream_keeper.age'
  packagingKey: string; // 'toys.tiger_dream_keeper.packaging'
};

export type TToy = {
  id: number;

  // осмысленный ключ сущности, например 'tiger_dream_keeper'
  translationKey: string;

  // ключи для заголовка и описания
  titleKey: string; // 'toys.tiger_dream_keeper.title'
  descriptionKey: string; // 'toys.tiger_dream_keeper.description'
  price: number;
  toyImage: string;
  characteristic: TCharacteristic;
  onCardClick?: (toy: TToy) => void;
};

export type TCharacteristicRow = {
  label: string;
  value: string;
};
