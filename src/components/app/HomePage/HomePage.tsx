import { useState, useEffect } from 'react';
import { useCartContext } from '@/context/BasketContext';
import { t } from 'i18next';
import {
  ControlPanel,
  Banner,
  Search,
  Cards,
  ModalDescriptionToy,
  Button,
} from '@/components/ui';
import { TToy } from '@/types/toysData';

import styles from './HomePage.module.scss';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToy, setSelectedToy] = useState<TToy | null>(null);

  ///добавляем карточки через db.jso
  const [toys, setToys] = useState<TToy[]>([]); // состояние игрушек
  const [loading, setLoading] = useState(true); // loading — текущее значение (true/false) setLoading — функция, которая меняет это значение

  const { error, setError } = useCartContext();

  //!кнопка поиска
  const [searchQuery, setSearchQuery] = useState('');

  //!отправка электронной почты при нажатии на enter
  // const addEmailEnter = () => {
  //   console.log('Добавление электронной почты по enter');
  // };

  useEffect(() => {
    const controller = new AbortController(); // Контроллер для отмены запроса(убираем утечку памяти)

    fetch('http://localhost:3001/toys', {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setToys(data); // сохранили данные
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Ошибка загрузки игрушек:', err); // Обработали ошибку
        }
      })
      .finally(() => {
        setLoading(false); // Выполнится ВСЕГДА: и при успехе, и при ошибке
      });
    return () => {
      controller.abort(); // Отменяем fetch при размонтировании компонента
    };
  }, []);

  const handleOpenModal = (toy: TToy) => {
    setSelectedToy(toy);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedToy(null);
  };

  //!фильтруем поиск
  const filteredToys = toys.filter((toy) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    const title = t(toy.titleKey).toLowerCase();
    // const material = t(toy.characteristic.materialKey).toLowerCase();

    // return title.includes(query) || material.includes(query);
    return title.includes(query);
  });

  return (
    <>
      <div className={styles.error}>
        {/* ВЫВОДИМ ОШИБКУ КОРЗИНЫ */}
        {error && (
          <div className={styles.errorHome}>
            <strong className={styles.errorText}>⚠️ {error}</strong>

            <Button
              className={styles.errorButton}
              variant="error"
              onClick={() => setError(null)} // Очищаем ошибку по клику
            >
              {t('error.retry') ?? 'Попробовать снова'}
            </Button>
          </div>
        )}
      </div>

      <ControlPanel />
      <Banner />
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        // onSearchInput={filterProduct}
      />

      <div className={styles.cardsHome}>
        {filteredToys.map((toy) => (
          <Cards
            key={toy.id}
            toy={toy} // ← передаём игрушку
            onCardClick={handleOpenModal} // ← открываем модалку
          />
        ))}
      </div>

      {/* Модальное окно */}
      {isModalOpen && selectedToy && (
        <ModalDescriptionToy
          title={selectedToy.titleKey}
          toyImage={selectedToy.toyImage}
          toy={selectedToy}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
