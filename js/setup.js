'use strict';

// Variables
const WIZARD_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SECOND_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COAT_COLOR = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(0, 0, 0)`];
const WIZARD_EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARD_FIREBALL_WRAP = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

const WIZARDS_NUMBER = 4;
let userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);
let similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

let setupOpen = document.querySelector(`.setup-open`);
let setup = document.querySelector(`.setup`);
let setupClose = document.querySelector(`.setup-close`);
let setupOpenIcon = document.querySelector(`.setup-open-icon`);
let setupUserName = document.querySelector(`.setup-user-name`);
let setupSubmit = document.querySelector(`.setup-submit`);

let setupWizardForm = document.querySelector(`.setup-wizard-form`);

let setupWizardCoat = document.querySelector(`.setup-wizard .wizard-coat`);
let setupWizardEyes = document.querySelector(`.setup-wizard .wizard-eyes`);
let setupFireballWrap = document.querySelector(`.setup-fireball-wrap`);
let setupInputCoatColor = document.querySelector(`input[name=coat-color]`);
let setupInputEyesColor = document.querySelector(`input[name=eyes-color]`);
let setupInputFireballColor = document.querySelector(`input[name=fireball-color]`);

// Functions
let getRandomIndex = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

let renderWizard = function (wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

let renderWizards = function () {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < WIZARDS_NUMBER; i++) {
    const wizard = {
      name: `${WIZARD_FIRST_NAMES[getRandomIndex(0, WIZARD_FIRST_NAMES.length - 1)]} ${WIZARD_SECOND_NAMES[getRandomIndex(0, WIZARD_SECOND_NAMES.length - 1)]}`,
      coatColor: WIZARD_COAT_COLOR[getRandomIndex(0, WIZARD_COAT_COLOR.length - 1)],
      eyesColor: WIZARD_EYES_COLOR[getRandomIndex(0, WIZARD_EYES_COLOR.length - 1)]
    };

    fragment.appendChild(renderWizard(wizard));
  }

  let setupSimilarList = document.querySelector(`.setup-similar-list`);
  setupSimilarList.appendChild(fragment);
  userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
};
// ---------------------------------------------------
let onPopupEscPress = function (evt) {
  if (evt.key === `Escape` && evt.target !== setupUserName) {
    evt.preventDefault();
    closePopup();
  }
};

let onPopupEnterPress = function (evt) {
  if (evt.key === `Enter` && evt.target === setupClose) {
    evt.preventDefault();
    closePopup();
  }
};

let onSubmitFormEnterPress = function (evt) {
  if ((evt.key === `Enter` && evt.target === setupSubmit)) {
    evt.preventDefault();
    setupWizardForm.submit();
  }
};

// -----
let openPopup = function () {
  setup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
  document.addEventListener(`keydown`, onPopupEnterPress);
  document.addEventListener(`keydown`, onSubmitFormEnterPress);
};

let closePopup = function () {
  setup.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
  document.removeEventListener(`keydown`, onPopupEnterPress);
  document.removeEventListener(`keydown`, onSubmitFormEnterPress);
};
// -- Run --
renderWizards();

// ------- m4-t1 -----------------------
setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupOpenIcon.addEventListener(`focus`, function () {
  setupOpenIcon.addEventListener(`keydown`, openPopup);
});

setupOpenIcon.addEventListener(`focus`, function () {
  setupOpenIcon.addEventListener(`keydown`, openPopup);
});

// -------
// выбор цвета по порядку
let coatIndex = 0;

setupWizardCoat.addEventListener(`click`, function () {
  if (coatIndex === WIZARD_COAT_COLOR.length) {
    coatIndex = 0;
  } else {
    coatIndex++;
  }
  let color = WIZARD_COAT_COLOR[coatIndex];
  setupWizardCoat.style.fill = color;
  setupInputCoatColor.value = color;
});

// выбор цвета случайно
setupWizardEyes.addEventListener(`click`, function () {
  let randomIndex = getRandomInt(WIZARD_EYES_COLOR.length - 1);
  let color = WIZARD_EYES_COLOR[randomIndex];

  if (setupWizardEyes.hasAttribute(`style`)) {
    setupWizardEyes.style.fill = color;
  } else {
    setupWizardEyes.setAttribute(`style`, `fill: ${color}`);
  }
  setupInputEyesColor.value = color;
});

// выбор цвета по порядку
let fBallIndex = 0;
setupFireballWrap.addEventListener(`click`, function () {

  if (fBallIndex === WIZARD_FIREBALL_WRAP.length) {
    fBallIndex = 0;
  } else {
    fBallIndex++;
  }

  let color = WIZARD_FIREBALL_WRAP[fBallIndex];

  if (setupFireballWrap.hasAttribute(`style`)) {
    setupFireballWrap.style.background = color;
  } else {
    setupFireballWrap.setAttribute(`style`, `background: ${color}`);
  }

  setupInputFireballColor.value = color;
});
