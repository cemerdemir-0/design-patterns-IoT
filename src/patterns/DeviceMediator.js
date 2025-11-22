// Singleton + Mediator Pattern
// Mediator: Cihazlar arası iletişimi yönetir
// Singleton: Tek bir mediator instance'ı olmasını garanti eder

class DeviceMediator {
  static instance = null;

  constructor() {
    if (DeviceMediator.instance) {
      return DeviceMediator.instance;
    }
    
    this.devices = [];
    this.updateCallback = null;
    DeviceMediator.instance = this;
  }

  static getInstance() {
    if (!DeviceMediator.instance) {
      DeviceMediator.instance = new DeviceMediator();
    }
    return DeviceMediator.instance;
  }

  setDevices(devices) {
    this.devices = devices;
  }

  setUpdateCallback(callback) {
    this.updateCallback = callback;
  }

  notify(sender, event) {
    console.log(`Mediator: ${sender.name} triggered ${event}`);
    
    // Cihazlar arası mantık
    if (event === 'rain-detected') {
      // Yağmur algılandığında pencereleri kapat
      this.devices.forEach(device => {
        if (device.type === 'window' && device.status === 'open') {
          device.status = 'closed';
          console.log(`Mediator: Closing ${device.name} due to rain`);
        }
      });
      this.updateDevices();
    }

    if (event === 'motion-detected') {
      // Hareket algılandığında ışıkları aç
      this.devices.forEach(device => {
        if (device.type === 'light') {
          device.status = 'on';
          console.log(`Mediator: Turning on ${device.name} due to motion`);
        }
      });
      this.updateDevices();
    }

    if (event === 'night-mode') {
      // Gece modunda tüm ışıkları kapat, perdeleri kapat
      this.devices.forEach(device => {
        if (device.type === 'light') {
          device.status = 'off';
        }
        if (device.type === 'curtain') {
          device.status = 'closed';
          device.openness = 0;
        }
      });
      this.updateDevices();
    }
  }

  updateDevices() {
    if (this.updateCallback) {
      this.updateCallback([...this.devices]);
    }
  }
}

export { DeviceMediator };
