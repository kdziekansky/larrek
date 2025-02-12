import { BaseView } from './baseView';

export class ModalView extends BaseView<void> {
  constructor(selector: string) {
    super(selector);
    this.setupEventHandlers();
  }

  open(): void {
    this.rootElement.classList.add('modal_active');
  }

  close(): void {
    this.rootElement.classList.remove('modal_active');
  }

  render(): void {
    console.log("Renderowanie okna modalnego:", this.rootElement);
  }

  renderContent(contentHtml: string): void {
    const contentContainer = this.rootElement.querySelector('.modal__content');
    if (contentContainer) {
      contentContainer.innerHTML = contentHtml;
    }
  }

  private setupEventHandlers(): void {
    this.rootElement.addEventListener('click', (event) => {
      const modalContent = this.rootElement.querySelector('.modal__container');
      if (modalContent && !modalContent.contains(event.target as Node)) {
        this.close();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.rootElement.classList.contains('modal_active')) {
        this.close();
      }
    });
  }
}
