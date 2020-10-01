'use strict';

// Variables
let WIZARD_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
let WIZARD_SECOND_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
let WIZARD_COAT_COLOR = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(0, 0, 0)`];
let WIZARD_EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];

let userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);
let similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);


// Functions
let getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let getRandomArrayIndex = function (min, max, check) {
  let randomNumber = getRandomIntInclusive(min, max);
  if (check.length) {
    while (!getUniqueValue(check, randomNumber)) {
      randomNumber = getRandomIntInclusive(min, max);
    }
  }
  return randomNumber;
};

let getUniqueValue = function (exclusionArray, checkValue) {
  let check = true;
  if (exclusionArray.length) {
    for (let i = 0; i < exclusionArray.length; i++) {
      if (checkValue === exclusionArray[i]) {
        check = false;
      }
    }
  }
  return check;
};

let clearArray = function (array) {
  array.forEach(function () {
    array.pop();
  });
};

let getRandomDataObjectArray = function (arrayLength) {
  let objectArray = [];

  let firstNameOccupiedIndexes = [];
  let secondNameOccupiedIndexes = [];
  let coatColorOccupiedIndexes = [];
  let eyesColorOccupiedIndexes = [];

  for (let i = 0; i < arrayLength; i++) {
    let obj = {};

    // Get unique data from const data arrays
    let firstNameOpccupiedIndex = getRandomArrayIndex(0, WIZARD_FIRST_NAMES.length - 1, firstNameOccupiedIndexes);
    let firstName = WIZARD_FIRST_NAMES[firstNameOpccupiedIndex];
    firstNameOccupiedIndexes.push(firstNameOpccupiedIndex);

    if (firstNameOccupiedIndexes.length === WIZARD_FIRST_NAMES.length) {
      clearArray(firstNameOccupiedIndexes);
    }

    let secondNameOccupiedIndex = getRandomIntInclusive(0, WIZARD_SECOND_NAMES.length - 1);
    let secondName = WIZARD_SECOND_NAMES[secondNameOccupiedIndex];
    secondNameOccupiedIndexes.push(secondNameOccupiedIndex);

    if (secondNameOccupiedIndexes.length === WIZARD_SECOND_NAMES.length) {
      clearArray(secondNameOccupiedIndexes);
    }

    let coatColorOccupiedIndex = getRandomArrayIndex(0, WIZARD_COAT_COLOR.length - 1, coatColorOccupiedIndexes);
    let coatColor = WIZARD_COAT_COLOR[coatColorOccupiedIndex];
    coatColorOccupiedIndexes.push(coatColorOccupiedIndex);

    if (coatColorOccupiedIndexes.length === WIZARD_COAT_COLOR.length) {
      clearArray(coatColorOccupiedIndexes);
    }

    let eyesColorOccupiedIndex = getRandomArrayIndex(0, WIZARD_EYES_COLOR.length - 1, eyesColorOccupiedIndexes);
    let eyesColor = WIZARD_EYES_COLOR[eyesColorOccupiedIndex];
    eyesColorOccupiedIndexes.push(eyesColorOccupiedIndex);

    if (eyesColorOccupiedIndexes.length === WIZARD_EYES_COLOR.length) {
      clearArray(eyesColorOccupiedIndexes);
    }
    // Define random object`s keys and values
    obj.name = getRandomIntInclusive(0, 1) ?
      `${firstName} ${secondName}` :
      `${secondName} ${firstName}`;

    obj.coatColor = coatColor;
    obj.eyesColor = eyesColor;

    objectArray[i] = obj;
  }

  return objectArray;
};

let renderWizard = function (wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

// -- Run --
let wizardData = getRandomDataObjectArray(4);

let fragment = document.createDocumentFragment();

for (let i = 0; i < wizardData.length; i++) {
  fragment.appendChild(renderWizard(wizardData[i]));
}

let setupSimilarList = document.querySelector(`.setup-similar-list`);
setupSimilarList.appendChild(fragment);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
