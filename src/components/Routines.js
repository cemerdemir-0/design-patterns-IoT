import React, { useState } from 'react';
import './Routines.css';
import { RoutineManager } from '../patterns/RoutineManager';

const Routines = () => {
  const [activeRoutine, setActiveRoutine] = useState(null);
  const routineManager = RoutineManager.getInstance();

  const routines = [
    {
      id: 'morning',
      name: 'Sabah Modu',
      icon: '🌅',
      description: 'Perdeleri aç, ışıkları yak, termostatı 22°C\'ye ayarla',
      actions: ['Perdeler açılıyor', 'Işıklar açılıyor', 'Termostat ayarlanıyor']
    },
    {
      id: 'night',
      name: 'Gece Modu',
      icon: '🌙',
      description: 'Tüm ışıkları kapat, perdeleri kapat, kapıyı kilitle',
      actions: ['Işıklar kapatılıyor', 'Perdeler kapatılıyor', 'Kapı kilitleniyor']
    },
    {
      id: 'away',
      name: 'Dışarıda Modu',
      icon: '🏃',
      description: 'Tüm cihazları kapat, kamerayı aç, kapıyı kilitle',
      actions: ['Cihazlar kapatılıyor', 'Kamera açılıyor', 'Kapı kilitleniyor']
    },
    {
      id: 'home',
      name: 'Evde Modu',
      icon: '🏠',
      description: 'Işıkları aç, termostatı ayarla, perdeleri yarı aç',
      actions: ['Işıklar açılıyor', 'Termostat ayarlanıyor', 'Perdeler ayarlanıyor']
    }
  ];

  const handleRoutineClick = (routine) => {
    setActiveRoutine(routine.id);
    routineManager.executeRoutine(routine.id);
    
    setTimeout(() => {
      setActiveRoutine(null);
    }, 2000);
  };

  return (
    <div className="routines">
      <div className="routines-header">
        <h1>Rutinler</h1>
        <p>Önceden tanımlanmış otomasyon rutinleri</p>
      </div>

      <div className="routines-list">
        {routines.map(routine => (
          <div 
            key={routine.id}
            className={`routine-card ${activeRoutine === routine.id ? 'active' : ''}`}
            onClick={() => handleRoutineClick(routine)}
          >
            <div className="routine-icon">{routine.icon}</div>
            <div className="routine-info">
              <h3>{routine.name}</h3>
              <p>{routine.description}</p>
              {activeRoutine === routine.id && (
                <div className="routine-actions">
                  {routine.actions.map((action, index) => (
                    <div key={index} className="action-item">✓ {action}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Routines;
