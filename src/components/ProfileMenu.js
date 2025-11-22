import React, { useState, useEffect } from 'react';
import './ProfileMenu.css';

const ProfileMenu = ({ onClose }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [devices, setDevices] = useState([]);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceType, setNewDeviceType] = useState('light');

  useEffect(() => {
    const savedName = localStorage.getItem('userName') || 'Cem';
    const savedEmail = localStorage.getItem('userEmail') || 'cem@example.com';
    setUserName(savedName);
    setUserEmail(savedEmail);

    const savedDevices = JSON.parse(localStorage.getItem('userDevices') || '[]');
    setDevices(savedDevices);
  }, []);

  const deviceTypes = [
    { value: 'light', label: 'Işık', icon: '💡' },
    { value: 'thermostat', label: 'Termostat', icon: '🌡️' },
    { value: 'curtain', label: 'Perde', icon: '🪟' },
    { value: 'window', label: 'Pencere', icon: '🏠' },
    { value: 'door', label: 'Kapı', icon: '🚪' },
    { value: 'camera', label: 'Kamera', icon: '📹' }
  ];

  const handleAddDevice = () => {
    if (newDeviceName) {
      const newDevice = {
        id: Date.now(),
        name: newDeviceName,
        type: newDeviceType,
        status: 'off',
        addedAt: new Date().toISOString()
      };
      const updatedDevices = [...devices, newDevice];
      setDevices(updatedDevices);
      localStorage.setItem('userDevices', JSON.stringify(updatedDevices));
      setNewDeviceName('');
      setNewDeviceType('light');
    }
  };

  const handleDeleteDevice = (id) => {
    const updatedDevices = devices.filter(device => device.id !== id);
    setDevices(updatedDevices);
    localStorage.setItem('userDevices', JSON.stringify(updatedDevices));
  };

  const getDeviceIcon = (type) => {
    const device = deviceTypes.find(d => d.value === type);
    return device ? device.icon : '📱';
  };

  const getDeviceLabel = (type) => {
    const device = deviceTypes.find(d => d.value === type);
    return device ? device.label : type;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>👤 Profil</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="profile-section">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="profile-info">
              <h3>{userName}</h3>
              <p>{userEmail}</p>
            </div>
          </div>

          <div className="devices-section">
            <h3>🏠 IoT Cihazlarım ({devices.length})</h3>
            
            {devices.length === 0 ? (
              <div className="empty-state">
                <p>Henüz cihaz eklenmemiş</p>
              </div>
            ) : (
              <div className="devices-list">
                {devices.map(device => (
                  <div key={device.id} className="device-item">
                    <div className="device-item-info">
                      <span className="device-item-icon">{getDeviceIcon(device.type)}</span>
                      <div>
                        <div className="device-item-name">{device.name}</div>
                        <div className="device-item-type">{getDeviceLabel(device.type)}</div>
                      </div>
                    </div>
                    <button 
                      className="delete-device-btn"
                      onClick={() => handleDeleteDevice(device.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="add-device-form">
              <h4>Yeni Cihaz Ekle</h4>
              <input
                type="text"
                placeholder="Cihaz adı (örn: Mutfak Lambası)"
                value={newDeviceName}
                onChange={(e) => setNewDeviceName(e.target.value)}
                className="device-input"
              />
              <select
                value={newDeviceType}
                onChange={(e) => setNewDeviceType(e.target.value)}
                className="device-select"
              >
                {deviceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
              <button 
                className="add-device-btn"
                onClick={handleAddDevice}
                disabled={!newDeviceName}
              >
                Cihaz Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
