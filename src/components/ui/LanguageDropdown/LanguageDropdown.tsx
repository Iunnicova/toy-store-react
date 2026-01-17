// components/LanguageDropdown/LanguageDropdown.tsx
import i18n from '../../../i18n';
import { useState } from 'react';
import { Language, useLanguage } from '../../../context/LanguageContext';

import landRu from '../../../../images/landRu.png';
import landSr from '../../../../images/landSr.png';
import landEn from '../../../../images/landEn.png';
import { Button } from '../Button';
import styles from './LanguageDropdown.module.scss';

const languages = [
  { code: 'ru', label: '', image: landRu },
  { code: 'sr', label: '', image: landSr },
  { code: 'en', label: '', image: landEn },
] as const;

export const LanguageDropdown = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language);
  const availableLanguages = languages.filter((l) => l.code !== language);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      {/* 🌍 Кнопка с текущим языком */}
      <Button
        variant="toggle"
        className={styles.earth}
        onClick={() => setOpen(!open)}
        aria-label="Выбрать язык"
      >
        {currentLang && <img src={currentLang.image} alt={currentLang.label} />}
      </Button>

      {/* 🫧 Выпадающий список с двумя другими языками */}
      {open && (
        <div className={styles.dropdown}>
          {availableLanguages.map(({ code, label, image }) => (
            <Button
              variant="toggle"
              key={code}
              onClick={() => handleSelect(code)}
              className={styles.option}
            >
              <img src={image} alt={label} />
              <span>{label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
