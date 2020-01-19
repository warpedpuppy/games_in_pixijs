export default function(Utils, PIXI, canvas, TimelineMax) {
	return {
		gv: {},
		pegQ: 0,
		pegs: [],
		utils: new Utils(),
    	app: new PIXI.Application(),
		body: new PIXI.Graphics(),
		foregroundContainer: new PIXI.Container(),
		backgroundContainer: new PIXI.Container(),
		canvasID: '',
		shakeAllow: true,
		tl: new TimelineMax(), 
		beads: [],
		beadQ: 1200,
		beadsAtATime: 400,
		beadCounter: 0,
		beadsOnStage: [],
		beadRadius: 5,
		beadLoopingQ: 0,
		horizBoxesQ: 5,
		vertBoxesQ: 5,
		totalBoxes: undefined,
		shapes: [],
		blockForegrounds: [],
		blockBackgrounds: [],
		colors: [0x9400D3, 0x4B0082, 0x0000FF, 0x00FF00, 0xFFFF00, 0xFF7F00, 0xFF0000],
		init: function(){
			window.onresize = this.resizeHandler.bind(this);
	        this.canvasWidth = this.utils.returnCanvasWidth();
	        this.stage = new PIXI.Container(); 
	        this.kingCont = new PIXI.Container(); 
	        this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
	        this.renderer.backgroundColor = 0x333333;
	        canvas.appendChild(this.renderer.view);
	        this.webGL = (this.renderer instanceof PIXI.CanvasRenderer) ? false : true;
			this.stage.addChild(this.backgroundContainer);
			this.stage.addChild(this.foregroundContainer);
			this.width =  this.utils.returnCanvasWidth();
			this.height = this.utils.returnCanvasHeight();
			this.halfWidth = this.width/2;
			this.halfHeight = this.height/2;

			this.build = this.build.bind(this);

			if (!this.webGL) {
				console.log('this webgl = ', this.webGL)
				console.log('not webgl')
			}

			


			this.mousePosition = new PIXI.Point(10,10);
            this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
            this.stage.mousemove = this.stage.touchmove = this.mouseMoveHandler;
			
			this.stage.addChild(this.kingCont);
	        this.app.ticker.add(this.animate.bind(this));

	        this.outerCont = new PIXI.Container();
			this.outerCont.x = this.outerCont.y = 200;

	        this.chainCont = new PIXI.Container();
	        this.outerCont.addChild(this.chainCont);
	        this.stage.addChild(this.outerCont);

	        this.resizeHandler();



	    },
	    stop: function () {
	    	window.onresize = undefined;
	        this.app.ticker.destroy();
	    },
	    build: function () {
	    	// let counter = 0;

	    	// for(let i = 0; i < 7; i ++){
	    	// 	let size = 100 + (i*120);
	    	// 	let shape = this.Ring(size, this.colors[counter]);

	    	// 	this.kingCont.addChildAt(shape, 0);
	    	// 	counter ++;
	    	// 	this.shapes.push(shape);
	    	// 	if(counter >= this.colors.length){
	    	// 		counter = 0;
	    	// 	}
	    	// }
	    	let horizBoxQ = 10;
	    	let vertBoxQ = 10;
	    	let boxWidth = this.width/horizBoxQ;
			let boxHeight = this.height/vertBoxQ;
	    	let width = 100;
    		// for(let i = 0; i < vertBoxQ; i ++){
    		//  	 for(let j = 0; j < horizBoxQ; j ++){
		    // 		let item = this.Item(10, width, boxWidth, boxHeight);
		    // 		item.x = i * boxWidth;
		    // 		item.y = j * boxHeight;
		    // 		this.stage.addChild(item)
		    // 	}
		    // }

	    	this.buildChain(); 
	    },
	    buildChain: function () {
            this.spring = 0.1;
            this.friction = 0.8;
            this.gravity = 2.5;
            this.balls = [];
            this.numBalls = 10;
            this.line = new PIXI.Graphics();
            this.chainCont.addChild(this.line);
            let i, ball;
            for (i = 0; i < this.numBalls; i++){
                ball = this.Ball(5, 0xFF0000);
                this.balls.push(ball);
                this.chainCont.addChild(ball);
            }
        },
	    Ball: function (radius, color) {
            let cont = new PIXI.Container();
            cont.radius = radius;
            cont.height = cont.radius * 4;
            cont.vx = 0;
            cont.vy = 0;
            cont.xpos = 0;
            cont.ypos = 0;
            let b = new PIXI.Graphics();
            b.beginFill(color).drawCircle(0,0,cont.radius*2);
            cont.addChild(b);
            cont.body = b;
            return cont;
        },
	    Item: function (q, start, width, height) {
	    	const cont = new PIXI.Container();
	    	let w = width;
	    	let h = height;
	    	for(let i = 0; i < q; i ++) {
	    		let dot = this.Box(w, h, 0x000000);
				dot.alpha = this.utils.randomNumberBetween(0.01, 0.9);
	    		w *= 0.8;
	    		h *= 0.8;
	    		cont.addChild(dot);
	    	}

	    	return cont


	    },
	    Box: function(width, height, color) {
	    	let dot = new PIXI.Graphics();
	    	dot.beginFill(color).drawRect(0,0,width, height).endFill();
	    	return dot;
	    },
		Ring: function (sizeParam, color) {

			const cont = new PIXI.Container();

			var size = sizeParam,
	    		innerSize,
		        x = sizeParam,
		        y = sizeParam,
		        points = [],
		        innerPoints = [];
		        innerSize = size * 0.95;

			points.push(x + size * Math.cos(0), y + size * Math.sin(0));
			innerPoints.push(x + innerSize * Math.cos(0), y + innerSize * Math.sin(0));
			
			for (let side = 0; side < 7; side++) {
				points.push(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
				innerPoints.push(x + innerSize * Math.cos(side * 2 * Math.PI / 6), y + innerSize * Math.sin(side * 2 * Math.PI / 6));
			}

			let colorPent = new PIXI.Graphics();
			colorPent.beginFill(color);
			colorPent.drawPolygon(points)

			let bwPent = new PIXI.Graphics();
			bwPent.beginFill(0x333333);
			bwPent.drawPolygon(innerPoints)

			cont.addChild(colorPent);
			cont.addChild(bwPent);


			cont.pivot.x = cont.pivot.y = cont.width/2;
			cont.rotation = cont.rot = this.utils.randomNumberBetween(0.0001, 0.005);
			if(Math.floor(Math.random()*2) > 0){
				cont.rotation *=-1;
				cont.rot *=-1;
			}
			return cont;
		},
		resizeHandler: function (){
			// this.stage.removeChildren();
			// this.width =  this.utils.returnCanvasWidth();
			// this.height = this.canvasHeight = this.utils.returnCanvasHeight();
			// this.renderer.resize(this.width, this.height);

			// this.stage.addChild(this.kingCont);
	  //       this.stage.addChild(this.outerCont);
			// this.build();
			
		},
		clear: function (){
		},
		displayFPS: function (fps) {
			document
			.getElementById('fpsChecker')
			.innerHTML = `current fps = ${Math.round(fps)}`;
		},
		mouseMoveHandler: function (touchData) {
            this.mousePosition = touchData.data.global;
        },
		animate: function () {
			this.renderer.render(this.stage);
			
			//this.displayFPS(this.app.ticker.FPS)
			

			for(let shape of this.shapes){
				shape.rotation += shape.rot;
			}

			this.line.clear();
            this.line.lineStyle(4, 0xFFFFFF, 1);
            this.line.moveTo(this.mousePosition.x, this.mousePosition.y);
            this.moveBall(this.balls[0], this.mousePosition.x, this.mousePosition.y);
            this.line.lineTo(this.balls[0].x, this.balls[0].y);
            let i, ballA, ballB;
            for (i = 1; i < this.numBalls; i++) {
                ballA = this.balls[i-1];
                ballB = this.balls[i];
                this.moveBall(ballB, ballA.x, ballA.y);
                this.line.lineTo(ballB.x, ballB.y);
            };
			//this.chainCont.rotation = this.utils.deg2rad(Math.floor(this.utils.cosWave(0, 50, 0.0025)));
			//this.outerCont.rotation = this.utils.deg2rad(Math.floor(this.utils.cosWave(500, 300, 0.0015)));
				
		},
		 moveBall: function (ball, targetX, targetY) {
            var tempBallBody = ball;
            ball.vx += (targetX - tempBallBody.x) * this.spring;
            ball.vy += (targetY - tempBallBody.y) * this.spring;
            ball.vy += this.gravity;
            ball.vx *= this.friction;
            ball.vy *= this.friction;
            tempBallBody.x += ball.vx;
            tempBallBody.y += ball.vy;
        }
	}

}

