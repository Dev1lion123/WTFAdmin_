import React from "react";
import { useTranslation } from "react-i18next";
import './languageSwitcher.css'

const locales = {
  en: { title: "English" },
  ru: { title: "Русский" },
};

const LanguageSwitcher = ({ i18n }) => {
  const { t } = useTranslation();

  const handleLanguageChange = (locale) => {
    i18n.changeLanguage(locale);
  };

  return (
    <li>
      <label
        className={`switch ${i18n.language === "ru" ? "active" : ""}`}
        htmlFor="languageSwitch"
      >
        <input
          type="checkbox"
          checked={i18n.language === "ru"}
          onChange={() =>
            handleLanguageChange(i18n.language === "ru" ? "en" : "ru")
          }
          id="languageSwitch"
        />
        <span className="slider round"></span>
      </label>
      <span className="language-prefix">
        {t(i18n.language === "ru" ? "EN" : "RU")}
      </span>
    </li>
  );
};

export default LanguageSwitcher;
