import { TControlPanelProps } from './type';
import styles from './ControlPanel.module.scss';
import { Link } from 'react-router-dom';

import sunshine from '/images/sunshine.png';
import land from '/images/land.png';
import moon from '/images/moon.png';
import { Button } from '../Button';
import { useState } from 'react';
import classNames from 'classnames';

export const ControlPanel = ({ theme, setTheme }: TControlPanelProps) => {
  const [activeTheme, setActiveTheme] = useState('light');
  const toggleTheme = () =>
    setActiveTheme(activeTheme === 'light' ? 'dark' : 'light');

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

{
  /* <div className={styles.languageСhange}>
        <button
          // className={theme === 'dark' ? styles.activeButton : ''}
          // onClick={() => setTheme('dark')}
        >
          <img className={styles.imgLand} src={land} alt="Земля" />
        </button>
      </div> */
}
