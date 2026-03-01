import basket1 from '@images/basket1.png';
import { BasketIcon } from '@/components/svg/BasketIcon';
import { Button, CardsBasket, ModalDescriptionToy } from '@/components/ui';
import { useCartBasket } from '@/hooks/useCartBasket';
import { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './BasketPage.module.scss';
import { TToy } from '@/types/toysData';
import { CartItem, ToyInCart } from './type';

export const BasketPage = () => {
  const { cartItems, loading, addToCart, removeFromCart } = useCartBasket();
  const { t } = useTranslation(); //хук перевода

  const [toysInCart, setToysInCart] = useState<ToyInCart[]>([]);
  const [error, setError] = useState<string | null>(null);

  // ─── Добавляем состояние модального окна ───
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToy, setSelectedToy] = useState<TToy | null>(null);

  const handleOpenModal = (toy: TToy) => {
    setSelectedToy(toy);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedToy(null);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchToys = async () => {
      if (cartItems.length === 0) {
        if (isMounted) {
          setToysInCart([]);
          setError(null);
        }
        return;
      }

      try {
        const res = await fetch('http://localhost:30011/toys', {
          signal: AbortSignal.timeout(8000), // таймаут, если сервер молчит 8 секунд → ошибка
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const allToys: TToy[] = await res.json();

        // Соединяем: для каждого элемента корзины находим игрушку
        const merged = cartItems
          .map((cartItem: CartItem) => {
            const toy = allToys.find(
              (toyItem) => toyItem.id === cartItem.toyId
            );
            return toy ? { ...toy, quantity: cartItem.quantity } : null;
          })
          .filter((item): item is ToyInCart => item !== null);

        if (isMounted) {
          setToysInCart(merged);
          setError(null);
        }
      } catch (err) {
        console.error('Ошибка загрузки игрушек для корзины:', err);
        if (isMounted) {
          setError(
            t('basket.loadError') || 'Не удалось загрузить товары корзины'
          );
        }
      }
    };
    fetchToys();

    return () => {
      isMounted = false;
    };
  }, [cartItems]);
  if (loading) {
    return <div className={styles.loading}>Загрузка корзины...</div>;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const isEmpty = toysInCart.length === 0;
  // const totalCount = toysInCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    //********** */
    <section className={styles.basket}>
      {isEmpty ? (
        <div className={styles.emptyBasket}>
          <h1 className={styles.title}>{t('basket.notAdded')}</h1>

          <img
            className={styles.imgBasket}
            src={basket1}
            // alt="Зайка грустит в пустой корзинке"
            alt={t('basket.emptyAlt') || 'Пустая корзинка'}
            loading="lazy"
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
            // aria-label="Перейти на главную страницу"
            aria-label={t('basket.homeAria') || 'Вернуться на главную'}
          >
            <Button variant="headerButton" className={styles.homeButton}>
              <p className={styles.count}>{t('basket.homeButton')}</p>
            </Button>
          </Link>
        </div>
      ) : (
        // ЕСТЬ ТОВАРЫ — показываем карточки
        <div className={styles.containerFilled}>
          <div className={styles.filledBasket}>
            {/* <h1 className={styles.title}>
            {t('basket.title')} ({totalCount})
          </h1> */}

            <CardsBasket
              toysInCart={toysInCart}
              onAdd={addToCart}
              onRemove={removeFromCart}
              onToyClick={handleOpenModal}
            />

            {/*  блок с итоговой суммой */}
            {/* <div className={styles.total}>
          {toysInCart.reduce((sum, item) => sum + item.price * item.quantity, 0)} ₽
        </div> */}
          </div>

          <div className={styles.paymentProduct}>
            <p>оформление</p>
          </div>
        </div>
      )}

      {/* Модалка — рендерим здесь */}
      {isModalOpen && selectedToy && (
        <ModalDescriptionToy
          title={selectedToy.titleKey}
          toyImage={selectedToy.toyImage}
          toy={selectedToy}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};
