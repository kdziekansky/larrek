export interface IProduct {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
}

export interface IOrderForm {
    payment: 'card' | 'cash';
    address: string;
}

export interface IContactForm {
    email: string;
    phone: string;
}

export interface IBasketItem extends IProduct {
    quantity: number;
}

export interface IAppState {
    catalog: IProduct[];
    basket: IBasketItem[];
    preview: IProduct | null;
    order: IOrderForm | null;
    contacts: IContactForm | null;
}

export interface IEvents {
    'product:select': IProduct;
    'product:add': IProduct;
    'product:remove': string;
    'order:submit': IOrderForm;
    'contacts:submit': IContactForm;
    'modal:open': string;
    'modal:close': void;
}
