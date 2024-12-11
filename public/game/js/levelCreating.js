const blockField = document.querySelector(".level-block-wrapper");
const jsonFile = '/public/levels/level1.json';
let currentLevel = 1;
let level;

async function loadLevel() {
    try {
        const response = await fetch(jsonFile);
        if (!response.ok) {
            throw new Error('Ошибка сети ' + response.status);
        }
        const jsonData = await response.json();
        level = jsonData[`level${currentLevel}`];
    } catch (error) {
        console.error('Ошибка загрузки JSON:', error);
    }
}

async function main() {
    await loadLevel();
    blockField.innerHTML = ''; // Очищаем поле перед загрузкой нового уровня

    for (let i of level) {
        const outerBlock = document.createElement('div'); // Создаем внешний блок
        outerBlock.className = 'transparent-block'; // Прозрачный контейнер

        if (i === 1) {
            const innerBlock = document.createElement('div');
            innerBlock.className = 'block__style red';
            outerBlock.appendChild(innerBlock); // Вставляем видимый блок внутрь
        } else if (i === 0) {
            const innerBlock = document.createElement('div');
            innerBlock.className = 'empty__block';
            outerBlock.appendChild(innerBlock); // Пустой блок в контейнер
        } else if (i === 2) {
            const innerBlock = document.createElement('div');
            innerBlock.className = 'strong__block';
            outerBlock.appendChild(innerBlock); // Вставляем сильный блок внутрь
        } else if (i === 3) {
            const innerBlock = document.createElement('div');
            innerBlock.className = 'block__style green';
            outerBlock.appendChild(innerBlock); // Вставляем сильный блок внутрь
        } else if (i === 4) {
            const innerBlock = document.createElement('div');
            innerBlock.className = 'block__style purple';
            outerBlock.appendChild(innerBlock); // Вставляем сильный блок внутрь
        } else if (i === 5) {
            const innerBlock = document.createElement('div');
            innerBlock.className = 'block__style orange';
            outerBlock.appendChild(innerBlock); // Вставляем сильный блок внутрь
        } else if (i === 6) {
            const innerBlock = document.createElement('div');
            innerBlock.className = 'block__style blue';
            outerBlock.appendChild(innerBlock); // Вставляем сильный блок внутрь
        } else if (i === 7) {
            const innerBlock = document.createElement('div');
            innerBlock.className = 'block__style yellow';
            outerBlock.appendChild(innerBlock); // Вставляем сильный блок внутрь
        }


        blockField.appendChild(outerBlock); // Добавляем контейнер на поле
    }
}

// Функция для загрузки следующего уровня
async function loadNextLevel() {
    currentLevel++;
    console.log(`Загрузка уровня ${currentLevel}...`);
    await main(); // Перезагружаем поле с новым уровнем
}

// Инициализация
main();
