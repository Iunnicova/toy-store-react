import { TCharacteristic, TCharacteristicRow } from '../types/toysData';

export const getCharacteristics = (
  char: TCharacteristic
): TCharacteristicRow[] => [
  { label: 'Размер', value: `${char.size} см` },
  { label: 'Материал', value: char.materialKey },
  { label: 'Наполнитель', value: char.fillerKey },
  { label: 'Возраст', value: char.ageKey },
  { label: 'Упаковка', value: char.packagingKey },
];
