import classNames from 'classnames';
import sunshine from '@images/sunshine.webp';
import moon from '@images/moon.webp';
import { useTheme } from '@/context/ThemeContext/ThemeContext';
import { Button, LanguageDropdown } from '../index';
import styles from './ControlPanel.module.scss';

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

      {/* 🌍 Выпадающий список языков */}
      <LanguageDropdown />
    </section>
  );
};
