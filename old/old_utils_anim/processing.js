export default function Game(PIXI, Utils) {
    return {
        utils: new Utils(),
        canvasHeight: 400,
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        loader: PIXI.loader,
        PIXI,
        brickHeight: 10,
        brickColQ: 4,
        rows: 15,
        bricks: [],
        bricksQ: 0,
        particles: [],
        particleQ: 200,
        particleAtATime: 50,
        partcileCounter: 0,
        gamePlay: false,
        storeBricks: [],
        init() {
            this.resize = this.resize.bind(this);
            window.onresize = this.resize;
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = this.utils.returnCanvasHeight();
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            this.renderer.backgroundColor = 0xFFFFFF;
            this.webGL = !((this.renderer instanceof PIXI.CanvasRenderer));
            if (this.webGL) {
                this.particleQ = 2000;
                this.particleAtATime = 500;
            }
            document.getElementById('game_canvas').appendChild(this.renderer.view);
            this.bricksCont = this.Bricks();
            for (let j = 0; j < this.particleQ; j++) {
                const brick = new PIXI.Graphics();
                brick
                    .beginFill(0xFF00FF)
                    .drawRect(0, 0, 5, 5)
                    .endFill();
                this.particles.push(brick);
            }
            this.build();

            // this.handleKeyDown = this.handleKeyDown.bind(this);
            // document.addEventListener('keydown', this.handleKeyDown);
            this.app.ticker.add(this.animate.bind(this));
        },
        stop() {
            this.app.ticker.destroy();
            this.renderer.destroy();
        },
        reset() {
            this.BricksReset();
            this.build();
        },
        build() {
            this.stage.addChild(this.bricksCont);
            const paddle = this.Paddle();
            paddle.x = (this.canvasWidth - paddle.width) / 2;
            paddle.y = this.canvasHeight - paddle.height;
            this.stage.addChild(paddle);
            this.paddle = paddle;

            this.ball = this.Ball();
            this.ball.x = this.halfWidth;
            this.ball.y = this.halfHeight;
            this.stage.addChild(this.ball);
            this.gamePlay = true;
        },
        addParticles(brick) {
            for (let j = 0; j < this.particleAtATime; j++) {
                if (this.partcileCounter > this.particleQ - 1) {
                    this.partcileCounter = 0;
                }
                const particle = this.particles[this.partcileCounter];
                particle.vy = Math.random() * 5 + 1;
                particle.vx = Math.random() * 5 + 0.1;
                particle.rotQ = Math.random() * 5 + 0.1;
                if (Math.floor(Math.random() * 2) > 0) {
                    particle.vx *= -1;
                }
                particle.x = (Math.random() * brick.width) + brick.x;
                particle.y = brick.y;
                this.stage.addChild(particle);
                this.partcileCounter++;
            }
        },
        Bricks() {
            this.bricks = [];
            this.bricksQ = 0;
            const cont = new PIXI.Container();
            const brickWidth = Math.ceil(this.canvasWidth / this.brickColQ);
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.brickColQ; j++) {
                    const brick = new PIXI.Graphics();
                    brick
                        .beginFill(0xFF00FF)
                        .drawRect(0, 0, brickWidth, this.brickHeight)
                        .endFill();
                    brick.x = j * brickWidth;
                    brick.y = i * this.brickHeight;
                    brick.alpha = (Math.random() * 1) + 0.2;
                    this.storeBricks.push(brick);

                    this.bricks.push(brick);
                    cont.addChild(brick);
                    this.bricksQ++;
                }
            }
            return cont;
        },
        BricksReset() {
            this.bricks = [];
            this.bricksQ = 0;
            for (let i = 0; i < this.storeBricks.length; i++) {
                const brick = this.storeBricks[i];
                this.bricks.push(brick);
                this.bricksCont.addChild(brick);
                this.bricksQ++;
            }
            return this.bricksCont;
        },
        Paddle() {
            if (!this.paddle) {
                const paddle = new PIXI.Graphics();
                paddle
                    .beginFill(0x000000)
                    .drawRect(0, 0, 200, 20)
                    .endFill();
                paddle.vx = 10;
                paddle.moveRight = false;
                paddle.moveLeft = false;
                return paddle;
            }
            return this.paddle;
        },
        Ball() {
            if (!this.ball) {
                const ball = new PIXI.Graphics();
                ball
                    .beginFill(0x000000)
                    .drawCircle(0, 0, 40)
                    .endFill();
                ball.radius = 20;
                ball.vx = ball.vy = 10;
                return ball;
            }
            return this.ball;
        },
        resize() {
            this.stage.removeChildren();
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = this.utils.returnCanvasHeight();
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer.resize(this.canvasWidth, this.canvasHeight);
            this.bricksCont = this.Bricks();
            this.build();
        },
        handleKeyDown(event) {
            event.preventDefault();
            switch (event.keyCode) {
            case 39:
                // right
                this.paddle.vx = this.paddle.speed;
                this.paddle.moveLeft = false;
                this.paddle.moveRight = true;
                this.paddle.peterOut = false;

                break;
            case 37:
                // left
                this.paddle.vx = this.paddle.speed;
                this.paddle.moveLeft = true;
                this.paddle.moveRight = false;
                this.paddle.peterOut = false;
                break;
            case 13:
                this.startButton.classRef.startGame();
                break;
            default:
                this.paddle.vx = 0;
                break;
            }
        },
        handleKeyUp(event) {
            switch (event.keyCode) {
            case 39:
                // right
                this.paddle.moveRight = false;
                this.paddle.peterOut = true;
                break;
            case 37:
                // left
                this.paddle.peterOut = true;
                this.paddle.moveLeft = false;
                break;
            default:
                this.paddle.moveRight = false;
                this.paddle.peterOut = false;
                this.paddle.peterOut = false;
                this.paddle.moveLeft = false;
                break;
            }
        },
        animate() {
            if (this.gamePlay) {
                this.ball.x += this.ball.vx;
                this.ball.y += this.ball.vy;
                this.paddle.x = this.ball.x - this.paddle.width / 2;

                if (this.ball.y < 0 || this.ball.y > this.canvasHeight - this.paddle.height) {
                    this.ball.vy *= -1;
                } else if (this.ball.x > this.canvasWidth - this.ball.radius || this.ball.x < this.ball.radius) {
                    this.ball.vx *= -1;
                }

                for (let i = 0; i < this.bricksQ; i++) {
                    const brick = this.bricks[i];
                    const rect = new PIXI.Rectangle(brick.x, brick.y, brick.width, brick.height);
                    if (this.utils.circleRectangleCollision(this.ball, rect)) {
                        this.bricks.splice(i, 1);
                        brick.parent.removeChild(brick);
                        this.bricksQ--;
                        this.ball.vy *= -1;
                        this.addParticles(brick);
                        if (this.bricksQ === 0) {
                            this.gamePlay = false;
                            this.reset();
                        }
                    }
                }

                for (let j = 0; j < this.particleQ; j++) {
                    const part = this.particles[j];
                    if (part.parent === this.stage) {
                        part.y += part.vy;
                        part.x += part.vx;
                        part.rotation += this.utils.deg2rad(part.rotQ);
                        if (part.y > this.canvasHeight) {
                            this.stage.removeChild(part);
                        }
                    }
                }

                // if(this.paddle.moveRight){
                //     this.paddle.vx = -Math.abs(this.paddle.vx);
                // }
                // else if(this.paddle.moveLeft){
                //     this.paddle.vx = Math.abs(this.paddle.vx);
                // }


                // if(this.paddle.x > this.canvasWidth){
                //     this.paddle.x = this.canvasWidth;
                // } else if(this.paddle.x < 0 ) {
                //     this.paddle.x = 0;
                // }
            }
            this.renderer.render(this.stage);
        },
    };
}
