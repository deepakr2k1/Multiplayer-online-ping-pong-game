let paddleL;
let paddleR;
let ball;
let isStop = true;

function setup() {
    createCanvas(600, 400);
    rectMode(CENTER);
    paddleL = new Paddle(3)
    paddleR = new Paddle(597)
    ball = new Ball();
}

async function draw() {
    noStroke();
    background(60);
    fill(21, 128, 21);
    paddleL.draw();
    fill(156, 28, 28);
    paddleR.draw();
    fill(250, 250, 250);

    // Paddle
    socket.emit('Y', paddleL.y);
    socket.on('Y', y => {
        paddleR.y = y
    })
    if (keyIsDown(UP_ARROW)) {
        paddleL.moveUp();
    } else if (keyIsDown(DOWN_ARROW)) {
        paddleL.moveDown();
    }

    // Ball
    if (isHost) {
        socket.emit('ball_x', ball.x);
        socket.emit('ball_y', ball.y);
        if (!isStop)
            ball.move();
    } else {
        socket.on('ball_x', x => {
            ball.x = x;
        })
        socket.on('ball_y', y => {
            ball.y = y;
        })
    }
    ball.draw();

    if (isHost) {
        if (ball.x <= 10) {
            if (ball.y <= (paddleL.y + 57) && ball.y >= (paddleL.y - 57)) {
                ball.velX *= -1.05;
            } else {
                // Member won
                isStop = true;
                socket.emit('win', true);
                await lose();
                isStop = false;
            }
        }
        if (ball.x >= 590) {
            if (ball.y <= (paddleR.y + 57) && ball.y >= (paddleR.y - 57)) {
                ball.velX *= -1.05;
            } else {
                // Host won
                isStop = true;
                socket.emit('win', false);
                await win();
                isStop = false;
            }
        }
    }
}