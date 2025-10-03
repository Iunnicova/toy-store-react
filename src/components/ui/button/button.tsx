// import React, { FC, ReactNode } from 'react'; устарело
import styles from './button.module.scss';
import { ButtonProps } from './type';

export const Button = ({ children, onClick,type = 'button', className }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// || "": Это оператор логического ИЛИ (ИЛИ). Он работает следующим образом:
// Если classNameпередано (т.е. не null, не undefined, не false, не 0, не ""), то используется само значение className.
// Если classNameне передано (он undefined), то вместо него используется пустая строка "". Это важно, чтобы избежать вставок undefinedв символы классов, которые могут вызвать проблемы.
