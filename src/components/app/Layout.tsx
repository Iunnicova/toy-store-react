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
} from '../../constants/footerData';
import { useEffect, useState } from 'react';
import { TToy } from '../../types/toysData';

export const Layout = () => {
  const currentYear = new Date().getFullYear();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedToy, setSelectedToy] = useState<TToy | null>(null);

  //открытие модалки
  const handleOpenModal = (toy: TToy) => {
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
              toyImage={selectedToy.toyImage} // передаем картинку напрямую
            onClose={handleCloseModal}
          >
            <div>
            <img src={selectedToy.toyImage} alt={selectedToy.title} />
  <p>{`Описание: ${selectedToy.description ?? ''}  Подходит для игр, сна, украшения комнаты и как антистресс. Игрушка легко стирается и сохраняет форму — мамы оценят! Прекрасный подарок на день рождения, праздник или просто для радости.`}</p>
</div>
            <p>Цена: {selectedToy.price.toLocaleString('ru-RU')} ₽</p>
            <p>Размер: {selectedToy.characteristic.size} см</p>
            <p>Материал: {selectedToy.characteristic.material}</p>
            <p>Наполнитель: {selectedToy.characteristic.filler}</p>
            <p>Возраст: {selectedToy.characteristic.age}</p>
            <p>Упаковка: {selectedToy.characteristic.packaging}</p>

          
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

//! {`Описание: ${selectedToy.description ?? ''}
// ${selectedToy.description ?? ''}
// Берём описание конкретной игрушки.
// Если selectedToy.description undefined или null, вместо него подставится пустая строка ''.
// Это защита от ошибок, если вдруг у игрушки нет описания.

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
