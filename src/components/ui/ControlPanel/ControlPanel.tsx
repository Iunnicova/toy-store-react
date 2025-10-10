import { TControlPanelProps } from "./type";
import styles from './ControlPanel.module.scss';
import { Link } from "react-router-dom";

import sunshine from '/images/sunshine.png';
import land from '/images/land.png';
import moon from '/images/moon.png';

export const ControlPanel = ({ theme, setTheme }: TControlPanelProps) => {
  return (
    <section className={styles.controlPanel}>

      <div className={styles.lightDark}>
        <button
          className={theme === 'light' ? styles.activeButton : ''}
          onClick={() => setTheme('light')}
        >
          <img className={styles.imgPanel} src={sunshine} alt="Солнышко" />
        </button>

        <button
          className={theme === 'dark' ? styles.activeButton : ''}
          onClick={() => setTheme('dark')}
        >
          <img className={styles.imgPanel} src={moon} alt="Луна" />
        </button>
      </div>

      {/* <div className={styles.languageСhange}>
        <button
          // className={theme === 'dark' ? styles.activeButton : ''}
          // onClick={() => setTheme('dark')}
        >
          <img className={styles.imgLand} src={land} alt="Земля" />
        </button>
      </div> */}
    </section>
  );
};