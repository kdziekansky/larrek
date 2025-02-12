import { EventEmitter } from '../services/event-emitter';

export abstract class Model<T> {
    protected events: EventEmitter;
    protected data: T;

    constructor(events: EventEmitter, initialData: T) {
        this.events = events;
        this.data = initialData;
    }

    getData(): T {
        return this.data;
    }
} 