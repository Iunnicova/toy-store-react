//Рамка в которой находится весь контент

import styles from './Content.module.scss';
import { TContentProps } from './type';

export const Content = ({ children }: TContentProps) => {
  return <main className={`container ${styles.content}`}>{children}</main>;
};
