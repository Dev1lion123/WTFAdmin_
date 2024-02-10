import React from "react";
import { useTranslation } from 'react-i18next';
import Form from "../Form";
import './contacts-style.css'

const Contacts = () => {
  const {t, i18n} = useTranslation()
  return (
    <div>
      <section className="page__section contact-section">
        <h2 className="page__subtitle section-subtitle contact-subtitle element-animation">
          {t('post.header')}
        </h2>
        <Form />
      </section>
    </div>
  );
};

export default Contacts;
