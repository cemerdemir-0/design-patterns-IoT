import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import WeatherWidget from './WeatherWidget';
import DeviceCard from './DeviceCard';
import { DeviceMediator } from '../patterns/DeviceMediator';

const Dashboard = ({ onDeviceClick }) => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Living Room Light', type: 'light', status: 'off', brightness: 50 },
    { id: 2, name: 'Thermostat', type: 'thermostat', status: 'on', temperature: 22, mode: 'heat' },
    { id: 3, name: 'Bedroom Curtain', type: 'curtain', status: 'closed', openness: 0 },
    { id: 4, name: 'Front Window', type: 'window', status: 'closed', weatherProtection: true },
    { id: 5, name: 'Front Door', type: 'door', status: 'locked' },
    { id: 6, name: 'Security Camera', type: 'camera', status: 'on', recording: true, motion: false }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const mediator = DeviceMediator.getInstance();
    mediator.setDevices(devices);
    mediator.setUpdateCallback(setDevices);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('tr-TR', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    const userName = localStorage.getItem('userName') || 'Cem';
    
    if (hour >= 5 && hour < 12) {
      return `Günaydın, ${userName}`;
    } else if (hour >= 12 && hour < 18) {
      return `İyi günler, ${userName}`;
    } else if (hour >= 18 && hour < 22) {
      return `İyi akşamlar, ${userName}`;
    } else {
      return `İyi geceler, ${userName}`;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>{getGreeting()}</h1>
          <div className="date-time">
            <div className="time">{formatTime(currentTime)}</div>
            <div className="date">{formatDate(currentTime)}</div>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-button" onClick={() => window.dispatchEvent(new CustomEvent('openLocationManager'))}>
            📍
          </button>
          <button className="icon-button" onClick={() => window.dispatchEvent(new CustomEvent('openProfileMenu'))}>
            👤
          </button>
        </div>
      </div>

      <WeatherWidget />

      <div className="devices-section">
        <h2>Cihazlarım</h2>
        <div className="devices-grid">
          {devices.map(device => (
            <DeviceCard 
              key={device.id} 
              device={device} 
              onClick={() => onDeviceClick(device)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
