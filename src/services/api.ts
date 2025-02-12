import { IProduct, IOrderForm, IContactForm } from '../types/types';

export class ApiService {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getCatalog(): Promise<IProduct[]> {
        const response = await fetch(`${this.baseUrl}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch catalog');
        }
        return response.json();
    }

    async createOrder(order: IOrderForm & IContactForm) {
        const response = await fetch(`${this.baseUrl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        
        if (!response.ok) {
            throw new Error('Failed to create order');
        }
        return response.json();
    }
} 