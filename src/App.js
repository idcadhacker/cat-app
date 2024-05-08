import React from 'react';
import './App.css';
import CatApp from './CatApp';
import CatStatistics from './CatStatistics';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          random_cat_breeds: 'Random Cat Breeds',
          switch_to_light_mode: 'Switch to Light Mode',
          switch_to_dark_mode: 'Switch to Dark Mode',
          loading: 'Loading...',
          upvote: 'Upvote',
          downvote: 'Downvote',
        },
      },
      fr: {
        translation: {
          random_cat_breeds: 'Races de chats aléatoires',
          switch_to_light_mode: 'Passer en mode clair',
          switch_to_dark_mode: 'Passer en mode sombre',
          loading: 'Chargement...',
          upvote: 'Voter pour',
          downvote: 'Voter contre',
        },
      },
      de: {
        translation: {
          random_cat_breeds: 'Zufällige Katzenrassen',
          switch_to_light_mode: 'Zum hellen Modus wechseln',
          switch_to_dark_mode: 'Zum dunklen Modus wechseln',
          loading: 'Wird geladen...',
          upvote: 'Upvote',
          downvote: 'Downvote',
        },
      },
      es: {
        translation: {
          random_cat_breeds: 'Razas de gatos al azar',
          switch_to_light_mode: 'Cambiar a modo claro',
          switch_to_dark_mode: 'Cambiar a modo oscuro',
          loading: 'Cargando...',
          upvote: 'Upvote',
          downvote: 'Downvote',
        },
      },
      ru: {
        translation: {
          random_cat_breeds: 'Случайные породы кошек',
          switch_to_light_mode: 'Переключиться на светлый режим',
          switch_to_dark_mode: 'Переключиться на темный режим',
          loading: 'Загрузка...',
          upvote: 'Upvote',
          downvote: 'Downvote',
        },
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

function App() {
  return (
    <div className="App">
      <CatApp />
      <CatStatistics />
    </div>
  );
}

export default App;
