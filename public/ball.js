class Ball {
    constructor() {
        this.x = 300;
        this.y = 200;
        this.w = 14;
        this.velX = 4;
        this.velY = 2;
    }
    move() {
        this.x += this.velX;
        this.y += this.velY;
        if (this.y >= height - 7 || this.y <= 7) {
            this.velY *= -1.02;
        }
    }
    draw() {
        circle(this.x, this.y, this.w)
    }
}