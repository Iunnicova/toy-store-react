import { useState } from 'react';
import { TToy } from '../../../types/toysData';
import {
  Banner,
  Search,
  Cards,
  ModalDescriptionToy,
  ControlPanel,
} from '../../ui';
import { toys } from '../../../constants/toysData';

import styles from './HomePage.module.scss';

export const HomePage = () => {
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
