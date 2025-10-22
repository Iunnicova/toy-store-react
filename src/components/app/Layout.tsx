import { Outlet } from 'react-router-dom';
import {
  Header,
  Footer,
  Banner,
  Search,
  Cards,
  Content,
  ControlPanel,
  ModalDescriptionToy,
} from '../ui';
import {
  FOOTER_INFO,
  handleSubscribe,
  SOCIAL_LINKS,
} from '../../Constants/footerData';
import { useEffect, useState } from 'react';

export const Layout = () => {
  const currentYear = new Date().getFullYear();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToy, setSelectedToy] = useState<{
    title: string;
    price: number;
    toyImage: string;
  } | null>(null);

  //открытие модалки
  const handleOpenModal = (toy: any) => {
    setSelectedToy(toy);
    setIsModalOpen(true);
  };

  //закрытие модалки
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedToy(null);
  };

  return (
    <Content>
      <Header userName="" />
      <ControlPanel />
      <main>
        <Banner />
        <Search />
        <Cards onCardClick={handleOpenModal} />
        {/* вызов модалки */}
        {isModalOpen && selectedToy && (
          <ModalDescriptionToy
            title={selectedToy.title}
            onClose={handleCloseModal}
          >
            <img
              src={selectedToy.toyImage}
              alt={selectedToy.title}
              width="150"
            />
            <p>Цена: {selectedToy.price.toLocaleString('ru-RU')} ₽</p>
            <p>Описание: Это любимая игрушка каждого ребёнка 💕</p>
          </ModalDescriptionToy>
        )}
        <Outlet />
      </main>
      <Footer
        info={FOOTER_INFO}
        socialLinks={SOCIAL_LINKS}
        onSubscribe={handleSubscribe}
      />
    </Content>
  );
};

//! Footer
// info — текст для копирайта (© ...),
// socialLinks — список соцсетей,
// onSubscribe — функция, которая вызывается при нажатии на кнопку «Подписаться».

// //* Передаём колбэк для клика
//         <Cards onCardClick={handleOpenModal}/>
//  //* Если модалка открыта
//         {isModalOpen && selectedToy && (
//           <ModalDescriptionToy title={selectedToy.title} onClose={handleCloseModal}>
//             <img src={selectedToy.toyImage} alt={selectedToy.title} width="150" />
//             <p>Цена: {selectedToy.price.toLocaleString('ru-RU')} ₽</p>
//             <p>Описание: Это любимая игрушка каждого ребёнка 💕</p>
//           </ModalDescriptionToy>
//         )}
