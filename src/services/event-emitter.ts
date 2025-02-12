type EventHandler = (...args: any[]) => void;

export class EventEmitter {
    private listeners: { [key: string]: EventHandler[] } = {};

    on(event: string, callback: EventHandler): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: EventHandler): void {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(
                (listener) => listener !== callback
            );
        }
    }

    emit(event: string, ...args: any[]): void {
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener) => listener(...args));
        }
    }
} 