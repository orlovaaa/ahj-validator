/* eslint no-underscore-dangle: 0 */

import luna from './luna';
import visaValidate from './visaValidate';
import mastercardValidate from './mastercardValidate';
import mirValidate from './mirValidate';

export default class CardValidator {
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
    this.masterCard = this.cardList.querySelector(
      CardValidator.masterCardSelector,
    );
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
    const { value } = this.input;
    if (luna(value)) {
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
