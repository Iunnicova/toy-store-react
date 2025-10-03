//Рамка в которой находится весь контент

import styles from './content.module.scss';
import { ContentProps } from './type';

export const Content = ({ children }: ContentProps) => {
  return <main className={`container ${styles.content}`}>{children}</main>;
};