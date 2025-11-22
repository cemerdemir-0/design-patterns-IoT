// Singleton Pattern
// Rutinleri yöneten tek bir manager

class RoutineManager {
  static instance = null;

  constructor() {
    if (RoutineManager.instance) {
      return RoutineManager.instance;
    }
    
    this.routines = new Map();
    this.initializeRoutines();
    RoutineManager.instance = this;
  }

  static getInstance() {
    if (!RoutineManager.instance) {
      RoutineManager.instance = new RoutineManager();
    }
    return RoutineManager.instance;
  }

  initializeRoutines() {
    this.routines.set('morning', {
      name: 'Morning Mode',
      actions: [
        { device: 'curtain', action: 'open' },
        { device: 'light', action: 'on' },
        { device: 'thermostat', action: 'setTemp', value: 22 }
      ]
    });

    this.routines.set('night', {
      name: 'Night Mode',
      actions: [
        { device: 'light', action: 'off' },
        { device: 'curtain', action: 'close' },
        { device: 'door', action: 'lock' }
      ]
    });

    this.routines.set('away', {
      name: 'Away Mode',
      actions: [
        { device: 'light', action: 'off' },
        { device: 'thermostat', action: 'off' },
        { device: 'camera', action: 'on' },
        { device: 'door', action: 'lock' }
      ]
    });

    this.routines.set('home', {
      name: 'Home Mode',
      actions: [
        { device: 'light', action: 'on' },
        { device: 'thermostat', action: 'setTemp', value: 22 },
        { device: 'curtain', action: 'open' }
      ]
    });
  }

  executeRoutine(routineId) {
    const routine = this.routines.get(routineId);
    if (routine) {
      console.log(`RoutineManager: Executing ${routine.name}`);
      routine.actions.forEach(action => {
        console.log(`  - ${action.device}: ${action.action}${action.value ? ` (${action.value})` : ''}`);
      });
      return true;
    }
    console.log(`RoutineManager: Routine ${routineId} not found`);
    return false;
  }

  getRoutine(routineId) {
    return this.routines.get(routineId);
  }

  getAllRoutines() {
    return Array.from(this.routines.entries());
  }
}

export { RoutineManager };
