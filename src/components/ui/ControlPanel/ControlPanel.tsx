import { TControlPanelProps } from './type';
import styles from './ControlPanel.module.scss';
import { Link } from 'react-router-dom';

import sunshine from '/images/sunshine.png';
import land from '/images/land.png';
import moon from '/images/moon.png';
import { Button } from '../Button';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export const ControlPanel = ({ theme, setTheme }: TControlPanelProps) => {
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'; //1️⃣ смотрит, есть ли сохранённая тема в localStorage.Если есть — берёт её.Если нет — ставит 'light' по умолчанию.
  });

  // 2️⃣ Переключаем тему
  const toggleTheme = () => {
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    setActiveTheme(newTheme);
    localStorage.setItem('theme', newTheme); // сохраняем в localStorage
  };

  // 3️⃣ Применяем тему к <html> чтоб не дергалась пишем правило в html в public
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  return (
    <section className={styles.controlPanel}>
      <div className={styles.lightDark}>
        <Button
          variant="toggle"
          className={classNames(
            styles.button,
            activeTheme === 'light' && styles.activeButton
          )}
          onClick={toggleTheme}
        >
          <img className={styles.img} src={sunshine} alt="Солнышко" />
        </Button>
        <Button
          variant="toggle"
          className={classNames(
            styles.button,
            activeTheme === 'dark' && styles.activeButton
          )}
          onClick={toggleTheme}
        >
          <img className={styles.img} src={moon} alt="Луна" />
        </Button>
      </div>

      <Button variant="toggle">
        <img className={styles.img} src={land} alt="Земля" />
      </Button>
    </section>
  );
};

//! variant='toggle' //пропс из button позволяет менять стили в Bottom

// темы прописаны в variables.scss

//*  Хранение темы внутри компонента
//! const [activeTheme, setActiveTheme] = useState('light');
// useState —      //это ячейка памяти, которая хранит данные для этого компонента.
// activeTheme —      //текущая тема, она может быть 'light' или 'dark'.
// setActiveTheme —    //функция, чтобы менять activeTheme.
// 'light' в скобках — это значение по умолчанию, с чего начинается тема при загрузке.

//* Функция переключения темы
//! const toggleTheme = () => setActiveTheme(activeTheme === 'light' ? 'dark' : 'light');
// toggleTheme —     //кнопка переключает тему.
//* Если сейчас 'light', то переключает на 'dark'.
//* Если сейчас 'dark', то переключает на 'light'.
//* Символ ? : — это короткая запись if-else.

//* Синхронизация с HTML
//! useEffect(() => {
//!   document.documentElement.setAttribute('data-theme', activeTheme);
//! }, [activeTheme]);
// useEffect —    // это команда: "сделай это, когда что-то изменится".
//  когда activeTheme меняется, мы ставим атрибут data-theme на <html>.
// Это позволяет CSS применять светлую или тёмную тему.
// [activeTheme] — говорит React: "делай это каждый раз, когда activeTheme меняется".

//!сохранить выбранную тему при перезагрузке страницы.
//  localStorage — это как «жёсткий диск» внутри браузера: туда можно записать данные, и они не исчезнут при обновлении страницы
