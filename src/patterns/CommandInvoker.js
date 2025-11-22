// Singleton Pattern
// Command'ları çalıştıran ve geçmişini tutan tek bir invoker

class CommandInvoker {
  static instance = null;

  constructor() {
    if (CommandInvoker.instance) {
      return CommandInvoker.instance;
    }
    
    this.history = [];
    this.currentIndex = -1;
    CommandInvoker.instance = this;
  }

  static getInstance() {
    if (!CommandInvoker.instance) {
      CommandInvoker.instance = new CommandInvoker();
    }
    return CommandInvoker.instance;
  }

  executeCommand(command) {
    command.execute();
    
    // Yeni komut çalıştırıldığında, mevcut index'ten sonraki geçmişi temizle
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(command);
    this.currentIndex++;
    
    console.log(`Invoker: Command executed. History size: ${this.history.length}`);
  }

  undo() {
    if (this.currentIndex >= 0) {
      const command = this.history[this.currentIndex];
      command.undo();
      this.currentIndex--;
      console.log(`Invoker: Command undone. Current index: ${this.currentIndex}`);
      return true;
    }
    console.log('Invoker: Nothing to undo');
    return false;
  }

  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      const command = this.history[this.currentIndex];
      command.execute();
      console.log(`Invoker: Command redone. Current index: ${this.currentIndex}`);
      return true;
    }
    console.log('Invoker: Nothing to redo');
    return false;
  }

  getHistory() {
    return this.history;
  }

  clearHistory() {
    this.history = [];
    this.currentIndex = -1;
    console.log('Invoker: History cleared');
  }
}

export { CommandInvoker };
