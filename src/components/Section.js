export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // добавление DOM-элемента в конец контейнера
  addItemAppend(item) {
    this._container.append(item);
  }

  // добавление DOM-элемента в начало контейнера
  addItemPrepend(item) {
    this._container.prepend(item);
  }

  // отрисовка всех элементов
  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }
}
