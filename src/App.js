import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'live_jZrB6GVpb0hgmcPctleEBMRS6BHkFom7nxAa1I5HKIAejLwZ3dq5BFQ1BJ8WnSi6';

const CatApp = () => {
  const [catData, setCatData] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=6', {
          headers: {
            'x-api-key': API_KEY,
          },
        });
        const catsWithBreeds = response.data.filter(cat => cat.breeds && cat.breeds.length > 0);
        
        setCatData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      // Refresh data after voting
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=6', {
        headers: {
          'x-api-key': API_KEY,
        },
      });
      setCatData(response.data);
    } catch (error) {
      console.error('Error voting for cat:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Random Cat Breeds</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridGap: '20px' }}>
          {catData.map(cat => (
            <div key={cat.id} style={{ cursor: 'pointer', border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden', transition: 'transform 0.3s ease' }} onClick={() => handleCatClick(cat.id)}>
              <img src={cat.url} alt="Cat" style={{ width: '100%', height: 'auto' }} />
              <div style={{ padding: '10px' }}>
                <p style={{ fontWeight: 'bold', margin: '0' }}>{cat.breeds && cat.breeds.length > 0 ? cat.breeds[0].name : 'Unknown'}</p>
                {selectedCat && selectedCat.id === cat.id && (
                  <div style={{ marginTop: '20px' }}>
                    <h2>{selectedCat.breeds && selectedCat.breeds.length > 0 ? selectedCat.breeds[0].name : 'Unknown'}</h2>
                    <p>{selectedCat.breeds && selectedCat.breeds.length > 0 ? selectedCat.breeds[0].description : 'Description not available'}</p>
                    <div style={{ marginTop: '10px' }}>
                      <button style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleVote('upvote', selectedCat.id)}>Upvote</button>
                      <button style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleVote('downvote', selectedCat.id)}>Downvote</button>
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
