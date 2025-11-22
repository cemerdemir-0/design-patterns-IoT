import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import DeviceDetail from './components/DeviceDetail';
import Routines from './components/Routines';
import Logs from './components/Logs';
import Settings from './components/Settings';
import Navigation from './components/Navigation';
import LocationManager from './components/LocationManager';
import ProfileMenu from './components/ProfileMenu';

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showLocationManager, setShowLocationManager] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleOpenLocationManager = () => setShowLocationManager(true);
    const handleOpenProfileMenu = () => setShowProfileMenu(true);

    window.addEventListener('openLocationManager', handleOpenLocationManager);
    window.addEventListener('openProfileMenu', handleOpenProfileMenu);

    return () => {
      window.removeEventListener('openLocationManager', handleOpenLocationManager);
      window.removeEventListener('openProfileMenu', handleOpenProfileMenu);
    };
  }, []);

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
    setCurrentScreen('device-detail');
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
    setSelectedDevice(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onDeviceClick={handleDeviceClick} />;
      case 'device-detail':
        return <DeviceDetail device={selectedDevice} onBack={handleBack} />;
      case 'routines':
        return <Routines />;
      case 'logs':
        return <Logs />;
      case 'settings':
        return <Settings darkMode={darkMode} setDarkMode={setDarkMode} />;
      default:
        return <Dashboard onDeviceClick={handleDeviceClick} />;
    }
  };

  return (
    <div className="App">
      <div className={`app-container ${darkMode ? 'dark' : ''}`}>
        {renderScreen()}
        <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        
        {showLocationManager && (
          <LocationManager onClose={() => setShowLocationManager(false)} />
        )}
        
        {showProfileMenu && (
          <ProfileMenu onClose={() => setShowProfileMenu(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
