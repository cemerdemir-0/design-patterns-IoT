import React from 'react';
import './Navigation.css';

const Navigation = ({ currentScreen, setCurrentScreen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Ana Sayfa', icon: '🏠' },
    { id: 'routines', label: 'Rutinler', icon: '⚡' },
    { id: 'logs', label: 'Günlük', icon: '📋' },
    { id: 'settings', label: 'Ayarlar', icon: '⚙️' }
  ];

  return (
    <nav className="navigation">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-item ${currentScreen === item.id ? 'active' : ''}`}
          onClick={() => setCurrentScreen(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
