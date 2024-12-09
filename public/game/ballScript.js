const BALL = document.querySelector(".ball");
const BLOCK_FIELD = document.querySelector(".level-block-wrapper");
const SCORE_ELEMENT = document.querySelector(".score");

let ballPosX = GAME_FIELD.clientWidth / 2;
let ballPosY = GAME_FIELD.clientHeight / 2;
let ballSpeedX = 6;
let ballSpeedY = 6;
let ballRadius = BALL.offsetWidth / 2;
let score = 0;

function moveBall() {
    ballPosX += ballSpeedX;
    ballPosY += ballSpeedY;

    // Проверка столкновения с границами экрана
    if (ballPosX - ballRadius < 0 || ballPosX + ballRadius > GAME_FIELD.clientWidth) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballPosY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Проверка столкновения с платформой
    if (
        ballPosY + ballRadius > PLAYER_PADDLE.offsetTop &&
        ballPosX > PLAYER_PADDLE.offsetLeft &&
        ballPosX < PLAYER_PADDLE.offsetLeft + PLAYER_PADDLE.offsetWidth
    ) {
        ballSpeedY = -ballSpeedY;
        adjustBallDirection();
    }

    // Проверка столкновения с блоками
    const blocks = document.querySelectorAll('.block__style, .strong__block');
    let closestBlock = null;
    let minDistance = Infinity;

    blocks.forEach(block => {
        const collisionInfo = checkCollisionWithBlock(block);
        if (collisionInfo.isColliding && collisionInfo.distance < minDistance) {
            closestBlock = { block, collisionSide: collisionInfo.collisionSide };
            minDistance = collisionInfo.distance;
        }
    });

    if (closestBlock) {
        handleBlockCollision(closestBlock.block, closestBlock.collisionSide);
    }

    // Обновление позиции мяча
    BALL.style.left = ballPosX + 'px';
    BALL.style.top = ballPosY + 'px';
}

function checkCollisionWithBlock(block) {
    const blockRect = block.getBoundingClientRect();
    const nextBallX = ballPosX + ballSpeedX;
    const nextBallY = ballPosY + ballSpeedY;

    const isColliding =
        nextBallY - ballRadius < blockRect.bottom &&
        nextBallY + ballRadius > blockRect.top &&
        nextBallX + ballRadius > blockRect.left &&
        nextBallX - ballRadius < blockRect.right;

    if (!isColliding) {
        return { isColliding: false, distance: Infinity, collisionSide: null };
    }

    // Определяем сторону столкновения
    const collisionSide = detectCollisionSide(blockRect);

    // Вычисляем расстояние от центра мяча до центра блока
    const blockCenterX = blockRect.left + blockRect.width / 2;
    const blockCenterY = blockRect.top + blockRect.height / 2;
    const distance = Math.sqrt(
        Math.pow(ballPosX - blockCenterX, 2) + Math.pow(ballPosY - blockCenterY, 2)
    );

    return { isColliding: true, distance, collisionSide };
}

function detectCollisionSide(blockRect) {
    const ballFutureTop = ballPosY - ballRadius + ballSpeedY;
    const ballFutureBottom = ballPosY + ballRadius + ballSpeedY;
    const ballFutureLeft = ballPosX - ballRadius + ballSpeedX;
    const ballFutureRight = ballPosX + ballRadius + ballSpeedX;

    const overlapsTop = ballFutureBottom > blockRect.top && ballPosY < blockRect.top;
    const overlapsBottom = ballFutureTop < blockRect.bottom && ballPosY > blockRect.bottom;
    const overlapsLeft = ballFutureRight > blockRect.left && ballPosX < blockRect.left;
    const overlapsRight = ballFutureLeft < blockRect.right && ballPosX > blockRect.right;

    if (overlapsTop) return 'top';
    if (overlapsBottom) return 'bottom';
    if (overlapsLeft) return 'left';
    if (overlapsRight) return 'right';

    return null;
}

function handleBlockCollision(block, collisionSide) {
    // Обрабатываем изменение направления мяча в зависимости от стороны столкновения
    if (collisionSide === 'left' || collisionSide === 'right') {
        ballSpeedX = -ballSpeedX;
    } else if (collisionSide === 'top' || collisionSide === 'bottom') {
        ballSpeedY = -ballSpeedY;
    }

    // Удаляем или изменяем блок, если он разрушаемый
    if (block.classList.contains('block__style')) {
        block.classList.remove('block__style');
        block.classList.add('empty__block');
        score += 15;
        updateScore();
    }
}

function adjustBallDirection() {
    const paddleCenter = PLAYER_PADDLE.offsetLeft + PLAYER_PADDLE.offsetWidth / 2;
    const relativeIntersectX = (ballPosX - PLAYER_PADDLE.offsetLeft) / PLAYER_PADDLE.offsetWidth;

    // Изменяем направление мяча в зависимости от места столкновения с платформой
    const angle = (relativeIntersectX - 0.5) * Math.PI / 2; // Угол в радианах
    ballSpeedX = Math.sin(angle) * 8; // Скорость по X
    ballSpeedY = -Math.cos(angle) * 8; // Скорость по Y
}

function updateScore() {
    SCORE_ELEMENT.textContent = `Score: ${score}`;
}

// Интервал обновления движения мяча
let ballCycle = setInterval(moveBall, 20);
