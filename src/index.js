import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import IPORecommendationSystem from './IPORecommendationSystem'; // Ensure the path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IPORecommendationSystem />
  </React.StrictMode>
);