import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    temperature: 18,
    condition: 'clear',
    location: 'İstanbul'
  });

  useEffect(() => {
    // Simulated weather updates
    const conditions = ['clear', 'cloudy', 'rainy', 'sunny'];
    const interval = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temperature: Math.floor(Math.random() * 15) + 15,
        condition: conditions[Math.floor(Math.random() * conditions.length)]
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'clear': return '🌙';
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      default: return '🌤️';
    }
  };

  return (
    <div className="weather-widget">
      <div className="weather-icon">{getWeatherIcon(weather.condition)}</div>
      <div className="weather-info">
        <div className="weather-temp">{weather.temperature}°C</div>
        <div className="weather-location">{weather.location}</div>
        <div className="weather-condition">{weather.condition}</div>
      </div>
    </div>
  );
};

export default WeatherWidget;
