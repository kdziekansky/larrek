import { Model } from './base';
import { IBasketItem, IProduct } from '../types/types';
import { EventEmitter } from '../services/event-emitter';

export class BasketModel extends Model<IBasketItem[]> {
    constructor(events: EventEmitter) {
        super(events, []);
    }

    add(product: IProduct): void {
        const existingItem = this.data.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.data.push({ ...product, quantity: 1 });
        }
        
        this.events.emit('basket:changed', this.data);
    }

    remove(productId: string): void {
        this.data = this.data.filter(item => item.id !== productId);
        this.events.emit('basket:changed', this.data);
    }

    clear(): void {
        this.data = [];
        this.events.emit('basket:changed', this.data);
    }

    getTotalPrice(): number {
        return this.data.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
} 