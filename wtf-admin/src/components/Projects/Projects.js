import React from "react";
import WorkCard from "./WorkCard";
import { useTranslation } from 'react-i18next';
import './projects.css'

const Projects = () => {
  const {t, i18n} = useTranslation()
  return (
    <div>
      <section className="page__section work-section work__subtitle">
        <h2 className="page__subtitle element-animation">
          <span className="highlight link-hl">02.</span>{t('project.title')}
        </h2>
        <WorkCard />
      </section>
    </div>
  );
};

export default Projects;
