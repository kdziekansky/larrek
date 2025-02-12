import { EventEmitter } from '../services/event-emitter';

export abstract class Presenter {
    protected events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
        this.bindEvents();
    }

    protected abstract bindEvents(): void;
} 