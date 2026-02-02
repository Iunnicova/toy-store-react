import { useCartContext } from '@/context/CartContex';
import { useTranslation } from 'react-i18next';
import { Button, Counter } from '../index';
import { CardsBasketProps } from './type';
import { BasketIcon } from '@/components/svg/BasketIcon';
import { HeartIcon } from '@/components/svg/HeartIcon';
// import { DeleteIcon } from '@/components/svg/DeleteIcon'
import styles from './CardsBasket.module.scss';

export function CardsBasket({
  toysInCart,
  onAdd,
  onRemove,
  onToyClick,
}: CardsBasketProps) {
  const { t } = useTranslation(); //хук перевода

  const { cartItems, addToCart, removeFromCart } = useCartContext();
  const totalCount = toysInCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className={styles.cardsBasket}>
      <header className={styles.headerBasket}>
        <h1 className={styles.title}>
          {t('basket.title')} ({totalCount})
        </h1>
        {/*  блок с итоговой суммой */}
        <div className={styles.total}>
          {toysInCart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )}{' '}
          ₽
        </div>
      </header>

      {toysInCart.map((toy) => {
        const cartItem = cartItems.find((item) => item.toyId === toy.id);
        const quantity = cartItem?.quantity ?? 0;

        //Counter и корзина нажимаем на toy=> характеристики
        const add = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          addToCart(toy.id);
          onAdd(toy.id);
        };

        const remove = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          removeFromCart(toy.id);
          onRemove(toy.id);
        };

        return (
          <div
            className={styles.listItem}
            key={toy.id}
            onClick={() => onToyClick(toy)} // ← клик по карточке → модалка
          >
            <div>
              <img
                className={styles.toy}
                src={toy.toyImage}
                alt={t(toy.titleKey)}
              />
            </div>
            <div>
              <p className={styles.title}>{t(toy.titleKey)}</p>
            </div>

            <div className={styles.priceContainer}>
              {/* <span>{t('toys.common.priceLabel')}:</span> */}
              <strong>
                {(toy.price * quantity).toLocaleString('ru-RU')}
                {/* {toy.price * toy.quantity} */}
              </strong>
              {/* Подсказка: цена за 1 штуку (всегда одинаковая) */}
              {quantity > 1 && (
                <span className={styles.singlePrice}>
                  {toy.price.toLocaleString('ru-RU')} / ₽
                </span>
              )}
            </div>
            {quantity === 0 ? (
              <Button onClick={add} variant="like" className={styles.button}>
                <HeartIcon className={styles.heartIconCards} />
                <BasketIcon className={styles.basketIconCards} />
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
      })}
    </section>
  );
}
