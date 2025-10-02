import { FC } from 'react';
import styles from './content.module.scss';

import { ContentProps } from './type';
// import { NavLink } from 'react-router-dom';

export const Content: FC<ContentProps> = ({ children }) => {
  return <main className={`container ${styles.content}`}>{children}</main>;
};
