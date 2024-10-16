let score = 0;
let gameOver = false;
let intervalId;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
    gameOver = false;
    score = 0;
    $(".message").text('');
    $(".score").text('Wynik: ' + score);

    intervalId = setInterval(showShape, 1500);
}

function getReactionTime() {
    if (score < 10) {
        return 1500; 
    } else if (score < 25) {
        return 1000; 
    } else {
        return 700; 
    }
}

function showShape() {
    if (gameOver) return;

    let holeIndex = randomInt(0, 8);
    let $hole = $('#h' + holeIndex);

    let isSquare = Math.random() < 0.25;
    let shapeType = isSquare ? 'square' : 'star';

    let $shape = $('<div></div>').addClass(shapeType + ' active');

    $shape.on("click", function () {
        if (shapeType === 'star') {
            score++;
            $(".score").text('Score: ' + score);
        } else {
            endGame("Kliknąłeś zielony kwadrat! Koniec gry.");
        }
        clearTimeout(timeout); 
        $shape.remove(); 
    });

    $hole.append($shape);

    let reactionTime = getReactionTime();

    let timeout = setTimeout(function () {
        if (shapeType === 'star') {
            endGame("Przegapiłeś żółtą gwiazdkę! Koniec gry.");
        }
        $shape.remove();
    }, reactionTime);
}

function endGame(message) {
    gameOver = true;
    clearInterval(intervalId); 
    $(".message").text(message);
    $(".score").text('Wynik Końcowy: ' + score);
}

function restartGame() {
    score = 0;
    $(".hole").empty(); 
    clearInterval(intervalId); 
    startGame(); 
}

$(document).ready(function () {
    startGame();
});
