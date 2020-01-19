export default function Protagonist (PIXI, diameter, utils, TweenMax) {
	return {
		numBalls: 4,
		balls: [],
		gravity: 2.5,
		friction: 0.8,
		width: 50,
		spring: 0.075,
		cont: new PIXI.Container(),
		colors: [0x333333, 0xFF00FF, 0x339900, 0x333333, 0x991100],
		scales: [0.1, 0.25, 0.5, 0.75, 1],
		pos: [],
		increment: 10,
		counter: 0,
		VELOCITY_LIMIT : 0.3,
		move: false,
		build: function () {

		this.velocity = this.getRandomValue(1, 2);
		this.theta = 0;
		this.radius = 0;
		this.vx = this.velocity * Math.sin(this.radius);
		this.vy = -this.velocity * Math.cos(this.radius);


			for (let i = 0; i < this.numBalls; i++) {
                let ball = this.Ball(this.width, this.colors[i], i*this.width);
                this.balls.push(ball);
                // ball.scale.x = ball.scale.y = this.scales[i];
                this.cont.addChildAt(ball, 0);
            }

            // for (let i = 0; i < 100; i ++){
            // 	 this.pos.push([0,0]);
            // }
            this.cont.balls = this.balls;
            this.utils = utils;
            this.Ball = this.Ball.bind(this);
		},
		getRandomValue : function(min, max){
			return min + (max - min) * Math.random();
		},
		Ball: function (radius, color, yVal) {

			let cont = new PIXI.Container();
			//cont.pivot.x = cont.pivot.y = 50;
            cont.radius = radius;
            cont.height = cont.radius * 4;
            cont.vx = 0;
            cont.vy = 0;
            cont.xpos = 0;
            cont.ypos = 0;

            let b = new PIXI.Graphics();
            // b.beginFill(color).drawRect(0,0, 100, 100);
             b.y = yVal;


            let triangleWidth = 100,
		        triangleHeight = triangleWidth,
		        triangleHalfway = triangleWidth/2;

		    //draw triangle 
		    b.beginFill(0xFF0000, 1);
		    b.lineStyle(0, 0xFF0000, 1);
		    b.moveTo(triangleWidth, 0);
		    b.lineTo(triangleHalfway, triangleHeight); 
		    b.lineTo(0, 0);
		    b.lineTo(triangleHalfway, 0);
		    b.endFill();
		    b.pivot.x = b.pivot.y = 50;
		    b.rotation = utils.deg2rad(180);


            cont.addChild(b);

            cont.body = b;

            return cont;
		},
		rotate: function (str) {
			console.log(str)
			let inc = 360;
			if(str === 'left'){
				this.radius -= (Math.PI * 2) / inc;
				this.vx = this.velocity * Math.sin(this.radius);
				this.vy = -this.velocity * Math.cos(this.radius);

			


			} else if (str === 'right') {
				this.radius += (Math.PI * 2) / inc;
				this.vx = this.velocity * Math.sin(this.radius);
				this.vy = -this.velocity * Math.cos(this.radius);
			} else if (str === 'down') {
				this.radius += (Math.PI * 2) / 2;
				this.vx = this.velocity * Math.sin(this.radius);
				this.vy = -this.velocity * Math.cos(this.radius);
			}
		},
		animate: function () {
		
        
		  
           //this.cont.x = 300 ;
           // this.cont.y = 0;
           //this.balls[0].x = this.balls[0].y = Math.floor(utils.cosWave(300, 50, 0.0015));
           //this.cont.rotation = utils.deg2rad(Math.floor(utils.cosWave(0, 50, 0.0015)));
        //    this.pos.push([this.balls[0].x, this.balls[0].y]);

        //    for (let i = 1; i < this.numBalls; i++) {
	       //    	this.balls[i].x = this.pos[this.pos.length - (i * this.increment)][0];
	       //    	this.balls[i].y = this.pos[this.pos.length - (i * this.increment)][1];
	       // }
	       
	       // let maxLength = this.increment * this.numBalls;
	       // if (this.pos.length > maxLength) {
	       // 	 this.pos = this.pos.slice(-maxLength);
	       // }
         	// let increment = 2;

         	// if(this.counter % increment === 0){
         	// 	this.pos[this.counter] = this.balls[0].x;
         	// }

         	// let maxLength = this.numBalls * increment;
         	// // if(this.xs.length < arrayMaxLegth) return;

         	// for (let i = this.numBalls-1; i >= 1; i--) {
	         //  	this.balls[i].x = this.pos[i*10];
	         // }

	         // // this.xs = this.xs.slice(-arrayMaxLegth)
	         //  this.counter ++;
	         //  if (this.counter > maxLength) {
	         //  	this.counter = 0;
	         //  }
	         //  console.log(this.pos)
           
        },
       
        returnChain: function () {
        	this.cont.radius = this.width / 2;
        	return this.cont;
        }
	}
}