let singlePlayer = document.querySelector(".game-start-menu__single-player-btn");
let pvp = document.querySelector(".game-start-menu__pvp-btn");

let start = document.querySelector(".game-start-menu__start-btn");
let setting = document.querySelector(".game-start-menu__setting-btn");
let back = document.querySelector(".game-start-menu__back-btn");

function chooseGameMode() {
    singlePlayer.style.display = "block";
    pvp.style.display = "block";
    back.style.display = "block";
    start.style.display = "none";
    setting.style.display = "none";
}

function goBackToMenu() {
    start.style.display = "block";
    setting.style.display = "block";
    singlePlayer.style.display = "none";
    pvp.style.display = "none";
    back.style.display = "none";
}