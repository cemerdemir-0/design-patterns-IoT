import React, { useState, useEffect } from 'react';
import './LocationManager.css';

const LocationManager = ({ onClose }) => {
  const [locations, setLocations] = useState([]);
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationAddress, setNewLocationAddress] = useState('');

  useEffect(() => {
    const savedLocations = JSON.parse(localStorage.getItem('locations') || '[]');
    if (savedLocations.length === 0) {
      const defaultLocations = [
        { id: 1, name: 'Ev', address: 'İstanbul, Türkiye', isDefault: true }
      ];
      setLocations(defaultLocations);
      localStorage.setItem('locations', JSON.stringify(defaultLocations));
    } else {
      setLocations(savedLocations);
    }
  }, []);

  const handleAddLocation = () => {
    if (newLocationName && newLocationAddress) {
      const newLocation = {
        id: Date.now(),
        name: newLocationName,
        address: newLocationAddress,
        isDefault: locations.length === 0
      };
      const updatedLocations = [...locations, newLocation];
      setLocations(updatedLocations);
      localStorage.setItem('locations', JSON.stringify(updatedLocations));
      setNewLocationName('');
      setNewLocationAddress('');
    }
  };

  const handleDeleteLocation = (id) => {
    const updatedLocations = locations.filter(loc => loc.id !== id);
    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
  };

  const handleSetDefault = (id) => {
    const updatedLocations = locations.map(loc => ({
      ...loc,
      isDefault: loc.id === id
    }));
    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📍 Konumlar</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="locations-list">
            {locations.map(location => (
              <div key={location.id} className="location-item">
                <div className="location-info">
                  <div className="location-icon">
                    {location.isDefault ? '🏠' : '📍'}
                  </div>
                  <div className="location-details">
                    <div className="location-name">{location.name}</div>
                    <div className="location-address">{location.address}</div>
                  </div>
                </div>
                <div className="location-actions">
                  {!location.isDefault && (
                    <button 
                      className="set-default-btn"
                      onClick={() => handleSetDefault(location.id)}
                    >
                      Varsayılan Yap
                    </button>
                  )}
                  {location.isDefault && (
                    <span className="default-badge">Varsayılan</span>
                  )}
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteLocation(location.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="add-location-form">
            <h3>Yeni Konum Ekle</h3>
            <input
              type="text"
              placeholder="Konum adı (örn: Ev, İş Yeri)"
              value={newLocationName}
              onChange={(e) => setNewLocationName(e.target.value)}
              className="location-input"
            />
            <input
              type="text"
              placeholder="Adres"
              value={newLocationAddress}
              onChange={(e) => setNewLocationAddress(e.target.value)}
              className="location-input"
            />
            <button 
              className="add-location-btn"
              onClick={handleAddLocation}
              disabled={!newLocationName || !newLocationAddress}
            >
              Konum Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationManager;
