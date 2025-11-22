import React from 'react';
import './DeviceCard.css';

const DeviceCard = ({ device, onClick }) => {
  const getDeviceIcon = (type) => {
    switch (type) {
      case 'light': return '💡';
      case 'thermostat': return '🌡️';
      case 'curtain': return '🪟';
      case 'window': return '🏠';
      case 'door': return '🚪';
      case 'camera': return '📹';
      default: return '📱';
    }
  };

  const getStatusText = (device) => {
    switch (device.type) {
      case 'light':
        return device.status === 'on' ? 'Açık' : 'Kapalı';
      case 'thermostat':
        return `${device.temperature}°C`;
      case 'curtain':
        return device.status === 'open' ? 'Açık' : 'Kapalı';
      case 'window':
        return device.status === 'open' ? 'Açık' : 'Kapalı';
      case 'door':
        return device.status === 'locked' ? 'Kilitli' : 'Açık';
      case 'camera':
        return device.recording ? 'Kayıt' : 'Kapalı';
      default:
        return device.status;
    }
  };

  const isActive = () => {
    if (device.type === 'door') return device.status === 'locked';
    if (device.type === 'camera') return device.recording;
    return device.status === 'on' || device.status === 'open';
  };

  return (
    <div 
      className={`device-card ${isActive() ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="device-icon">{getDeviceIcon(device.type)}</div>
      <div className="device-info">
        <div className="device-name">{device.name}</div>
        <div className="device-status">{getStatusText(device)}</div>
      </div>
    </div>
  );
};

export default DeviceCard;
