import React, { useEffect } from "react";

import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../hooks/use-localstorage';
import i18n from '../../i18n';
import { changeLanguage } from "i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import '../Projects/projects.css'

function Menu() {
  useEffect(() => {
    const menuBody = document.querySelector(".menu__body");
    const iconMenu = document.querySelector(".menu__icon");

    const handleClick = (e) => {
      document.body.classList.toggle("_lock");
      iconMenu.classList.toggle("_active");
      menuBody.classList.toggle("_active");
    };

    if (iconMenu && menuBody) {
      iconMenu.addEventListener("click", handleClick);
    }

    return () => {
      if (iconMenu && menuBody) {
        iconMenu.removeEventListener("click", handleClick);
      }
    };
  }, []);

  // определение типа экрана
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    Blackberry: function () {
      return navigator.userAgent.match(/Blackberry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.Blackberry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  if (isMobile.any()) {
    document.body.classList.add("_touch");
  } else {
    document.body.classList.add("_pc");
  }
  useEffect(() => {
    const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

    if (menuLinks.length > 0) {
      menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
      });

      return () => {
        menuLinks.forEach(menuLink => {
          menuLink.removeEventListener('click', onMenuLinkClick);
        });
      };
    }
  }, []); // Зависимость пуста, чтобы useEffect выполнялся только один раз при монтировании компонента

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      if (gotoBlock) {
        const gotoBlockValue =
          gotoBlock.getBoundingClientRect().top +
          window.scrollY -
          document.querySelector("header").offsetHeight;

        window.scrollTo({
          top: gotoBlockValue,
          behavior: "smooth",
        });
        e.preventDefault();
      }
    }
  };


  const {t, i18n} = useTranslation()


  return (
    <div className="header__menu menu">
      <div className="menu__icon">
        <span></span>
      </div>
      <nav className="menu__body">
        <ul className="menu__list">
          {/* <li>
            <a data-goto=".about-section" href="#" className="menu__link link-ease-in-out">
              <span className="highlight link-hl">01.</span>{t('header.about')}
            </a>
          </li>
          <li>
            <a data-goto=".work-section" href="#" className="menu__link link-ease-in-out">
              <span className="highlight link-hl">02.</span>{t('header.projects')}
            </a>
          </li>
          <li>
            <a data-goto=".contact-section" href="#" className="menu__link link-ease-in-out">
              <span className="highlight link-hl">03.</span>{t('header.contact')}
            </a>
          </li> */}
          <li>
            <LanguageSwitcher i18n={i18n} />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
