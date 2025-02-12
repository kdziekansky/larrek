import { BaseView } from './baseView';
import { IBasketItem } from '../types/types';

export class CartView extends BaseView<IBasketItem[]> {
  constructor(selector: string) {
    super(selector);
  }

  render(basketItems: IBasketItem[]): void {
    this.clear();

    if (basketItems.length === 0) {
      this.rootElement.innerHTML = '<p>Koszyk jest pusty.</p>';
      return;
    }

    const fragment = document.createDocumentFragment();
    basketItems.forEach(item => {
      const basketItemElement = document.createElement('div');
      basketItemElement.className = 'basket-item';
      basketItemElement.dataset.itemId = item.id;

      basketItemElement.innerHTML = `
        <h4 class="basket-item-title">${item.title}</h4>
        <p class="basket-item-price">Cena: ${item.price} PLN</p>
        <p class="basket-item-quantity">Ilość: ${item.quantity}</p>
      `;

      fragment.appendChild(basketItemElement);
    });

    this.rootElement.appendChild(fragment);
  }
}
