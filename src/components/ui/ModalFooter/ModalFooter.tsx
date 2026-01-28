import { useCartContext } from '@/context/CartContex';
import { BasketIcon } from '@/components/svg/BasketIcon';
import { t } from 'i18next';
import { Button, Counter } from '../index';
import { TModalFooterProps } from './type';
import styles from './ModalFooter.module.scss';

export const ModalFooter = ({ toy }: TModalFooterProps) => {
  //!для изменения значка корзины
  const { cartItems, addToCart, removeFromCart } = useCartContext();
  const cartItem = cartItems.find((item) => item.toyId === toy.id); //Проверка: есть ли текущая игрушка (toy.id) уже в корзине.
  const quantity = cartItem?.quantity ?? 0;

  const add = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    addToCart(toy.id);
  };

  const remove = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    removeFromCart(toy.id);
  };

  return (
    <div className={styles.priceBasket}>
      <span className={styles.priceModal}>
        {t('toys.common.priceLabel')}:
        <strong className={styles.price}>
          {toy.price.toLocaleString('ru-RU')}
        </strong>
      </span>
      {quantity === 0 ? (
        <Button className={styles.button} onClick={add}>
          <BasketIcon className={styles.icon} />
        </Button>
      ) : (
        <Counter
          className={styles.counter}
          value={quantity}
          onIncrement={add}
          onDecrement={remove}
        />
      )}
    </div>
  );
};
