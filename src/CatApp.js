import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import i18next from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

const API_KEY = 'live_jZrB6GVpb0hgmcPctleEBMRS6BHkFom7nxAa1I5HKIAejLwZ3dq5BFQ1BJ8WnSi6';

const CatApp = () => {
  const { t, i18n } = useTranslation();

  const [catData, setCatData] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [fontFamily, setFontFamily] = useState('Segoe UI');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = [];
        let remainingCards = 6;
        let page = 1;
        while (remainingCards > 0) {
          const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=6&page=${page}`, {
            headers: {
              'x-api-key': API_KEY,
            },
          });
          const catsWithBreeds = response.data.filter(cat => cat.breeds && cat.breeds.length > 0 && cat.breeds[0].description);
          fetchedData.push(...catsWithBreeds);
          remainingCards -= catsWithBreeds.length;
          page++;
        }
        setCatData(fetchedData.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  const handleCatClick = async (catId) => {
    try {
      const response = await axios.get(`https://api.thecatapi.com/v1/images/${catId}`, {
        headers: {
          'x-api-key': API_KEY,
        },
      });
      setSelectedCat(response.data);
    } catch (error) {
      console.error('Error fetching cat details:', error);
    }
  };

  const handleBack = () => {
    setSelectedCat(null);
  };

  const handleVote = async (voteType, catId) => {
    try {
      await axios.post(`https://api.thecatapi.com/v1/votes`, {
        image_id: catId,
        value: voteType === 'upvote' ? 1 : 0,
      }, {
        headers: {
          'x-api-key': API_KEY,
        },
      });
      const fetchedData = [];
      let remainingCards = 6;
      let page = 1;
      while (remainingCards > 0) {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=6&page=${page}`, {
          headers: {
            'x-api-key': API_KEY,
          },
        });
        const catsWithBreeds = response.data.filter(cat => cat.breeds && cat.breeds.length > 0 && cat.breeds[0].description);
        fetchedData.push(...catsWithBreeds);
        remainingCards -= catsWithBreeds.length;
        page++;
      }
      setCatData(fetchedData.slice(0, 6));
      // Fetch details for the selected cat again
      if (selectedCat) {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/${selectedCat.id}`, {
          headers: {
            'x-api-key': API_KEY,
          },
        });
        setSelectedCat(response.data);
      }
    } catch (error) {
      console.error('Error voting for cat:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleFontChange = (e) => {
    setFontFamily(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`} style={{ fontFamily: fontFamily }}>
      <h1>{t('random_cat_breeds')}</h1>
      <button className="mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? t('switch_to_light_mode') : t('switch_to_dark_mode')}
      </button>
      <select className="font-select" value={fontFamily} onChange={handleFontChange}>
        <option value="Segoe UI">Segoe UI</option>
        <option value="Arial">Arial</option>
        <option value="Roboto">Roboto</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
      </select>
      <select className="language-select" value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="es">Spanish</option>
        <option value="ru">Russian</option>
      </select>
      {loading ? (
        <p>{t('loading')}</p>
      ) : (
        <div className="cat-container">
          {catData.map(cat => (
            <div key={cat.id} className="cat-card" onClick={() => handleCatClick(cat.id)}>
              <img src={cat.url} alt="Cat" className="cat-image" />
              <div className="cat-details">
                <p className="cat-name">{cat.breeds[0].name}</p>
                {selectedCat && selectedCat.id === cat.id && (
                  <div className="additional-details">
                    <p className="cat-description">{cat.breeds[0].description}</p>
                    <div className="vote-buttons">
                      <button className="vote-button upvote" onClick={() => handleVote('upvote', selectedCat.id)}>{t('upvote')}</button>
                      <button className="vote-button downvote" onClick={() => handleVote('downvote', selectedCat.id)}>{t('downvote')}</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatApp;
