import { useState } from 'react';
import { TToy } from '../../types/toysData';
import {
  Banner,
  Search,
  Cards,
  ModalDescriptionToy,
  ControlPanel,
} from '../ui';

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
      <Cards onCardClick={handleOpenModal} />

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

// import { Outlet } from 'react-router-dom';
// import {
//   Header,
//   Footer,
//   Banner,
//   Search,
//   Cards,
//   Content,
//   ControlPanel,
//   ModalDescriptionToy,
// } from '../ui';

// import {
//   FOOTER_INFO,
//   handleSubscribe,
//   SOCIAL_LINKS,
// } from '../../constants/footerData';
// import { useEffect, useState } from 'react';
// import { TToy } from '../../types/toysData';
// import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage';

// export const Layout = () => {
//   const currentYear = new Date().getFullYear();

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [selectedToy, setSelectedToy] = useState<TToy | null>(null);

//   //открытие модалки
//   const handleOpenModal = (toy: TToy) => {
//     setSelectedToy(toy);
//     setIsModalOpen(true);
//   };

//   //закрытие модалки
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedToy(null);
//   };

//   return (
//     <Content>
//       <Header userName="" />

//       <ControlPanel />
//       <main>
//         <Outlet />
//         <Banner />
//         <Search />
//         <Cards onCardClick={handleOpenModal} />

//         {/* вызов модалки */}
//         {isModalOpen && selectedToy && (
//           <ModalDescriptionToy
//             title={selectedToy.titleKey}
//             toyImage={selectedToy.toyImage}
//             toy={selectedToy}
//             onClose={handleCloseModal}
//           />
//         )}

//       </main>
//       <Footer
//         info={FOOTER_INFO}
//         socialLinks={SOCIAL_LINKS}
//         onSubscribe={handleSubscribe}
//       />
//     </Content>
//   );
// };
