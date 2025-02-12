export abstract class BaseView<T = any> {
  protected rootElement: HTMLElement;

  constructor(selector: string) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element "${selector}" nie znaleziono.`);
    }
    this.rootElement = element as HTMLElement;
  }

  abstract render(data?: T): void;

  clear(): void {
    this.rootElement.innerHTML = '';
  }
}
