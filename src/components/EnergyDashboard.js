import React, { useState } from 'react';
import './EnergyDashboard.css';

const EnergyDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Dummy data
  const dailyUsage = [
    { day: 'Pzt', usage: 12.4, cost: 45.6 },
    { day: 'Sal', usage: 15.2, cost: 55.8 },
    { day: 'Çar', usage: 11.8, cost: 43.3 },
    { day: 'Per', usage: 14.5, cost: 53.2 },
    { day: 'Cum', usage: 13.1, cost: 48.1 },
    { day: 'Cmt', usage: 16.8, cost: 61.7 },
    { day: 'Paz', usage: 15.5, cost: 56.9 }
  ];

  const deviceUsage = [
    { name: 'Termostat', usage: 45, color: '#FF6B6B', icon: '🌡️' },
    { name: 'Işıklar', usage: 25, color: '#FFD166', icon: '💡' },
    { name: 'Kamera', usage: 15, color: '#4ECDC4', icon: '📹' },
    { name: 'Diğer', usage: 15, color: '#95E1D3', icon: '📱' }
  ];

  const hourlyUsage = [
    { hour: '00', value: 20 },
    { hour: '03', value: 15 },
    { hour: '06', value: 30 },
    { hour: '09', value: 60 },
    { hour: '12', value: 75 },
    { hour: '15', value: 65 },
    { hour: '18', value: 85 },
    { hour: '21', value: 70 },
    { hour: '24', value: 40 }
  ];

  const totalUsage = dailyUsage.reduce((sum, day) => sum + day.usage, 0);
  const totalCost = dailyUsage.reduce((sum, day) => sum + day.cost, 0);
  const avgDaily = (totalUsage / dailyUsage.length).toFixed(1);

  return (
    <div className="energy-dashboard">
      <div className="energy-header">
        <h1>⚡ Enerji Dashboard</h1>
        <p>Enerji tüketimi ve maliyet analizi</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon">⚡</div>
          <div className="card-content">
            <div className="card-label">Toplam Tüketim</div>
            <div className="card-value">{totalUsage.toFixed(1)} kWh</div>
            <div className="card-subtitle">Son 7 gün</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <div className="card-label">Toplam Maliyet</div>
            <div className="card-value">₺{totalCost.toFixed(2)}</div>
            <div className="card-subtitle">Son 7 gün</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <div className="card-label">Günlük Ortalama</div>
            <div className="card-value">{avgDaily} kWh</div>
            <div className="card-subtitle">%12 azalma</div>
          </div>
        </div>
      </div>

      {/* Daily Usage Chart */}
      <div className="chart-section">
        <h3>📈 Günlük Tüketim</h3>
        <div className="bar-chart">
          {dailyUsage.map((day, index) => (
            <div key={index} className="bar-item">
              <div className="bar-wrapper">
                <div 
                  className="bar-fill"
                  style={{ height: `${(day.usage / 20) * 100}%` }}
                >
                  <span className="bar-value">{day.usage}</span>
                </div>
              </div>
              <div className="bar-label">{day.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Device Distribution */}
      <div className="chart-section">
        <h3>🔌 Cihaz Bazlı Dağılım</h3>
        <div className="device-distribution">
          {deviceUsage.map((device, index) => (
            <div key={index} className="device-usage-item">
              <div className="device-usage-info">
                <span className="device-icon">{device.icon}</span>
                <span className="device-name">{device.name}</span>
              </div>
              <div className="device-usage-bar">
                <div 
                  className="device-usage-fill"
                  style={{ 
                    width: `${device.usage}%`,
                    background: device.color
                  }}
                />
              </div>
              <div className="device-usage-percent">{device.usage}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Usage */}
      <div className="chart-section">
        <h3>🕐 Saatlik Kullanım</h3>
        <div className="line-chart">
          <div className="line-chart-grid">
            {[100, 75, 50, 25, 0].map((val, i) => (
              <div key={i} className="grid-line">
                <span className="grid-label">{val}%</span>
              </div>
            ))}
          </div>
          <div className="line-chart-content">
            <svg viewBox="0 0 400 200" className="line-svg">
              <polyline
                points={hourlyUsage.map((h, i) => 
                  `${(i / (hourlyUsage.length - 1)) * 400},${200 - (h.value / 100) * 200}`
                ).join(' ')}
                fill="none"
                stroke="var(--secondary)"
                strokeWidth="3"
              />
              {hourlyUsage.map((h, i) => (
                <circle
                  key={i}
                  cx={(i / (hourlyUsage.length - 1)) * 400}
                  cy={200 - (h.value / 100) * 200}
                  r="5"
                  fill="var(--secondary)"
                />
              ))}
            </svg>
          </div>
          <div className="line-chart-labels">
            {hourlyUsage.map((h, i) => (
              <span key={i} className="hour-label">{h.hour}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Savings Tips */}
      <div className="tips-section">
        <h3>💡 Tasarruf Önerileri</h3>
        <div className="tips-list">
          <div className="tip-item">
            <span className="tip-icon">🌡️</span>
            <div className="tip-content">
              <div className="tip-title">Termostat Optimizasyonu</div>
              <div className="tip-desc">Sıcaklığı 1°C düşürerek %7 tasarruf sağlayabilirsiniz</div>
            </div>
          </div>
          <div className="tip-item">
            <span className="tip-icon">💡</span>
            <div className="tip-content">
              <div className="tip-title">Akıllı Aydınlatma</div>
              <div className="tip-desc">Gece 23:00'dan sonra ışıkları otomatik kapatın</div>
            </div>
          </div>
          <div className="tip-item">
            <span className="tip-icon">⏰</span>
            <div className="tip-content">
              <div className="tip-title">Zamanlayıcı Kullanımı</div>
              <div className="tip-desc">Yoğun saatlerde cihaz kullanımını azaltın</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;
