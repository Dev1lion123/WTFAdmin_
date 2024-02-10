import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import Menu from "../Menu/Menu.js";
import './header-style.css'

const logo = <FontAwesomeIcon icon={faCode} color="#64ffda" size="2x" />;

const Header = () => {
  useEffect(() => {
    function myHeader() {
      var prevScrollPos = window.scrollY;
      window.onscroll = function () {
        let header = document.querySelector(".header");

        var currentScrollPos = window.scrollY;
        if (prevScrollPos > currentScrollPos) {
          header.style.top = "0";

          header.style.transition = "all .7s ease-out";
        } else {
          document.querySelector(".header").style.top = "-100px";
        }
        prevScrollPos = currentScrollPos;
      };
    }

    myHeader();

    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <div>
      <header className="header">
        <div className="header__container">
          <a href="#" className="header__logo">
            {logo}
          </a>
          <Menu />
        </div>
      </header>
    </div>
  );
};

export default Header;