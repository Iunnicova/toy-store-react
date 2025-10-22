// import React, { FC, ReactNode } from 'react'; устарело
import classNames from 'classnames';
import styles from './Button.module.scss';
import { TButtonProps } from './type';

export const Button = ({
  children,
  onClick,
  type = 'button',
  className,
  variant = 'primary',
}: TButtonProps) => {
  return (
    <button
      type={type}
      className={classNames(styles.button, styles[variant], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
