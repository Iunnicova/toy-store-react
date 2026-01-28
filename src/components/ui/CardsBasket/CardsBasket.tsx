import { BasketIcon } from '@/components/svg/BasketIcon';
import { HeartIcon } from '@/components/svg/HeartIcon';
import { useCartContext } from '@/context/CartContex';
import { useTranslation } from 'react-i18next';
import { Button, Counter } from '../index';
import { CardsBasketProps } from './type';
import styles from './CardsBasket.module.scss';

export function CardsBasket({ 
  toysInCart, 
    onAdd, 
  onRemove, 
  onToyClick 
}: CardsBasketProps) {
  const { t } = useTranslation(); //хук перевода

  const { cartItems, addToCart, removeFromCart } = useCartContext();

  return (
    <section className={styles.cardsGrid}>
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
            onClick={() => onToyClick(toy)}   // ← клик по карточке → модалка
          >
            <div>
            <img
              className={styles.toy}
              src={toy.toyImage}
              alt={t(toy.titleKey)}
            />

            <p className={styles.title}>{t(toy.titleKey)}</p>
</div>


            <div className={styles.price}>
              <span>{t('toys.common.priceLabel')}:</span>
              <strong>{toy.price.toLocaleString('ru-RU')}</strong>
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
