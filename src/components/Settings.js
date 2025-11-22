import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = ({ darkMode, setDarkMode }) => {
  const [userName, setUserName] = useState('');
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('userName') || 'Cem';
    setUserName(savedName);
    setTempName(savedName);
  }, []);

  const handleSaveName = () => {
    localStorage.setItem('userName', tempName);
    setUserName(tempName);
  };

  const handleToggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Ayarlar</h1>
        <p>Uygulamayı kişiselleştir</p>
      </div>

      <div className="settings-content">
        <div className="setting-section">
          <div className="setting-header">
            <h3>Görünüm</h3>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">{darkMode ? '🌙' : '☀️'}</div>
              <div>
                <div className="setting-label">Karanlık Mod</div>
                <div className="setting-description">
                  {darkMode ? 'Karanlık tema aktif' : 'Aydınlık tema aktif'}
                </div>
              </div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={darkMode}
                onChange={handleToggleDarkMode}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="setting-section">
          <div className="setting-header">
            <h3>Kişiselleştirme</h3>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">👤</div>
              <div style={{ flex: 1 }}>
                <div className="setting-label">İsim</div>
                <input 
                  type="text" 
                  className="name-input"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="İsminizi girin"
                />
              </div>
            </div>
            <button className="save-button" onClick={handleSaveName}>
              Kaydet
            </button>
          </div>
        </div>

        <div className="setting-section">
          <div className="setting-header">
            <h3>Hakkında</h3>
          </div>
          
          <div className="setting-item-static">
            <div className="setting-icon">📱</div>
            <div>
              <div className="setting-label">Versiyon</div>
              <div className="setting-description">1.0.0</div>
            </div>
          </div>

          <div className="setting-item-static">
            <div className="setting-icon">🎓</div>
            <div>
              <div className="setting-label">Proje</div>
              <div className="setting-description">Design Patterns - IoT Home Automation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
