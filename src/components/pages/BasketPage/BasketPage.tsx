import { useCartBasket } from '@/hooks/useCartBasket/useCartBasket';
import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TToy } from '@/types/toysData';
import { Button, CardsBasket, ModalDescriptionToy } from '@/components/ui';
import { BasketIcon } from '@/components/svg/BasketIcon';
import basket1 from '@images/basket1.webp';
import styles from './BasketPage.module.scss';
import { useCartContext } from '@/context/CartContex';

export const BasketPage = () => {
  const {
    toysInCart,
    loading,
    error,
    setError,
    addToCart,
    removeFromCart,
    deleteCartItem,
  } = useCartContext();

  // ─── Добавляем состояние модального окна ───
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToy, setSelectedToy] = useState<TToy | null>(null);

  const { t } = useTranslation(); //хук перевода

  const handleOpenModal = (toy: TToy) => {
    setSelectedToy(toy);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedToy(null);
  };

  // всегда error ПЕРВАЯ ПРОВЕРКА: Если есть ошибка, показываем её сразу

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>⚠️ {error}</p>
        <Button
          variant="error"
          className={styles.errorButton}
          onClick={() => setError(null)}
        >
          {t('error.retry') ?? 'Попробовать снова'}
        </Button>
      </div>
    );
  }

  // ВТОРАЯ ПРОВЕРКА: Если еще грузимся
  if (loading) {
    return (
      <div className={styles.loading}>
        {t('error.loading') ?? 'Загрузка корзины...'}
      </div>
    );
  }

  const isEmpty = toysInCart.length === 0;

  return (
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
            <CardsBasket
              toysInCart={toysInCart}
              onAdd={addToCart}
              onRemove={removeFromCart}
              onToyClick={handleOpenModal}
              onDeleteCards={(toy) => deleteCartItem(toy.id)}
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
