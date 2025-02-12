import './scss/styles.scss';
import { ModalView } from './views/modalView';
import { ProductView } from './views/productView';

// Inicjalizacja okien modalnych - podgląd koszyka i produktu
const modalBasketElement = document.querySelector('#modal-basket');
const modalPreviewElement = document.querySelector('#modal-preview');

const modalBasket = modalBasketElement ? new ModalView('#modal-basket') : null;
const modalPreview = modalPreviewElement ? new ModalView('#modal-preview') : null;

// Obsługa przycisku koszyka
const basketButton = document.querySelector('.header__basket');
const closeButtons = document.querySelectorAll('.modal__close');

if (basketButton && modalBasket) {
  basketButton.addEventListener('click', () => {
    modalBasket.open();
  });
}

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (modalBasket) modalBasket.close();
    if (modalPreview) modalPreview.close();
  });
});

// Zainicjuj widok produktu
const productView = new ProductView('.gallery');

// Zdefiniuj adres API — użyj zmiennej środowiskowej, jeśli jest ustawiona
const API_ORIGIN = process.env.API_ORIGIN || 'http://localhost:3000/api/weblarek';

// Pobieranie produktów z API i renderowanie katalogu
fetch(`${API_ORIGIN}/product`)
  .then(response => response.json())
  .then(data => {
    // Ответ от API содержит товары в свойстве "items"
    const products = Array.isArray(data) ? data : data.items;
    console.log('Przesłane elementy:', products);
    productView.render(products);
  })
  .catch(error => console.error('Błąd podczas odbioru towaru:', error));

// Globalny nasłuchiwacz zdarzenia wyboru produktu — otwieranie okna modalnego ze szczegółami
document.addEventListener('product:select', (e: CustomEvent) => {
  if (modalPreview) {
    const product = e.detail;
    modalPreview.renderContent(`
      <div class="product-detail">
         <h2>${product.title}</h2>
         <img src="${product.image}" alt="${product.title}" />
         <p>${product.description}</p>
         <p>Цена: ${product.price} PLN</p>
         <button class="button product__buy">Dodaj do koszyka</button>
      </div>
    `);
    modalPreview.open();
  }
});


