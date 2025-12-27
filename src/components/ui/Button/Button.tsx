import classNames from 'classnames';
import { TButtonProps } from './type';
import styles from './Button.module.scss';

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
