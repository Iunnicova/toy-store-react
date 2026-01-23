// import { TCharacteristic, TCharacteristicRow } from '../types/toysData';

import { TCharacteristic, TCharacteristicRow } from '@/types/toysData';

export const getCharacteristics = (
  char: TCharacteristic
): TCharacteristicRow[] => [
  { label: 'size', value: `${char.size} см` },
  { label: 'material', value: char.materialKey },
  { label: 'filler', value: char.fillerKey },
  { label: 'age', value: char.ageKey },
  { label: 'packaging', value: char.packagingKey },
];
