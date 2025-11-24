import React, { useState } from 'react';
import './DeviceDetail.css';
import { CommandInvoker } from '../patterns/CommandInvoker';
import { 
  TurnOnCommand, 
  TurnOffCommand, 
  SetBrightnessCommand,
  SetTemperatureCommand,
  OpenCommand,
  CloseCommand,
  LockCommand,
  UnlockCommand
} from '../patterns/Commands';

const DeviceDetail = ({ device, onBack }) => {
  const [deviceState, setDeviceState] = useState(device);
  const invoker = CommandInvoker.getInstance();

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

  const handleToggle = () => {
    const command = deviceState.status === 'on' 
      ? new TurnOffCommand(deviceState)
      : new TurnOnCommand(deviceState);
    
    invoker.executeCommand(command);
    setDeviceState({ ...deviceState, status: deviceState.status === 'on' ? 'off' : 'on' });
  };

  const handleBrightnessChange = (value) => {
    const command = new SetBrightnessCommand(deviceState, parseInt(value));
    invoker.executeCommand(command);
    setDeviceState({ ...deviceState, brightness: parseInt(value) });
  };

  const handleTemperatureChange = (delta) => {
    const newTemp = deviceState.temperature + delta;
    if (newTemp >= 16 && newTemp <= 30) {
      const command = new SetTemperatureCommand(deviceState, newTemp);
      invoker.executeCommand(command);
      setDeviceState({ ...deviceState, temperature: newTemp });
    }
  };

  const handleModeChange = (mode) => {
    setDeviceState({ ...deviceState, mode });
  };

  const handleCurtainToggle = () => {
    const command = deviceState.status === 'open'
      ? new CloseCommand(deviceState)
      : new OpenCommand(deviceState);
    
    invoker.executeCommand(command);
    setDeviceState({ 
      ...deviceState, 
      status: deviceState.status === 'open' ? 'closed' : 'open',
      openness: deviceState.status === 'open' ? 0 : 100
    });
  };

  const handleOpennessChange = (value) => {
    setDeviceState({ ...deviceState, openness: parseInt(value) });
  };

  const handleDoorToggle = () => {
    const command = deviceState.status === 'locked'
      ? new UnlockCommand(deviceState)
      : new LockCommand(deviceState);
    
    invoker.executeCommand(command);
    setDeviceState({ ...deviceState, status: deviceState.status === 'locked' ? 'unlocked' : 'locked' });
  };

  const renderControls = () => {
    switch (deviceState.type) {
      case 'light':
        return (
          <>
            <div className="control-group">
              <div className="control-label">Durum</div>
              <button 
                className={`toggle-button ${deviceState.status}`}
                onClick={handleToggle}
              >
                {deviceState.status === 'on' ? 'Açık' : 'Kapalı'}
              </button>
            </div>
            {deviceState.status === 'on' && (
              <div className="control-group">
                <div className="control-label">Parlaklık</div>
                <div className="slider-container">
                  <div className="slider-value">{deviceState.brightness}%</div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={deviceState.brightness}
                    onChange={(e) => handleBrightnessChange(e.target.value)}
                    className="slider"
                  />
                </div>
              </div>
            )}
          </>
        );

      case 'thermostat':
        return (
          <>
            <div className="control-group">
              <div className="control-label">Sıcaklık</div>
              <div className="temp-controls">
                <button className="temp-button" onClick={() => handleTemperatureChange(-1)}>−</button>
                <div className="temp-display">{deviceState.temperature}°C</div>
                <button className="temp-button" onClick={() => handleTemperatureChange(1)}>+</button>
              </div>
            </div>
            <div className="control-group">
              <div className="control-label">Mod</div>
              <div className="mode-selector">
                {['heat', 'cool', 'auto'].map(mode => (
                  <button
                    key={mode}
                    className={`mode-button ${deviceState.mode === mode ? 'active' : ''}`}
                    onClick={() => handleModeChange(mode)}
                  >
                    {mode === 'heat' ? 'Isıtma' : mode === 'cool' ? 'Soğutma' : 'Otomatik'}
                  </button>
                ))}
              </div>
            </div>
          </>
        );

      case 'curtain':
        return (
          <>
            <div className="control-group">
              <div className="control-label">Durum</div>
              <button 
                className={`toggle-button ${deviceState.status === 'open' ? 'on' : 'off'}`}
                onClick={handleCurtainToggle}
              >
                {deviceState.status === 'open' ? 'Açık' : 'Kapalı'}
              </button>
            </div>
            <div className="control-group">
              <div className="control-label">Açıklık</div>
              <div className="slider-container">
                <div className="slider-value">{deviceState.openness}%</div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={deviceState.openness}
                  onChange={(e) => handleOpennessChange(e.target.value)}
                  className="slider"
                />
              </div>
            </div>
          </>
        );

      case 'window':
        return (
          <>
            <div className="control-group">
              <div className="control-label">Durum</div>
              <button 
                className={`toggle-button ${deviceState.status === 'open' ? 'on' : 'off'}`}
                onClick={() => setDeviceState({ ...deviceState, status: deviceState.status === 'open' ? 'closed' : 'open' })}
              >
                {deviceState.status === 'open' ? 'Açık' : 'Kapalı'}
              </button>
            </div>
            <div className="control-group">
              <div className="control-label">Hava Durumu Koruması</div>
              <div className={`status-indicator ${deviceState.weatherProtection ? 'active' : 'inactive'}`}>
                <span>{deviceState.weatherProtection ? 'Aktif' : 'Pasif'}</span>
                <span>{deviceState.weatherProtection ? '✓' : '✗'}</span>
              </div>
            </div>
          </>
        );

      case 'door':
        return (
          <div className="control-group">
            <div className="control-label">Kilit Durumu</div>
            <button 
              className={`toggle-button ${deviceState.status === 'locked' ? 'on' : 'off'}`}
              onClick={handleDoorToggle}
            >
              {deviceState.status === 'locked' ? 'Kilitli' : 'Açık'}
            </button>
          </div>
        );

      case 'camera':
        return (
          <>
            <div className="control-group">
              <div className="control-label">Kayıt</div>
              <button 
                className={`toggle-button ${deviceState.recording ? 'on' : 'off'}`}
                onClick={() => setDeviceState({ ...deviceState, recording: !deviceState.recording })}
              >
                {deviceState.recording ? 'Kayıt Yapılıyor' : 'Kapalı'}
              </button>
            </div>
            <div className="control-group">
              <div className="control-label">Hareket Algılama</div>
              <div className={`status-indicator ${deviceState.motion ? 'active' : 'inactive'}`}>
                <span>{deviceState.motion ? 'Hareket Tespit Edildi' : 'Hareket Yok'}</span>
                <span>{deviceState.motion ? '👁️' : '💤'}</span>
              </div>
            </div>
          </> 
        );

      default:
        return null;
    }
  };

  return (
    <div className="device-detail">
      <div className="detail-header">
        <button className="back-button" onClick={onBack}>←</button>
        <h2>{deviceState.name}</h2>
      </div>

      <div className="device-detail-card">
        <div className="device-icon-large">{getDeviceIcon(deviceState.type)}</div>
        <div className="device-controls">
          {renderControls()}
        </div>
      </div>
    </div>
  );
};

export default DeviceDetail;
