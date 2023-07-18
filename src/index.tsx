import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from "react-i18next";

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationMainEN from "intl/en/main.json";
import translationNavEN from "intl/en/nav.json";
import translationMainZH from "intl/zh/main.json";
import translationNavZH from "intl/zh/nav.json";

import {NotificationProvider} from 'providers/notificationProvider';

import './styles/main.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const resources = {
  en: {
    main: translationMainEN,
    nav: translationNavEN
  },
  zh: {
    main: translationMainZH,
    nav: translationNavZH
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

root.render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </I18nextProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
