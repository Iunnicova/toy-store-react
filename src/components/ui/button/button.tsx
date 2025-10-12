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


// || "": Это оператор логического ИЛИ (ИЛИ). Он работает следующим образом:
// Если classNameпередано (т.е. не null, не undefined, не false, не 0, не ""), то используется само значение className.
// Если classNameне передано (он undefined), то вместо него используется пустая строка "". Это важно, чтобы избежать вставок undefinedв символы классов, которые могут вызвать проблемы.
