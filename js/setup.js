'use strict';

// Variables
const WIZARD_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SECOND_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COAT_COLOR = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(0, 0, 0)`];
const WIZARD_EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];

const WIZARDS_NUMBER = 4;
let userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);
let similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

// Functions
let getRandomIndex = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
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

// -- Run --
renderWizards();
