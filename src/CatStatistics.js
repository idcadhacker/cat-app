import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

let myChart; // Přidejte tuto řádku

const CatStatistics = () => {
  const [breedsData, setBreedsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);
        console.log(response.data); // Log the response data
        setBreedsData(response.data);
      } catch (error) {
        console.error('Error fetching breed data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (breedsData.length > 0) {
      renderChart();
    }
  }, [breedsData]);

  const renderChart = () => {
    const ctx = document.getElementById('breedChart').getContext('2d');

    if (myChart) {  // Přidejte tuto část
      myChart.destroy();
    }

    const breedNames = breedsData.map(breed => breed.name);
    const breedPopularity = breedsData.map(breed => breed.vcahospitals_url ? breed.vcahospitals_url.length : 0); // You can use any relevant data for popularity

    myChart = new Chart(ctx, { // Změňte tuto řádku
      type: 'bar',
      data: {
        labels: breedNames,
        datasets: [{
          label: 'Breed Popularity',
          data: breedPopularity,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div>
      <h2>Cat Breed Popularity Chart</h2>
      <canvas id="breedChart" width="400" height="200"></canvas>
    </div>
  );
};

export default CatStatistics;