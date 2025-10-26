import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './ControlPanel.module.scss';

import sunshine from '/images/sunshine.png';
import land from '/images/land.png';
import moon from '/images/moon.png';
import { Button } from '../Button';
import { useTheme } from '../ThemeContext/ThemeContext';

export const ControlPanel = () => {
  const { theme, setTheme } = useTheme(); // ✅подключаем ThemeContext переключение тем

  return (
    <section className={styles.controlPanel}>
      <div className={styles.lightDark}>
        <Button
          variant="toggle"
          className={classNames(
            styles.button,
            theme === 'light' && styles.activeButton
          )}
          onClick={() => setTheme('light')}
        >
          <img className={styles.img} src={sunshine} alt="Солнышко" />
        </Button>
        <Button
          variant="toggle"
          className={classNames(
            styles.button,
            theme === 'dark' && styles.activeButton
          )}
          onClick={() => setTheme('dark')}
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
