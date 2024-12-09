const GAME_FIELD = document.querySelector(".main-game-field");

let fieldWidth = document.documentElement.clientWidth;
let fieldHeight = document.documentElement.clientHeight;

const PLAYER_PADDLE = document.querySelector(".player-paddle");
PLAYER_PADDLE.style.top = (fieldHeight - 20) + 'px';

let rightFlag = false;
let leftFlag = false;

let nextLevelClick = false;

let playerPosX = fieldWidth / 2;
PLAYER_PADDLE.style.left = (playerPosX - 70) + 'px';

const PADDLE_SPEED = 18;
const PADDLE_WIDTH = PLAYER_PADDLE.offsetWidth;

let player_score = document.querySelector(".score-display");

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    if (event.key.toLowerCase() === 'd' || event.key.toLowerCase() === 'в') {
        rightFlag = true;
    } else if (event.key.toLowerCase() === 'a' || event.key.toLowerCase() === 'ф') {
        leftFlag = true;
    }
}

function handleKeyUp(event) {
    if (event.key.toLowerCase() === 'd' || event.key.toLowerCase() === 'в') {
        rightFlag = false;
    } else if (event.key.toLowerCase() === 'a' || event.key.toLowerCase() === 'ф') {
        leftFlag = false;
    }
}

function movePlayer() {
    if (rightFlag) {
        playerPosX += PADDLE_SPEED;
    }
    if (leftFlag) {
        playerPosX -= PADDLE_SPEED;
    }

    if (playerPosX < PADDLE_WIDTH / 2) {
        playerPosX = PADDLE_WIDTH / 2;
    } else if (playerPosX > fieldWidth - PADDLE_WIDTH / 2) {
        playerPosX = fieldWidth - PADDLE_WIDTH / 2;
    }

    PLAYER_PADDLE.style.left = (playerPosX - PADDLE_WIDTH / 2) + 'px';
}

let gameCycle = setInterval(movePlayer, 30);

// --- Таймер ---
const TIMER_ELEMENT = document.createElement('div');
TIMER_ELEMENT.className = 'timer';
document.body.appendChild(TIMER_ELEMENT);

let timeRemaining = 10; // Время в секундах
function updateTimer() {
    if (timeRemaining <= 0) {
        showEndMenu(); // Показываем окно завершения
        player_score.innerHTML = score;
        clearInterval(gameCycle);
        clearInterval(ballCycle);
        return;
    }

    timeRemaining--;

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    TIMER_ELEMENT.textContent = `Time: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function showEndMenu() {
    const endMenu = document.querySelector(".end-menu");
    endMenu.style.display = "block"; // Показываем меню
    clearInterval(timerInterval); // Останавливаем таймер

    const continueButton = document.createElement("button");
    continueButton.textContent = "Продолжить";
    continueButton.className = "continue-button";

    continueButton.addEventListener("click", () => {
        endMenu.style.display = "none"; // Прячем меню
        nextLevelClick = true;

        // Вызов функции из levelCreating.js
        if (typeof loadNextLevel === "function") {
            loadNextLevel();
        }
    });

    endMenu.appendChild(continueButton);
}

// Таймер
updateTimer(); // Первое обновление таймера
const timerInterval = setInterval(updateTimer, 1000);
