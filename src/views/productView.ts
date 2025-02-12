import { BaseView } from './baseView';
import { IProduct } from '../types/types';

export class ProductView extends BaseView<IProduct[]> {
  constructor(selector: string) {
    super(selector);
  }

  render(products: IProduct[]): void {
    this.clear();
    const fragment = document.createDocumentFragment();

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.dataset.productId = product.id;

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image"/>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">Cena: ${product.price} PLN</p>
      `;

      // Wyślij zdarzenie wyboru produktu
      productCard.addEventListener('click', () => {
        const event = new CustomEvent('product:select', { detail: product });
        document.dispatchEvent(event);
      });

      fragment.appendChild(productCard);
    });

    this.rootElement.appendChild(fragment);
  }
}