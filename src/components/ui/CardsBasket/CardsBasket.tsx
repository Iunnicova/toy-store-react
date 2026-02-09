import { useCartContext } from '@/context/CartContex';
import { useTranslation } from 'react-i18next';
import { Button, Counter } from '../index';
import { CardsBasketProps } from './type';
import { BasketIcon } from '@/components/svg/BasketIcon';
import { HeartIcon } from '@/components/svg/HeartIcon';
import { DeleteIcon } from '@/components/svg/DeleteIcon';
import styles from './CardsBasket.module.scss';

export function CardsBasket({
  toysInCart,
  onAdd,
  onRemove,
  onToyClick,
}: CardsBasketProps) {
  const { t } = useTranslation(); //хук перевода

  const { cartItems, addToCart, removeFromCart } = useCartContext();

  //цена общее количество
  const totalCount = toysInCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className={styles.cardsBasket}>
      <header className={styles.headerBasket}>
        <h1 className={styles.basketTitle}>
          {t('toys.common.basket')}: {totalCount}
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
          removeFromCart(toy.id); //?удаление карточки
          onRemove(toy.id);
        };

        return (
          <div className={styles.listItem} key={toy.id}>
            <div>
              <img
                className={styles.toy}
                src={toy.toyImage}
                alt={t(toy.titleKey)}
                onClick={() => onToyClick(toy)} // ← клик по карточке → модалка
              />
            </div>
            <div>
              <p className={styles.itemTitle}>{t(toy.titleKey)}</p>
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
            <Counter
              className={styles.counter}
              value={quantity}
              onIncrement={add}
              onDecrement={remove}
            />
            <div className={styles.actions}>
              <Button
                variant="like"
                onClick={(e) => {
                  e.stopPropagation();
                  alert('Добавлено в избранное');
                }}
              >
                <HeartIcon className={styles.heartIconCards} />
              </Button>
              <Button
                onClick={remove}
                variant="like"
                className={styles.button}
                disabled={quantity === 0}
              >
                <DeleteIcon className={styles.deleteIconCards} />
              </Button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
