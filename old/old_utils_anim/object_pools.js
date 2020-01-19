/**
 * Created by edwardwalther on 4/16/15.
 */

function ObjectPools(gv) {
    this.onOff = false;
    this.gridExplode = false;

    this.cont = new PIXI.DisplayObjectContainer();
    this.cont2 = new PIXI.DisplayObjectContainer();
    this.objQ = (gv.webGL == true) ? 200 : 50;
    this.lines = [];
    this.dots = [];
    this.screen = new PIXI.Graphics();
    for (let i = 0; i < this.objQ; i++) {
        this.lines.push(new PIXI.Sprite.fromFrame('line.gif'));
        this.dots.push(new PIXI.Sprite.fromFrame('dot.png'));
    }


    this.key = 0.005;// Math.floor(Math.random()*100);
}
ObjectPools.prototype.resize = function (width, height) {
    TweenLite.killTweensOf(this.screen);
    this.clear();

    /* this.screen.clear();
    this.screen.beginFill(0x663399).drawRect(0,0,gv.canvasWidth, gv.canvasHeight).endFill();
    this.gv.stage.addChildAt(this.screen, 0);
    this.screen.alpha = 0;
    TweenLite.to(this.screen,1, {alpha:.75});


    this.cont.x = width/2; */
};
ObjectPools.prototype.miniBurst = function (addTo, displayObject, color) {
    TweenLite.killTweensOf(this.screen);
    TweenLite.killTweensOf(this.cont2);
    TweenLite.killTweensOf(this.cont);
    this.clear();
    let dot;
    for (let i = 0; i < this.objQ; i++) {
        dot = this.dots[i];
        dot.x = dot.storeX = randomNumberBetween(0, displayObject.width);
        dot.y = dot.storeY = randomNumberBetween(0, displayObject.height);
        dot.angle = Math.round(Math.random() * 360);
        dot.speed = randomNumberBetween(5, 20);
        dot.vx = Math.cos(dot.angle) * dot.speed;

        dot.vy = Math.sin(dot.angle) * dot.speed;
        const colorVar = color == undefined ? 0xFFFF00 : parseInt(`0x${randomHex().substring(1)}`);
        dot.tint = colorVar;
        dot.alpha = randomNumberBetween(0.2, 1);
        dot.scale.x = dot.scale.y = randomNumberBetween(0.1, 0.5);
        this.cont2.addChild(dot);
    }

    addTo.addChild(this.cont2);
    this.miniBurstCounter = 0;
    this.onOff = true;
    this.tickIt = this.tickItMiniBurst;

    TweenLite.delayedCall(4, proxy(this.clear, this));
};

function randomHex() {
    return '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
}

ObjectPools.prototype.grid = function (addTo, displayObject, gv, color) {
    let dot;
    for (let i = 0; i < this.objQ; i++) {
        dot = this.dots[i];
        dot.x = dot.storeX = randomNumberBetween(0, displayObject.width);
        dot.y = dot.storeY = randomNumberBetween(0, displayObject.height);
        dot.angle = Math.round(Math.random() * 360);
        dot.speed = randomNumberBetween(5, 20);
        dot.vx = Math.cos(dot.angle) * dot.speed;

        dot.vy = Math.sin(dot.angle) * dot.speed;
        const colorVar = color == undefined ? 0xFFFF00 : parseInt(`0x${randomHex().substring(1)}`);
        dot.tint = colorVar;
        dot.alpha = randomNumberBetween(0.2, 1);
        dot.scale.x = dot.scale.y = randomNumberBetween(0.25, 1.25);
        this.cont2.addChild(dot);
    }
    this.gridExplode = true;
    addTo.addChild(this.cont2);
};
ObjectPools.prototype.radial = function (displayObject, point, gv) {
    let line;
    this.gv = gv;
    this.point = point;

    for (let i = 0; i < this.objQ; i++) {
        line = this.lines[i];
        line.x = 0;
        line.y = 0;
        line.startPoint = randomNumberBetween(0, 100);
        line.endPoint = randomNumberBetween(100, gv.canvasHeight);
        line.speed = randomNumberBetween(0.0005, 0.001);
        line.tint = 0xFFFF00;
        line.alpha = randomNumberBetween(0.1, 1);
        line.height = randomNumberBetween(0.5, 3);
        line.width = randomNumberBetween(50, gv.canvasWidth);
        line.anchor.y = 0.5;
        line.rotation = deg2rad(randomNumberBetween(0, 360));
        this.cont.addChild(this.lines[i]);
    }
    this.cont.x = point.x;
    this.cont.y = point.y;
    this.cont.scale.x = this.cont.scale.y = this.cont.alpha = 0;
    TweenLite.to(this.cont, 1, { alpha: 1 });
    TweenLite.to(this.cont.scale, 1, {
        x: 1, y: 1, alpha: 1, ease: Back.easeOut,
    });
    displayObject.addChildAt(this.cont, 0);
    this.onOff = true;
    this.tickIt = this.tickItRadial;

    this.screen.clear();
    this.screen.beginFill(0x663399).drawRect(0, 0, gv.canvasWidth, gv.canvasHeight).endFill();
    displayObject.addChildAt(this.screen, 0);
    this.screen.alpha = 0;
    TweenLite.to(this.screen, 1, { alpha: 0.75 });
};

ObjectPools.prototype.shutOff = function () {
    this.tickIt = null;
    TweenLite.to(this.screen, 0.5, { alpha: 0 });
    TweenLite.to(this.cont2, 0.5, { alpha: 0 });
    TweenLite.to(this.cont, 0.5, { alpha: 0, onComplete: proxy(this.clear, this) });
};

ObjectPools.prototype.clear = function () {
    this.screen.alpha = 0;
    this.cont2.alpha = this.cont.alpha = 1;

    this.gridExplode = false;
    this.tickIt = null;
    this.onOff = false;
    this.cont.removeChildren();
    if (this.cont.parent != undefined) this.cont.parent.removeChild(this.cont);

    this.cont2.removeChildren();
    if (this.cont2.parent != undefined) this.cont2.parent.removeChild(this.cont);


    if (this.screen.paren != undefined) this.screen.parent.removeChild(this.screen);


    for (let i = 0; i < this.objQ; i++) {
        dot = this.dots[i];
        dot.x = dot.storeX;
        dot.y = dot.storeY;
    }
};

ObjectPools.prototype.tickItMiniBurst = function () {
    for (let i = 0; i < this.objQ; i++) {
        dot = this.dots[i];
        dot.x += dot.vx;
        dot.y += dot.vy;

        /* if(dot.x > gv.canvasWidth*2 || dot.x < -gv.canvasWidth*2 || dot.y < -gv.canvasHeight*2 || dot.y > gv.canvasHeight*2){
                *//* dot.x  = dot.storeX;
                dot.y  = dot.storeY; *//*
                this.miniBurstCounter ++;
                if(this.miniBurstCounter >=this.objQ)this.clear();
            } */
    }
};
ObjectPools.prototype.tickItRadial = function () {
    this.cont.rotation += this.key;

    for (let i = 0; i < this.objQ; i++) {
        line = this.lines[i];
        line.width = Math.abs(cosWave(line.startPoint, line.endPoint, line.speed));

        if (this.gridExplode == true) {
            dot = this.dots[i];
            dot.x += dot.vx;
            dot.y += dot.vy;

            if (dot.x > this.gv.canvasWidth || dot.x < -this.gv.canvasWidth || dot.y < -this.gv.canvasHeight || dot.y > this.gv.canvasHeight) {
                dot.x = dot.storeX;
                dot.y = dot.storeY;
            }
        }
    }
};
