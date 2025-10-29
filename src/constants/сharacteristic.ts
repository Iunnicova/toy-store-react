import { TCharacteristic, TCharacteristicRow } from '../types/toysData';

export const getCharacteristics = (
  char: TCharacteristic
): TCharacteristicRow[] => [
  { label: 'Размер', value: `${char.size} см` },
  { label: 'Материал', value: char.material },
  { label: 'Наполнитель', value: char.filler },
  { label: 'Возраст', value: char.age },
  { label: 'Упаковка', value: char.packaging },
];
