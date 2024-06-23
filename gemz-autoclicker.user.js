// ==UserScript==
// @name         Gemz Autoclicker
// @version      1.0
// @author       mudachyo
// @match        *://ff.notgemz.gemz.fun/*
// @icon         https://ff.notgemz.gemz.fun/favicon.ico
// @run-at       document-start
// @grant        none
// @downloadURL  https://github.com/mudachyo/Gemz/raw/main/gemz-autoclicker.user.js
// @updateURL    https://github.com/mudachyo/Gemz/raw/main/gemz-autoclicker.user.js
// @homepage     https://github.com/mudachyo/Gemz
// ==/UserScript==

// Стили логов
const styles = {
    success: 'background: #28a745; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    starting: 'background: #8640ff; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    error: 'background: #dc3545; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    info: 'background: #007bff; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
};

const logPrefix = '%c[GemzBot] ';
const originalLog = console.log;
console.log = function () {
    if (typeof arguments[0] === 'string' && arguments[0].includes('[GemzBot]')) {
        originalLog.apply(console, arguments);
    }
};

console.error = console.warn = console.info = console.debug = () => {};

console.clear();
console.log(`${logPrefix}Starting`, styles.starting);
console.log(`${logPrefix}Created by https://t.me/mudachyo`, styles.starting);
console.log(`${logPrefix}Github https://github.com/mudachyo/Gemz`, styles.starting);

// Функция для генерации случайного числа в диапазоне
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Координаты клика
const screenX = 531;
const screenY = 607;

// Функция для создания и отправки событий клика
function clickElement(element) {
    const clientX = getRandomInt(0, 485);
    const clientY = getRandomInt(0, 242);

    const pointerdownEvent = new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: clientX,
        clientY: clientY,
        screenX: screenX,
        screenY: screenY,
        pointerId: 1,
        width: 1,
        height: 1,
        pressure: 0.5
    });

    const mousedownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        clientX: clientX,
        clientY: clientY,
        screenX: screenX,
        screenY: screenY
    });

    const touchstartEvent = new TouchEvent('touchstart', {
        bubbles: true,
        touches: [new Touch({
            identifier: 1,
            target: element,
            clientX: clientX,
            clientY: clientY
        })]
    });

    const pointerupEvent = new PointerEvent('pointerup', {
        bubbles: true,
        clientX: clientX,
        clientY: clientY,
        screenX: screenX,
        screenY: screenY,
        pointerId: 1,
        width: 1,
        height: 1,
        pressure: 0
    });

    const mouseupEvent = new MouseEvent('mouseup', {
        bubbles: true,
        clientX: clientX,
        clientY: clientY,
        screenX: screenX,
        screenY: screenY
    });

    const touchendEvent = new TouchEvent('touchend', {
        bubbles: true,
        changedTouches: [new Touch({
            identifier: 1,
            target: element,
            clientX: clientX,
            clientY: clientY
        })]
    });

    const clickEvent = new PointerEvent('click', {
        bubbles: true,
        clientX: clientX,
        clientY: clientY,
        screenX: screenX,
        screenY: screenY,
        pointerId: 1,
        width: 1,
        height: 1,
        pressure: 0
    });

    element.dispatchEvent(pointerdownEvent);
    element.dispatchEvent(mousedownEvent);
    element.dispatchEvent(touchstartEvent);
    element.dispatchEvent(pointerupEvent);
    element.dispatchEvent(mouseupEvent);
    element.dispatchEvent(touchendEvent);
    element.dispatchEvent(clickEvent);
}

// Функция для получения текущего уровня энергии
function getEnergyLevel() {
    const energyElement = document.querySelector('.progress-info-label .p-2');
    return energyElement ? parseInt(energyElement.textContent, 10) : null;
}

// Основная функция для поиска элемента и выполнения кликов
function autoClicker() {
    const element = document.querySelector('.hitbox');
    if (element) {
        clickElement(element);
    } else {
        console.log(`${logPrefix}Element not found`, styles.error);
    }
}

// Функция для выполнения автокликера с проверкой энергии
function runAutoClicker() {
    try {
        const energyLevel = getEnergyLevel();
        if (energyLevel === null) {
            console.log(`${logPrefix}Energy level not found, retrying...`, styles.error);
            setTimeout(runAutoClicker, 1000);
        } else if (energyLevel <= 25) {
            const pauseTime = getRandomInt(30000, 60000);
            console.log(`${logPrefix}Energy low (${energyLevel}), pausing for ${pauseTime} ms`, styles.info);
            setTimeout(runAutoClicker, pauseTime);
        } else {
            autoClicker();
            const intervalTime = getRandomInt(30, 120);
            setTimeout(runAutoClicker, intervalTime);
        }
    } catch (error) {
        console.log(`${logPrefix}Error in autoClicker: ${error.message}`, styles.error);
        setTimeout(runAutoClicker, 1000); // Пауза на случай ошибки, чтобы продолжить работу
    }
}

// Задержка перед первым запуском для полной загрузки страницы
setTimeout(runAutoClicker, 3000);
