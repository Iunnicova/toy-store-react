import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './ControlPanel.module.scss';

import { TControlPanelProps } from './type';
import sunshine from '/images/sunshine.png';
import land from '/images/land.png';
import moon from '/images/moon.png';
import { Button } from '../Button';

export const ControlPanel = ({ theme, setTheme }: TControlPanelProps) => {

  // Применяем тему к <html> чтоб не дергалась пишем правило в html в public
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
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
