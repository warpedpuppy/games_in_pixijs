const canvas = document.querySelector('canvas');
const pen = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

const numBalls = 30;
const grav = [0, -0.1];

function Ball(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.color = `hsl(${Math.random() * 360},90%,50%)`;

    this.draw = function () {
        pen.fillStyle = this.color;
        pen.beginPath();
        pen.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        pen.fill();
    };

    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        this.dx += grav[0];
        this.dy -= grav[1];
        if (this.x > W - this.r) {
            this.x = W - this.r;
            this.dx *= -1;
        } else if (this.x < this.r) {
            this.x = this.r;
            this.dx *= -1;
        }
        if (this.y > H - this.r) {
            this.y = H - this.r;
            this.dy *= -0.7;
        } else if (this.y < this.r) {
            this.y = this.r + 1;
            this.dy *= -0.7;
        }
        this.draw();
    };
}


let balls = [];

function reset() {
    balls = [];
    for (let i = 0; i < numBalls; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const r = Math.random() * 20 + 10;
        balls.push(new Ball(x, y, Math.random() * 10 - 5, Math.random() * 10 - 5, r));
    }
}
reset();

window.addEventListener('keydown', (key) => {
    if (key.code === 'Space') {
        reset();
    }
});

let mouseDown = false;
let cooldown = 0;
const mouse = {
    x: undefined,
    y: undefined,
};

canvas.addEventListener('mousedown', (event) => {
    mouseDown = true;
});
canvas.addEventListener('mouseup', (event) => {
    mouseDown = false;
});
canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x - 15;
    mouse.y = event.y - 15;
});

function animate() {
    pen.clearRect(0, 0, W, H);
    cooldown++;
    if (mouseDown && cooldown > 2) {
        const r = Math.random() * 20 + 10;
        balls.push(new Ball(mouse.x, mouse.y, Math.random() * 10 - 5, Math.random() * 10 - 5, r));
        cooldown = 0;
    }
    for (const ball of balls) {
        ball.update();
        for (const ball2 of balls) { // Not the most efficient way to check every pair, but this is just a rough version
            if (ball !== ball2) {
                const collision = checkCollision(ball, ball2);
                if (collision[0]) {
                    adjustPositions(ball, ball2, collision[1]);
                    resolveCollision(ball, ball2);
                }
            }
        }
    }
    requestAnimationFrame(animate);
}

animate();

function checkCollision(ballA, ballB) {
    const rSum = ballA.r + ballB.r;
    const dx = ballB.x - ballA.x;
    const dy = ballB.y - ballA.y;
    return [rSum * rSum > dx * dx + dy * dy, rSum - Math.sqrt(dx * dx + dy * dy)];
}

function resolveCollision(ballA, ballB) {
    const relVel = [ballB.dx - ballA.dx, ballB.dy - ballA.dy];
    let norm = [ballB.x - ballA.x, ballB.y - ballA.y];
    const mag = Math.sqrt(norm[0] * norm[0] + norm[1] * norm[1]);
    norm = [norm[0] / mag, norm[1] / mag];

    const velAlongNorm = relVel[0] * norm[0] + relVel[1] * norm[1];
    if (velAlongNorm > 0) return;

    const bounce = 0.7;
    let j = -(1 + bounce) * velAlongNorm;
    j /= 1 / ballA.r + 1 / ballB.r;

    const impulse = [j * norm[0], j * norm[1]];
    ballA.dx -= 1 / ballA.r * impulse[0];
    ballA.dy -= 1 / ballA.r * impulse[1];
    ballB.dx += 1 / ballB.r * impulse[0];
    ballB.dy += 1 / ballB.r * impulse[1];
}

function adjustPositions(ballA, ballB, depth) { // Inefficient implementation for now
    const percent = 0.2;
    const slop = 0.01;
    let correction = (Math.max(depth - slop, 0) / (1 / ballA.r + 1 / ballB.r)) * percent;

    let norm = [ballB.x - ballA.x, ballB.y - ballA.y];
    const mag = Math.sqrt(norm[0] * norm[0] + norm[1] * norm[1]);
    norm = [norm[0] / mag, norm[1] / mag];
    correction = [correction * norm[0], correction * norm[1]];
    ballA.x -= 1 / ballA.r * correction[0];
    ballA.y -= 1 / ballA.r * correction[1];
    ballB.x += 1 / ballB.r * correction[0];
    ballB.y += 1 / ballB.r * correction[1];
}
