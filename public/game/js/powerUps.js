function BigPaddle() {
    const originalWidth = PLAYER_PADDLE.offsetWidth;
    const newWidth = originalWidth * 1.1; // Увеличиваем ширину на 10%

    // Устанавливаем новую ширину с анимацией
    PLAYER_PADDLE.style.width = newWidth + 'px';

    // Возвращаем ширину к исходной через 10 секунд
    setTimeout(() => {
        PLAYER_PADDLE.style.width = originalWidth + 'px';
    }, 10000); // 10 секунд
}
