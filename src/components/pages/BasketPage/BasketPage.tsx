import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useCart } from '../../../hooks/useCart';
import basket1 from '/images/basket1.png';
import { TToy } from '../../../types/toysData';
import { Button, Cards } from '../../ui';
import { BasketIcon } from '../../svg/BasketIcon/BasketIcon';
import styles from './BasketPage.module.scss';
import { Counter } from '../../ui/Counter';
import { CardsBasket } from '../../ui/CardsBasket';

export const BasketPage = () => {
  const { cartItems, loading, addToCart, removeFromCart } = useCart();
  const { t } = useTranslation(); //хук перевода
  const [toysInCart, setToysInCart] = useState<any[]>([]);
  //  const quantity = toy.quantity;

  useEffect(() => {
    const fetchToys = async () => {
      if (cartItems.length === 0) {
        setToysInCart([]);
        return;
      }

      try {
        const res = await fetch('http://localhost:3001/toys');
        const allToys = await res.json();

        // Соединяем: для каждого элемента корзины находим игрушку
        const merged = cartItems
          .map((cartItem: any) => {
            const toy = allToys.find((t: any) => t.id === cartItem.toyId);
            if (toy) {
              return { ...toy, quantity: cartItem.quantity };
            }
            return null;
          })
          .filter(Boolean);

        setToysInCart(merged);
      } catch (error) {
        console.error('Ошибка загрузки игрушек для корзины:', error);
      }
    };

    fetchToys();
  }, [cartItems]);

  if (loading) {
    return <div>Загрузка корзины...</div>;
  }
  const isEmpty = toysInCart.length === 0;

  return (
    <section className={styles.basket}>
      {isEmpty ? (
        <>
          <h1 className={styles.title}>{t('basket.notAdded')}</h1>

          <img
            className={styles.imgBasket}
            src={basket1}
            alt="Зайка грустит в пустой корзинке"
          />
          <p className={styles.text}>
            {/* Trans компонент из i18next для добавления img в текст перевода*/}
            <Trans
              i18nKey="basket.justClick"
              components={{
                icon: <BasketIcon className={styles.basketIcon} />,
              }}
            />
          </p>
          <Link
            to="/"
            className={styles.homeLink}
            aria-label="Перейти на главную страницу"
          >
            <Button variant="headerButton" className={styles.homeButton}>
              <p className={styles.count}>{t('basket.homeButton')}</p>
            </Button>
          </Link>
        </>
      ) : (
        // ЕСТЬ ТОВАРЫ — показываем карточки
        <div className={styles.card}>
          <CardsBasket toysInCart={toysInCart} />
        </div>
      )}
    </section>
  );
};
