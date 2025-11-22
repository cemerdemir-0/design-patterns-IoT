import React, { useState, useEffect } from 'react';
import './Logs.css';
import { LogManager } from '../patterns/LogManager';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const logManager = LogManager.getInstance();

  useEffect(() => {
    // Initial logs
    const initialLogs = [
      { id: 1, time: '07:00', message: 'Perdeler açıldı', type: 'info', icon: '🪟' },
      { id: 2, time: '07:05', message: 'Hava durumu güncellendi: Açık', type: 'info', icon: '☀️' },
      { id: 3, time: '08:30', message: 'Termostat 22°C\'ye ayarlandı', type: 'success', icon: '🌡️' },
      { id: 4, time: '12:15', message: 'Yağmur nedeniyle pencere otomatik kapatıldı', type: 'warning', icon: '🌧️' },
      { id: 5, time: '14:20', message: 'Kamera hareket algıladı', type: 'alert', icon: '📹' },
      { id: 6, time: '18:45', message: 'Gece modu etkinleştirildi', type: 'success', icon: '🌙' },
      { id: 7, time: '19:00', message: 'Tüm ışıklar kapatıldı', type: 'info', icon: '💡' },
      { id: 8, time: '19:05', message: 'Kapı kilitlendi', type: 'success', icon: '🚪' }
    ];
    
    setLogs(initialLogs);
    logManager.setLogs(initialLogs);

    // Subscribe to new logs
    const interval = setInterval(() => {
      const newLog = logManager.getLatestLog();
      if (newLog) {
        setLogs(prev => [newLog, ...prev]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getLogClass = (type) => {
    return `log-item ${type}`;
  };

  return (
    <div className="logs">
      <div className="logs-header">
        <h1>Aktivite Günlüğü</h1>
        <p>Sistem olaylarının kronolojik listesi</p>
      </div>

      <div className="logs-list">
        {logs.map(log => (
          <div key={log.id} className={getLogClass(log.type)}>
            <div className="log-icon">{log.icon}</div>
            <div className="log-content">
              <div className="log-message">{log.message}</div>
              <div className="log-time">{log.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logs;
