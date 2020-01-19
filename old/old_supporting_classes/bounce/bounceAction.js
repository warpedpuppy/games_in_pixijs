import Utils from '../../utils/utils';

export default function () {
    return {
        speedLimit: 5,
        vx: 0,
        vy: 0,
        angle: 0,
        velocity: 10,
        legCounter: 0,
        legCounterLimit: 10,
        utils: Utils,
        gravity: 0.5,
        init(bouncePlatform) {
            this.hero = this.utils.hero;
            this.bouncePlatform = bouncePlatform;
            this.canvasWidth = this.utils.canvasWidth;
            this.canvasHeight = this.utils.canvasHeight;
        },
        resize(wh) {
            this.canvasWidth = wh.canvasWidth;
            this.canvasHeight = wh.canvasHeight;
        },
        rotate() {

        },

        animate() {
            // this.hero.vy += 0.25;


            this.hero.activeHero.animate(); // this is the reticulated bouncing


            if (this.hero.activeHero.legStyle === 2) {
                this.legCounter++;
                if (this.legCounter >= this.legCounterLimit) {
                    this.hero.activeHero.bounce(false);
                    this.legCounter = 0;
                }
            }

            if (this.vy < this.speedLimit) {
		            this.vy += this.gravity;
		        }


		        if (this.vy > 0) {
		        	// console.log('up');
		        	if (this.vy > this.speedLimit) {
		                this.vy -= this.gravity;
		            }
		        } else {
		        	// console.log('down')
		        }


            const { dot1 } = this.bouncePlatform;
            const { dot2 } = this.bouncePlatform;
            const { line } = this.bouncePlatform;
				 if (this.bouncePlatform.mouseDown !== true) {
	                dot1.y -= this.vy;
	                dot2.y -= this.vy;
	                line.y -= this.vy;

	                dot1.x -= this.vx;
	                dot2.x -= this.vx;
	                line.x -= this.vx;
	            }

				 // BOUNCING PLATFORM COLLISION DETECTION

		        const A = { x: this.bouncePlatform.dot1.x, y: this.bouncePlatform.dot1.y };
		        const B = { x: this.bouncePlatform.dot2.x, y: this.bouncePlatform.dot2.y };
		        const C = { x: this.utils.canvasWidth / 2, y: this.utils.canvasHeight / 2 };
		        if (this.bouncePlatform.mouseDown !== true && this.utils.lineIntersectCircle(A, B, C, 20)) {
		        	this.hero.y -= 10;
		         	this.hero.activeHero.bounce(true);
		            const delta_x = dot1.x - dot2.x;
                const delta_y = dot1.y - dot2.y;
                const theta_radians = Math.atan2(delta_y, delta_x);

		            this.vx = this.velocity * -Math.sin(theta_radians);
                this.vy = (this.velocity * Math.cos(theta_radians)) * 1.75;
		        }
        },
    };
}
