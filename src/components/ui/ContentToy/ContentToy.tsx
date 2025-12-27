//Рамка в которой находится весь контент
import { TContentToyProps } from './type';
import styles from './ContentToy.module.scss';

export const ContentToy = ({ children }: TContentToyProps) => {
  return <main className={`container ${styles.content}`}>{children}</main>;
};
