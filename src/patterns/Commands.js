// Command Pattern
// Her komut bir işlemi kapsüller ve geri alınabilir

class Command {
  execute() {
    throw new Error('Execute method must be implemented');
  }

  undo() {
    throw new Error('Undo method must be implemented');
  }
}

class TurnOnCommand extends Command {
  constructor(device) {
    super();
    this.device = device;
    this.previousState = device.status;
  }

  execute() {
    console.log(`Command: Turning on ${this.device.name}`);
    this.device.status = 'on';
  }

  undo() {
    console.log(`Command: Undoing turn on for ${this.device.name}`);
    this.device.status = this.previousState;
  }
}

class TurnOffCommand extends Command {
  constructor(device) {
    super();
    this.device = device;
    this.previousState = device.status;
  }

  execute() {
    console.log(`Command: Turning off ${this.device.name}`);
    this.device.status = 'off';
  }

  undo() {
    console.log(`Command: Undoing turn off for ${this.device.name}`);
    this.device.status = this.previousState;
  }
}

class SetBrightnessCommand extends Command {
  constructor(device, brightness) {
    super();
    this.device = device;
    this.brightness = brightness;
    this.previousBrightness = device.brightness;
  }

  execute() {
    console.log(`Command: Setting brightness of ${this.device.name} to ${this.brightness}%`);
    this.device.brightness = this.brightness;
  }

  undo() {
    console.log(`Command: Restoring brightness of ${this.device.name} to ${this.previousBrightness}%`);
    this.device.brightness = this.previousBrightness;
  }
}

class SetTemperatureCommand extends Command {
  constructor(device, temperature) {
    super();
    this.device = device;
    this.temperature = temperature;
    this.previousTemperature = device.temperature;
  }

  execute() {
    console.log(`Command: Setting temperature of ${this.device.name} to ${this.temperature}°C`);
    this.device.temperature = this.temperature;
  }

  undo() {
    console.log(`Command: Restoring temperature of ${this.device.name} to ${this.previousTemperature}°C`);
    this.device.temperature = this.previousTemperature;
  }
}

class OpenCommand extends Command {
  constructor(device) {
    super();
    this.device = device;
    this.previousState = device.status;
  }

  execute() {
    console.log(`Command: Opening ${this.device.name}`);
    this.device.status = 'open';
  }

  undo() {
    console.log(`Command: Undoing open for ${this.device.name}`);
    this.device.status = this.previousState;
  }
}

class CloseCommand extends Command {
  constructor(device) {
    super();
    this.device = device;
    this.previousState = device.status;
  }

  execute() {
    console.log(`Command: Closing ${this.device.name}`);
    this.device.status = 'closed';
  }

  undo() {
    console.log(`Command: Undoing close for ${this.device.name}`);
    this.device.status = this.previousState;
  }
}

class LockCommand extends Command {
  constructor(device) {
    super();
    this.device = device;
    this.previousState = device.status;
  }

  execute() {
    console.log(`Command: Locking ${this.device.name}`);
    this.device.status = 'locked';
  }

  undo() {
    console.log(`Command: Undoing lock for ${this.device.name}`);
    this.device.status = this.previousState;
  }
}

class UnlockCommand extends Command {
  constructor(device) {
    super();
    this.device = device;
    this.previousState = device.status;
  }

  execute() {
    console.log(`Command: Unlocking ${this.device.name}`);
    this.device.status = 'unlocked';
  }

  undo() {
    console.log(`Command: Undoing unlock for ${this.device.name}`);
    this.device.status = this.previousState;
  }
}

export {
  TurnOnCommand,
  TurnOffCommand,
  SetBrightnessCommand,
  SetTemperatureCommand,
  OpenCommand,
  CloseCommand,
  LockCommand,
  UnlockCommand
};
