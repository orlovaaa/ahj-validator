/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/img/visa.png
const visa_namespaceObject = __webpack_require__.p + "545145c60c726b397f61.png";
;// CONCATENATED MODULE: ./src/img/mastercard.png
const mastercard_namespaceObject = __webpack_require__.p + "c4e9401087382c69cf65.png";
;// CONCATENATED MODULE: ./src/img/mir.png
const mir_namespaceObject = __webpack_require__.p + "0ff4424b83cc4a3d0c21.png";
;// CONCATENATED MODULE: ./src/js/modules/CardValidatorWidget.js



class CardValidatorWidget {
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
          <img class="card-item visa" src="${visa_namespaceObject}" alt="Visa" title="Visa">
          <img class="card-item mastercard" src="${mastercard_namespaceObject}" alt="Mastercard" title="Mastercard">
          <img class="card-item mir" src="${mir_namespaceObject}" alt="Mir" title="Mir">
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
;// CONCATENATED MODULE: ./src/js/modules/luna.js
// export default function luna(value) {
//  value = value.replace(/\D/g, '');

//  let nCheck = 0;
//  let bEven = false;

// for (let n = value.length - 1; n >= 0; n--) {
// let nDigit = parseInt(value.charAt(n), 10);

// if (bEven && (nDigit *= 2) > 9) {
// nDigit -= 9;
// }

// nCheck += nDigit;
// bEven = !bEven;
// }

// return nCheck % 10 == 0;
// }
function checkLuhn(cardNo) {
  const cardNoStr = String(cardNo);
  const nDigits = cardNoStr.length;
  let nSum = 0;
  let isSecond = false;
  for (let i = nDigits - 1; i >= 0; i -= 1) {
    let d = cardNoStr[i].charCodeAt() - '0'.charCodeAt();
    if (isSecond === true) d *= 2;
    nSum += parseInt(d / 10, 10);
    nSum += d % 10;
    isSecond = !isSecond;
  }
  return nSum % 10 === 0;
}
;// CONCATENATED MODULE: ./src/js/modules/visaValidate.js
function visaValidate(value) {
  value = value.replace(/\D/g, '');
  return value.length >= 13 && value.length <= 19 && +value[0] === 4;
}
;// CONCATENATED MODULE: ./src/js/modules/mastercardValidate.js
function mastercardValidate(value) {
  value = value.replace(/\D/g, '');
  const masterCardList = [51, 52, 53, 54, 55];
  const firstNumbers = [value[0] + value[1]];
  return value.length === 16 && masterCardList.includes(Number(firstNumbers));
}
;// CONCATENATED MODULE: ./src/js/modules/mirValidate.js
function mirValidate(value) {
  value = value.replace(/\D/g, '');
  const firstNumber = value[0];
  return value.length === 16 && Number(firstNumber) === 2;
}
;// CONCATENATED MODULE: ./src/js/modules/CardValidator.js
/* eslint no-underscore-dangle: 0 */





class CardValidator {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.onButton = this.onButton.bind(this);
    this.valueNone = this.valueNone.bind(this);
  }
  static get selector() {
    return '.form-card';
  }
  static get cardListSelector() {
    return '.card-list';
  }
  static get inputSelector() {
    return '.form-card__input';
  }
  static get formCardControl() {
    return '.form-card__control';
  }
  static get buttonSelector() {
    return '.form-card__btn';
  }
  static get visaSelector() {
    return '.visa';
  }
  static get masterCardSelector() {
    return '.mastercard';
  }
  static get mirSelector() {
    return '.mir';
  }
  init() {
    this.element = this.parentEl.querySelector(CardValidator.selector);
    this.cardList = this.parentEl.querySelector(CardValidator.cardListSelector);
    this.input = this.element.querySelector(CardValidator.inputSelector);
    this.button = this.element.querySelector(CardValidator.buttonSelector);
    this.label = this.element.querySelector(CardValidator.labelSelector);
    this.visa = this.cardList.querySelector(CardValidator.visaSelector);
    this.formControl = this.element.querySelector(CardValidator.formCardControl);
    this.masterCard = this.cardList.querySelector(CardValidator.masterCardSelector);
    this.mir = this.cardList.querySelector(CardValidator.mirSelector);
    this.element.addEventListener('click', this.onButton);
    this.element.addEventListener('input', this.valueNone);
  }
  valueNone(e) {
    e.preventDefault();
    const _value = this.input.value;
    if (_value.length === 0) {
      return this.defaultOpacity();
    }
    return null;
  }
  onButton(e) {
    e.preventDefault();
    const {
      value
    } = this.input;
    if (checkLuhn(value)) {
      this.valid();
      if (visaValidate(value)) {
        this.valid();
        this.validVisa();
      }
      if (mastercardValidate(value)) {
        this.valid();
        this.validMasterCard();
      }
      if (mirValidate(value)) {
        this.valid();
        this.validMir();
      }
    } else {
      this.inValid();
      this.defaultOpacity();
    }
  }
  validVisa() {
    this.defaultOpacity();
    this.visa.classList.add('valid');
    this.masterCard.style.opacity = '0.3';
    this.mir.style.opacity = '0.3';
  }
  validMasterCard() {
    this.defaultOpacity();
    this.masterCard.classList.add('valid');
    this.visa.style.opacity = '0.3';
    this.mir.style.opacity = '0.3';
  }
  validMir() {
    this.defaultOpacity();
    this.mir.classList.add('valid');
    this.visa.style.opacity = '0.3';
    this.masterCard.style.opacity = '0.3';
  }
  defaultOpacity() {
    this.visa.style.opacity = '1';
    this.masterCard.style.opacity = '1';
    this.mir.style.opacity = '1';
  }
  inValid() {
    this.formControl.classList.add('inValid');
    this.formControl.classList.remove('valid');
    this.formControl.style.borderColor = 'red';
  }
  valid() {
    this.formControl.classList.add('valid');
    this.formControl.classList.remove('inValid');
    this.formControl.style.borderColor = 'green';
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


const validator = document.querySelector('.validator');
const widget = new CardValidatorWidget(validator);
widget.bindToDOM();
const cardValidator = new CardValidator(validator);
cardValidator.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;