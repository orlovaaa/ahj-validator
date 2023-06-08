import visa from '../../img/visa.png';
import masterCard from '../../img/mastercard.png';
import mir from '../../img/mir.png';

export default class CardValidatorWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `
      <div class="content">
        <h2 class="content__title">Проверьте номер своей карты</h3>
        <form class="form-card">
          <div class="form-card__control">
            <input data-id="form-input" class="form-card__input" type="text" placeholder="Введите номер карты">
          </div>
          <button class="form-card__btn">Нажмите для валидации</button>
        </form>
        <div class="card-list">
          <h2 class="card-list__title"> Ваша карта: </h2>
          <img class="card-item visa" src="${visa}" alt="Visa" title="Visa">
          <img class="card-item mastercard" src="${masterCard}" alt="Mastercard" title="Mastercard">
          <img class="card-item mir" src="${mir}" alt="Mir" title="Mir">
        </div>
        <div class="content__example">
          <h2 class="content__title">Пример номера карты:</h2>
          <ul class="content__list">
            <li class="content__item visa">Visa: 4916838661195196</li>
            <li class="content__item mastercard">Mastercard: 5211033546806139</li>
            <li class="content__item mir">Mir: 2200770212727079</li>
          </ul>
        </div>
      </div>
    `;
  }

  bindToDOM() {
    this.parentEl.innerHTML = CardValidatorWidget.markup;
  }
}
