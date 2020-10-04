'use strict';

// Variables
let WIZARD_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
let WIZARD_SECOND_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
let WIZARD_COAT_COLOR = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(0, 0, 0)`];
let WIZARD_EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];

let WIZARDS_NUMBER = 4;
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

// -- Run --

let fragment = document.createDocumentFragment();

for (let i = 0; i < WIZARDS_NUMBER; i++) {
  const wizard = {
    name: `${WIZARD_FIRST_NAMES[getRandomIndex(0, WIZARD_FIRST_NAMES.length)]} ${WIZARD_SECOND_NAMES[getRandomIndex(0, WIZARD_SECOND_NAMES.length)]}`,
    coatColor: WIZARD_COAT_COLOR[getRandomIndex(0, WIZARD_COAT_COLOR.length)],
    eyesColor: WIZARD_EYES_COLOR[getRandomIndex(0, WIZARD_EYES_COLOR.length)]
  };

  fragment.appendChild(renderWizard(wizard));
}

let setupSimilarList = document.querySelector(`.setup-similar-list`);
setupSimilarList.appendChild(fragment);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
