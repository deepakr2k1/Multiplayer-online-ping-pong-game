const socket = io();

var isReady = false;
var isHost = true;

function r1() {
    if (!isReady) {
        socket.emit('ready', true);
        document.getElementById('r1').style.opacity = "0.5";
        isReady = true;
    }
}

socket.on('ready', val => {
    if (val) {
        document.getElementById('r2').style.opacity = "0.5";
    }
})

socket.on('isHost', val => {
    isHost = false;
    console.log(isHost);
})

socket.on('start', val => {
    isStop = false;
})


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function resetGame() {
    ball.x = 300;
    ball.y = 200;
    ball.velX = 4;
    ball.velY = 2;
    await sleep(2000);
}

async function win() {
    var score = document.getElementById('p1').innerHTML;
    score = parseInt(score, 10);
    score++;
    document.getElementById('p1').innerHTML = score;
    await resetGame();
}

async function lose() {
    var score = document.getElementById('p2').innerHTML;
    score = parseInt(score, 10);
    score++;
    document.getElementById('p2').innerHTML = score;
    await resetGame();
}

socket.on('win', async(res) => {
    if (res) {
        await win();
    } else {
        await lose();
    }
})