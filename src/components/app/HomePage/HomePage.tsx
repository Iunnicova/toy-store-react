import { useEffect, useState } from 'react';
import { TToy } from '../../../types/toysData';
import {
  Banner,
  Search,
  Cards,
  ModalDescriptionToy,
  ControlPanel,
} from '../../ui';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToy, setSelectedToy] = useState<TToy | null>(null);

  ///добавляем карточки через db.jso
  const [toys, setToys] = useState<TToy[]>([]); // состояние игрушек
  const [loading, setLoading] = useState(true); // loading — текущее значение (true/false) setLoading — функция, которая меняет это значение

  useEffect(() => {
    fetch('http://localhost:3001/toys')
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка загрузки игрушек:', err);
        setLoading(false); // даже при ошибке скрываем лоадер
      });
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
      <ControlPanel />
      <Banner />
      <Search />
      <div className={styles.cardsGrid}>
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
