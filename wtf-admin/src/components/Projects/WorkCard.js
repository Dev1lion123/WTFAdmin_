import React from "react";
import Image from "../Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const arrow = <FontAwesomeIcon icon={faArrowRight} color="#64ffda" size="1x" />

let WorkCard = () => {
  return (
    <div className="work__card element-animation">
      <Image />
        <div className="card__info">
          <div class="link-ease-in-out">
            <a className="card__header" href="https://penduloconelena.com/" target="_blank">Why psychotherapy matters?</a>
          </div>
          <p className="card__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sunt
            obcaecati voluptas, accusamus, dolore velit rerum porro debitis eum,
            consectetur aliquam dicta facilis recusandae quas voluptatum pariatur
            vero assumenda quidem quibusdam ipsam. Adipisci sapiente placeat
            labore quo pariatur, voluptatem voluptates? Vero unde, voluptatem quod
            et dolor placeat illum atque assumenda
          </p>
        </div>
    </div>
  );
};


export default WorkCard