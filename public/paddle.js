class Paddle {
    constructor(x) {
        this.x = x;
        this.y = 200;
        this.w = 6;
        this.h = 100;
        this.vel = 8;
    }
    moveUp() {
        if (this.y - this.vel < 50) {
            this.y = 50;
        } else {
            this.y -= this.vel;
        }
    }
    moveDown() {
        if (this.y + this.vel > 350) {
            this.y = 350;
        } else {
            this.y += this.vel;
        }
    }
    draw() {
        rect(this.x, this.y, this.w, this.h)
    }
}