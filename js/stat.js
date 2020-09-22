'use strict';

// Переменные
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;

const CLOUD_X = 100;
const CLOUD_Y = 10;

const GAP = 10;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const BAR_GAP = 50;

const FONT = `16px PT Mono`;
const TEXT_COLOR = `#000`;

// Функции

// Рисует полотно
const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Находит максимальный элемент массива
let getMaxElement = function (array) {
  let maxElement = array[0];

  for (let i = 0; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

// Отображает строку текста
const renderText = function (ctx, text, x, y, font = FONT, color = TEXT_COLOR) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = `hanging`;
  ctx.fillText(text, x, y);
};

// Выполнение
window.renderStatistics = function (ctx, names, times) {
  // Очищение холста
  ctx.clearRect(
      CLOUD_X,
      CLOUD_Y,
      CLOUD_WIDTH + GAP * 2,
      CLOUD_HEIGHT + GAP * 2
  );

  // Отрисовка холста
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );

  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  // Отрисовка ликующего текста
  renderText(
      ctx,
      `Ура вы победили!`,
      CLOUD_X + GAP * 2,
      CLOUD_Y + GAP * 2
  );

  renderText(
      ctx,
      `Список результатов:`,
      CLOUD_X + GAP * 2,
      CLOUD_Y + GAP * 4
  );

  // Отрисовка гистограммы
  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    // время прохождения игры
    renderText(
        ctx,
        Math.round(times[i]),
        CLOUD_X + GAP * 4 + (BAR_GAP + BAR_WIDTH) * i,
        BAR_HEIGHT * (1 - times[i] / maxTime) + CLOUD_Y + GAP * 6.5
    );

    // цвет гистограммы
    ctx.fillStyle = (names[i] === `Вы`) ?
      `rgba(255, 0, 0, 1)` :
      `hsl(240, 100%, ${Math.round(Math.random() * 100)}%)`;

    // гистограмма
    ctx.fillRect(
        CLOUD_X + GAP * 4 + (BAR_GAP + BAR_WIDTH) * i,
        BAR_HEIGHT * (1 - times[i] / maxTime) + CLOUD_Y + GAP * 8.5,
        BAR_WIDTH,
        BAR_HEIGHT * times[i] / maxTime
    );

    // имя игрока
    renderText(
        ctx,
        names[i],
        CLOUD_X + GAP * 4 + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + GAP * 9.5 + BAR_HEIGHT
    );
  }
};

