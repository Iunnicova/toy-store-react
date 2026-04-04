import {
  ControlPanel,
  Banner,
  Search,
  Cards,
  ModalDescriptionToy,
  Button,
  InputToy,
} from '@/components/ui';
import { TToy } from '@/types/toysData';
import { useState, useEffect } from 'react';

import styles from './HomePage.module.scss';
import { useCartContext } from '@/context/CartContex';
import { t } from 'i18next';

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToy, setSelectedToy] = useState<TToy | null>(null);

  ///добавляем карточки через db.jso
  const [toys, setToys] = useState<TToy[]>([]); // состояние игрушек
  const [loading, setLoading] = useState(true); // loading — текущее значение (true/false) setLoading — функция, которая меняет это значение

  const { error, setError } = useCartContext();

  //кнопка поиска
const filterProduct = (query: string) => {
  console.log(`Поиск: ${query}`)
}

// удаление в инпуте подписка
const deleteTitle = () => {
  console.log('удалить')
}



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

  //******* */

  const handleOpenModal = (toy: TToy) => {
    setSelectedToy(toy);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedToy(null);
  };

  return (
    <>
      <div className={styles.error}>
        {/* ВЫВОДИМ ОШИБКУ КОРЗИНЫ ТУТ */}
        {error && (
          <div className={styles.errorHome}>
            <strong className={styles.errorText}>⚠️ {error}</strong>

            <Button
              className={styles.errorButton}
              variant="error"
              onClick={() => setError(null)} // Очищаем ошибку по клику
              // onDeleteTitle = {deleteTitle}
            >
              {t('error.retry') ?? 'Попробовать снова'}
            </Button>
          </div>
        )}
      </div>

      <ControlPanel />
      <Banner />
      <Search 
      onSearchInput={filterProduct}
      />

      <div className={styles.cardsHome}>
        {toys.map((toy) => (
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
