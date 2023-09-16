score = 0;
cross = true;

audio = new Audio('mariosong.mp3');
audiogo = new Audio('end.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        Mario = document.querySelector('.Mario');
        Mario.classList.add('animateMario');
        setTimeout(() => {
            Mario.classList.remove('animateMario')
        }, 700);
    }
    if (e.keyCode == 39) {
        Mario = document.querySelector('.Mario');
        MarioX = parseInt(window.getComputedStyle(Mario, null).getPropertyValue('left'));
        Mario.style.left = MarioX + 112 + "px";
    }
    if (e.keyCode == 37) {
        Mario = document.querySelector('.Mario');
        MarioX = parseInt(window.getComputedStyle(Mario, null).getPropertyValue('left'));
        Mario.style.left = (MarioX - 112) + "px";
    }
}

setInterval(() => {
    Mario = document.querySelector('.Mario');
    gameOver = document.querySelector('.gameOver');    
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(Mario, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(Mario, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audio.pause();
        }, 1000);
         setTimeout(() => {
            audiogo.pause();
        }, 3000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true; 
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}