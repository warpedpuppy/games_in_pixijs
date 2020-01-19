import * as PIXI from 'pixi.js';
import Utils from '../utils/utils';

export default function () {
    return {
        segmentsQ: 5,
        cont: new PIXI.Container(),
        pos: [],
        radius: 20,
        storeRadius: 0,
        body: undefined,
        mode: undefined,
        vy: 0,
        vx: 0,
        bounce: 0,
        platforms: [],
        yOffset: 0,
        parentCont: undefined,
        utils: Utils,
        airBubbles: [],
        init(wh, items, parentCont, spritesheet) {
            this.parentCont = parentCont;
            this.canvasWidth = wh.canvasWidth;
            this.canvasHeight = wh.canvasHeight;
            this.cont.x = this.canvasWidth / 2;
            this.cont.y = (this.canvasHeight / 2) - this.yOffset;
            this.segments = [];
            this.dragon = [];
            this.fish = [];
            this.spritesheet = spritesheet;

            this.bounce = this.utils.randomNumberBetween(-0.6, -0.9);
            this.vy = this.utils.randomNumberBetween(3, 5);

            if (items) {
            	  for (let i = 0; i < items.length; i++) {
	            	const item = PIXI.Sprite.fromImage(items[i].url);
	            	if (items[i].active) {
		            	this.cont.addChild(item);
		            }
	            }
            }

            parentCont.addChild(this.cont);
            return this;
        },
        personMode() {
            this.cont.removeChildren();
            if (!this.body) {
                this.body = new PIXI.Graphics();
                this.body.beginFill(0xFF0000).drawCircle(0, 0, this.radius).endFill();
                this.body.pivot.set(0.5);
            }
            this.cont.radius = this.radius;
            this.cont.addChild(this.body);
            this.cont.y = (this.canvasHeight / 2) - this.yOffset;
            this.cont.x = this.canvasWidth / 2;
        },
        fishMode() {
            this.cont.removeChildren();
            this.segmentsQ = 5;
            this.segmentHeight = 25;
            this.finCont = new PIXI.Container();
            this.eyeCont = new PIXI.Container();
            if (!this.fish.length) {
                for (let i = 0; i < 4; i++) {
                    const r = new PIXI.Sprite(this.spritesheet.textures['gradientRing.png']);
                    r.anchor.set(0.5);
                    r.scale.set(0);
                    this.airBubbles.push(r);
                }
				 for (let i = 0; i < this.segmentsQ; i++) {
				 	const fishNum = i + 1;
	                const segment = this.fishBodySegment(this.segmentHeight, 0xFFFF00, i, `/bmps/fish${fishNum}.png`);
	                this.fish.push(segment);
	                this.cont.addChildAt(segment, 0);
	            }
            } else {
				 for (let i = 0; i < this.segmentsQ; i++) {
	                this.cont.addChildAt(this.fish[i], 0);
	            }
	            const rightFin = this.rightFin = new PIXI.Sprite(this.spritesheet.textures['swimFin.png']);
	            this.rightFin.x = this.fishRadius - 20;
	            const index = this.cont.children.length - 2;
	            this.finCont.addChild(rightFin);
	            const leftFin = this.leftFin = new PIXI.Sprite(this.spritesheet.textures['swimFin.png']);
	            leftFin.scale.x = -1;
	            this.leftFin.x = -this.fishRadius + 20;
	            this.finCont.addChild(leftFin);
	            this.cont.addChildAt(this.finCont, index);

	            const rightEye = this.rightEye = new PIXI.Sprite(this.spritesheet.textures['swimEye.png']);
	            rightEye.anchor.set(0.5);
	            this.rightEye.x = this.fishRadius - 20;
	            this.eyeCont.addChild(rightEye);
	            const leftEye = this.leftEye = new PIXI.Sprite(this.spritesheet.textures['swimEye.png']);
	            this.leftEye.x = -this.fishRadius + 20;
	            leftEye.anchor.set(0.5);
	            this.eyeCont.addChild(leftEye);
	            this.cont.addChild(this.eyeCont);
            }
            this.cont.radius = 0;
            this.segments = this.fish;
        },
        fishBodySegment(radius, color, num, str) {
            const cont = new PIXI.Container();
            cont.radius = radius;
            cont.height = cont.radius * 4;
            cont.vx = 0;
            cont.vy = 0;
            cont.xpos = 0;
            cont.ypos = 0;

            // let b = new PIXI.Sprite.fromImage(str);
            const b = new PIXI.Sprite(this.spritesheet.textures['swimBodySegment.png']);
            this.fishRadius = b.width / 2;
            const scale = 1 - (num * 0.1);
            b.scale.set(scale);
            b.y = num * radius;
		    b.anchor.set(0.5);
            cont.addChild(b);
            cont.body = b;
            if (num === this.segmentsQ - 1) {
                const tail = this.tail = new PIXI.Sprite(this.spritesheet.textures['swimTail.png']);
                this.tail.anchor.x = 0.5;

                tail.y = b.y + (b.width / 2) - 20;
                cont.addChildAt(tail, 0);
            }
            return cont;
        },
        dragonMode() {
            this.cont.removeChildren();
            this.segmentsQ = 10;
            if (!this.dragon.length) {
				 for (let i = 0; i < this.segmentsQ; i++) {
	                const segment = this.bodySegment(25, 0xFFFF00, i * 25);
	                this.dragon.push(segment);
	                this.cont.addChild(segment);
	            }
            } else {
				 for (let i = 0; i < this.segmentsQ; i++) {
	                this.cont.addChild(this.dragon[i]);
	            }
            }

            if (!this.leftWing) {
				 this.leftWing = new PIXI.Sprite(this.spritesheet.textures['leftWing.png']);
				 this.rightWing = new PIXI.Sprite(this.spritesheet.textures['rightWing.png']);
				 this.leftWing.pivot.x = 206;
				 this.leftWing.pivot.y = 54;
				 this.rightWing.pivot.y = 70;
				 this.wingCont = new PIXI.Container();
				 this.wingCont.y = 20;
				 this.wingCont.addChild(this.leftWing);
				 this.wingCont.addChild(this.rightWing);
            }
            this.cont.radius = 0;
            this.cont.addChildAt(this.wingCont, 0);
            this.segments = this.dragon;
        },
        resize(wh) {
            this.canvasWidth = wh.canvasWidth;
            this.canvasHeight = wh.canvasHeight;
            this.cont.x = this.canvasWidth / 2;
            this.cont.y = this.canvasHeight / 2;
        },
        switchPlayer(string) {
            this.mode = string;
            this.vx = 0;
            if (string === 'jump' || string === 'bounce') {
                this.personMode();
            } else if (string === 'swim') {
                this.cont.x = this.canvasWidth / 2;
                this.cont.y = this.canvasHeight / 2;
                this.fishMode();
            } else {
                this.cont.y = this.canvasHeight / 2;
                this.cont.x = this.canvasWidth / 2;
                this.dragonMode();
            }
        },
        bodySegment(radius, color, yVal, str) {
            const cont = new PIXI.Container();
            cont.radius = radius;
            cont.height = cont.radius * 4;
            cont.vx = 0;
            cont.vy = 0;
            cont.xpos = 0;
            cont.ypos = 0;
            // let b = new PIXI.Sprite.fromImage(str);
            const b = new PIXI.Graphics();

            b.y = yVal;
            const triangleWidth = 25;
		        const triangleHeight = triangleWidth;
		        const triangleHalfway = triangleWidth / 2;

		    // draw triangle
		    b.beginFill(0xFF0000, 1);
		    b.lineStyle(0, 0xFF0000, 1);
		    b.moveTo(triangleWidth, 0);
		    b.lineTo(triangleHalfway, triangleHeight);
		    b.lineTo(0, 0);
		    b.lineTo(triangleHalfway, 0);
		    b.endFill();
		    b.pivot.x = b.pivot.y = 12.5;
		    b.rotation = this.utils.deg2rad(180);
            cont.addChild(b);
            cont.body = b;
            return cont;
        },
    };
}
