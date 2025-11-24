import React from 'react';
import './EnergyWidget.css';

const EnergyWidget = () => {
  const weeklyData = [
    { day: 'Pzt', usage: 12.4 },
    { day: 'Sal', usage: 15.2 },
    { day: 'Çar', usage: 11.8 },
    { day: 'Per', usage: 14.5 },
    { day: 'Cum', usage: 13.1 },
    { day: 'Cmt', usage: 16.8 },
    { day: 'Paz', usage: 15.5 }
  ];

  const todayUsage = weeklyData[weeklyData.length - 1].usage;
  const todayCost = (todayUsage * 3.67).toFixed(2);

  return (
    <div className="energy-widget">
      <div className="widget-header">
        <div className="widget-title">
          <span className="widget-icon">⚡</span>
          <span>Enerji Tüketimi</span>
        </div>
        <div className="widget-today">
          <div className="today-value">{todayUsage} kWh</div>
          <div className="today-cost">₺{todayCost}</div>
        </div>
      </div>
      
      <div className="mini-chart">
        {weeklyData.map((day, index) => (
          <div key={index} className="mini-bar">
            <div 
              className="mini-bar-fill"
              style={{ height: `${(day.usage / 20) * 100}%` }}
            />
            <div className="mini-bar-label">{day.day.charAt(0)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyWidget;
