// Dobrą praktyką jest umieszczanie nawet prostych typów w aliasach
// Ale kiedy chcesz to zmienić, wystarczy, że zrobisz to w jednym miejscu
type EventName = string | RegExp;
type Subscriber = Function;
type EmitterEvent = {
    eventName: string,
    data: unknown
};

export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

/**
* Broker zdarzeń, klasyczna implementacja
 * W opcjach zaawansowanych istnieje możliwość zapisania się na wszystkie wydarzenia
 * lub nasłuchiwać zdarzeń na przykład według szablonu
 */
export class EventEmitter implements IEvents {
    _events: Map<EventName, Set<Subscriber>>;

    constructor() {
        this._events = new Map<EventName, Set<Subscriber>>();
    }

    /**
     * Ustaw obsługę zdarzenia
     */
    on<T extends object>(eventName: EventName, callback: (event: T) => void) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set<Subscriber>());
        }
        this._events.get(eventName)?.add(callback);
    }

    /**
     * Usuń obsługę ze zdarzenia
     */
    off(eventName: EventName, callback: Subscriber) {
        if (this._events.has(eventName)) {
            this._events.get(eventName)!.delete(callback);
            if (this._events.get(eventName)?.size === 0) {
                this._events.delete(eventName);
            }
        }
    }

    /**
     * Wyzwalanie zdarzenia danych
     */
    emit<T extends object>(eventName: string, data?: T) {
        this._events.forEach((subscribers, name) => {
            if (name === '*') subscribers.forEach(callback => callback({
                eventName,
                data
            }));
            if (name instanceof RegExp && name.test(eventName) || name === eventName) {
                subscribers.forEach(callback => callback(data));
            }
        });
    }

    /**
     * Posłuchaj wszystkich wydarzeń
     */
    onAll(callback: (event: EmitterEvent) => void) {
        this.on("*", callback);
    }

    /**
     * Zresetuj wszystkie programy obsługi
     */
    offAll() {
        this._events = new Map<string, Set<Subscriber>>();
    }

    /**
 * Utwórz wyzwalacz wywołania zwrotnego, który generuje zdarzenie po wywołaniu
 */
    trigger<T extends object>(eventName: string, context?: Partial<T>) {
        return (event: object = {}) => {
            this.emit(eventName, {
                ...(event || {}),
                ...(context || {})
            });
        };
    }
}

