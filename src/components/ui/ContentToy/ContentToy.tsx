//Рамка в которой находится весь контент

import styles from './ContentToy.module.scss';
import { TContentToyProps } from './type';

export const ContentToy = ({ children }: TContentToyProps) => {
  return <main className={`container ${styles.content}`}>{children}</main>;
};
