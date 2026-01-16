import { useTranslation } from 'react-i18next';
import { useCart } from '../../../hooks/useCart';
import { Button } from '../Button';
import { TCardProps } from './type';
import { HeartIcon } from '../../svg/HeartIcon';
import { BasketIcon } from '../../svg/BasketIcon/BasketIcon';
import { Counter } from '../Counter';
import styles from './Cards.module.scss';

export const Cards = ({ toy, onCardClick }: TCardProps) => {
  const { t } = useTranslation();
  const { cartItems, addToCart, removeFromCart } = useCart();

  //!добавление удаление из корзины
  const cartItem = cartItems.find((item) => item.toyId === toy.id);
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
    <div className={styles.cards} onClick={() => onCardClick?.(toy)}>
      <div className={styles.imgCards}>
        <Button
          variant="like"
          onClick={(e) => {
            e.stopPropagation();
            alert('Добавлено в избранное');
          }}
        >
          <HeartIcon className={styles.heartIconCards} />
        </Button>

        <img className={styles.toy} src={toy.toyImage} alt={t(toy.titleKey)} />
      </div>

      <p className={styles.title}>{t(toy.titleKey)}</p>

      <div className={styles.actions}>
        <div className={styles.price}>
          <span>{t('toys.common.priceLabel')}:</span>
          <strong>{toy.price.toLocaleString('ru-RU')}</strong>
        </div>

        {quantity === 0 ? (
          <Button
            onClick={add}
            variant="headerButton"
            className={styles.button}
          >
            <BasketIcon className={styles.basketIconCards} />
            корзина
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
    </div>
  );
};

// export const Cards = ({ toy, onCardClick }: TCardProps) => {
//   const { t } = useTranslation(); //хук для перевода

//   //!для изменения значка корзины
//   const { cartItems, addToCart } = useCart(); //
//- Проверка: есть ли текущая игрушка (toy.id) уже в корзине -
// isAdded будет true, если хотя бы один элемент в cartItems совпадает по toyId.
//   const isAdded = cartItems.some((item) => item.toyId === toy.id);

//   // Добавляем в корзину на сервере
//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.stopPropagation();
//     await addToCart(toy.id);
//   };

//   return (
//     <div
//       className={styles.cards}
//       key={toy.id}
//       onClick={() => onCardClick?.(toy)} //при клике открываем модалку
//     >
//       <div className={styles.imgCards}>
//         <Button
//           variant="like"
//           onClick={(e) => {
//             e.stopPropagation(); //что бы при нажатии на сердечко не открывалась модалка
//             alert('Добавлено в избранное');
//           }}
//         >
//           <HeartIcon className={styles.heartIconCards} />
//         </Button>
//         <img className={styles.toy} src={toy.toyImage} alt={t(toy.titleKey)} />
//       </div>
//       <p className={styles.title} data-tooltip="очень длинный текст">
//         {t(toy.titleKey)}
//       </p>
//       <div className={styles.price}>
//         <span>{t('toys.common.priceLabel')}:</span>
//         <strong>{toy.price.toLocaleString('ru-RU')}</strong>

// <Button className={styles.button} onClick={handleAddToCart}>
//   {isAdded ? (
//     <div
//       className={styles.navigation}
//       // aria-label={resolveAria(item.ariaLabel)}
//     >
//       <img
//         src={jackdaw}
//         alt="Добавлено"
//         className={styles.basketIconCards}
//       />
//     </div>
//   ) : (
//     <BasketIcon className={styles.basketIconCards} />
//   )}
// </Button>
//       </div>
//     </div>
//   );
// };
