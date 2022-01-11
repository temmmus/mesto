export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // добавление DOM-элемента в контейнер
  addItem(element) {
    this._container.append(element);
  }

  // отрисовка всех элементов
  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }
}
