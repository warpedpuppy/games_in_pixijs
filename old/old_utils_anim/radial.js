export default function (Utils, PIXI, canvas) {
    return {
        gv: {},
        left_adjustment: 0.15,
        utils: new Utils(),
        app: new PIXI.Application(),
        loader: PIXI.loader,
        Init() {
            window.onresize = this.resizeFunction.bind(this);
            this.gv.animate = true;
            this.gv.canvasWidth = this.utils.returnCanvasWidth();
            this.gv.canvasHeight = this.utils.returnCanvasHeight();
            this.gv.halfHeight = this.gv.canvasHeight / 2;
            this.gv.halfWidth = this.gv.canvasWidth / 2;
            this.gv.dots = [];
            this.gv.lines = [];
            this.gv.stage = new PIXI.Container();
            this.gv.renderer = PIXI.autoDetectRenderer(this.gv.canvasWidth, this.gv.canvasHeight);
            this.gv.renderer.backgroundColor = 0x333333;
            canvas.appendChild(this.gv.renderer.view);
            this.gv.dotCont = new PIXI.Container();
            this.gv.stage.addChild(this.gv.dotCont);
            this.gv.lineCont = new PIXI.Container();
            this.gv.stage.addChild(this.gv.lineCont);
            this.gv.webGL = !((this.gv.renderer instanceof PIXI.CanvasRenderer));
            this.gv.dotQ = (this.gv.webGL === true) ? 1000 : 100;
            this.gv.lineQ = (this.gv.webGL === true) ? 360 : 36;
            if (!this.loader.resources.spritesheet) {
                this.loader.add('spritesheet', '/bmps/shimmer.json').load(this.Main.bind(this));
            } else {
                this.Main.bind(this);
                this.Main();
            }
        },
        Main() {
            this.app.ticker.add(this.animate.bind(this));
            this.dots();
            this.lines();
        },
        Stop() {
            this.app.ticker.remove(this.animate.bind(this));
        },
        lines() {
            if (this.gv.canvasWidth > 1024) {
                this.gv.lineCont.x = this.gv.canvasWidth * this.left_adjustment;
                this.gv.lineCont.y = 150;
            } else {
                this.gv.lineCont.x = this.gv.halfWidth;
                this.gv.lineCont.y = 150;
            }

            this.gv.lineCont.removeChildren();
            this.gv.lines = [];
            for (let i = 0; i < this.gv.lineQ; i++) {
                const line = this.Line();
                line.rotation = this.utils.deg2rad(i * (360 / this.gv.lineQ));
                line.x = 0;
                line.y = 0;
                this.gv.lineCont.addChildAt(line, 0);
                this.gv.lines.push(line);
            }
        },
        Line() {
            const line = new PIXI.Sprite.fromFrame('line.gif');
            line.scale.y = 0.25;
            line.scale.x = line.scaleValue = this.utils.randomNumberBetween(0.25, 1);
            line.scaleDiff = this.utils.randomNumberBetween(0.5, 1);
            line.alpha = 0.05; // randomNumberBetween(0.1, 0.75);
            line.speed = this.utils.randomNumberBetween(0.0005, 0.001);
            line.tint = 0xFFFF00;
            return line;
        },
        dots() {
            this.gv.dotCont.removeChildren();
            this.gv.dots = [];
            for (let i = 0; i < this.gv.dotQ; i++) {
                const dot = this.Dot();
                dot.x = dot.startX;
                dot.y = dot.startY;
                this.gv.dotCont.addChildAt(dot, 0);
                this.gv.dots.push(dot);
            }
        },
        Dot() {
            const dot = new PIXI.Sprite.fromFrame('dot.png');
            dot.scale.x = dot.scale.y = this.utils.randomNumberBetween(0.25, 1);
            dot.startX = Math.random() * this.utils.returnCanvasWidth();
            dot.startY = Math.random() * this.utils.returnCanvasHeight();
            dot.xDiff = Math.abs(dot.startX);
            dot.yDiff = Math.abs(dot.startY);
            dot.alpha = 0.05;
            dot.speed = this.utils.randomNumberBetween(0.0005, 0.001);
            dot.tint = 0xFFFF00;
            return dot;
        },
        resizeFunction() {
            this.gv.canvasWidth = this.utils.returnCanvasWidth();
            this.gv.canvasHeight = this.utils.returnCanvasHeight();
            this.gv.halfWidth = this.gv.canvasWidth / 2;
            this.gv.renderer.resize(this.gv.canvasWidth, this.gv.canvasHeight);
            this.dots();
            this.lines();
        },
        animate() {
            if (this.gv.animate === true) {
                for (var i = 0; i < this.gv.dotQ; i++) {
                    const dot = this.gv.dots[i];
                    dot.x = this.utils.cosWave(dot.startX, dot.xDiff, dot.speed);
                    dot.y = this.utils.cosWave(dot.startY, dot.yDiff, dot.speed);
                }
                for (i = 0; i < this.gv.lineQ; i++) {
                    const line = this.gv.lines[i];
                    line.scale.x = this.utils.cosWave(line.scaleValue, line.scaleDiff, line.speed);
                }
                this.gv.lineCont.rotation += 0.005;
                this.gv.renderer.render(this.gv.stage);
            }
        },
    };
}
