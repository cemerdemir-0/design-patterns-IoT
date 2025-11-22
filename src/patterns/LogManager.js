// Singleton Pattern
// Log'ları yöneten tek bir manager

class LogManager {
  static instance = null;

  constructor() {
    if (LogManager.instance) {
      return LogManager.instance;
    }
    
    this.logs = [];
    this.logIdCounter = 100;
    LogManager.instance = this;
  }

  static getInstance() {
    if (!LogManager.instance) {
      LogManager.instance = new LogManager();
    }
    return LogManager.instance;
  }

  setLogs(logs) {
    this.logs = logs;
    this.logIdCounter = Math.max(...logs.map(l => l.id)) + 1;
  }

  addLog(message, type, icon) {
    const now = new Date();
    const time = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    
    const log = {
      id: this.logIdCounter++,
      time,
      message,
      type,
      icon,
      timestamp: now
    };

    this.logs.unshift(log);
    console.log(`LogManager: New log added - ${message}`);
    return log;
  }

  getLatestLog() {
    // Simulated random log generation
    const messages = [
      { message: 'Sistem kontrolü tamamlandı', type: 'success', icon: '✓' },
      { message: 'Hava durumu güncellendi', type: 'info', icon: '☀️' },
      { message: 'Düşük pil seviyesi', type: 'warning', icon: '🔋' }
    ];

    if (Math.random() > 0.7) {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      return this.addLog(randomMsg.message, randomMsg.type, randomMsg.icon);
    }
    return null;
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
    console.log('LogManager: All logs cleared');
  }
}

export { LogManager };
