export default function Ripples (PIXI, app, renderer, stage, wh) {
	return {
		ripples: [],
		totalSprites: 0,
		tick: 0,
		dudeBounds: undefined,
		growing: [],
		init: function () {

			var sprites = new PIXI.particles.ParticleContainer(100, {
                scale: true,
                position: true,
                rotation: true,
                uvs: true,
                alpha: true
            });
            stage.addChild(sprites);

            this.totalSprites = renderer instanceof PIXI.WebGLRenderer ? 100 : 10;

            for (let i = 0; i < this.totalSprites; i++) {
                var dude = PIXI.Sprite.fromImage('/bmps/ring.png');
                dude.anchor.x = dude. anchor.y = 0.5;
                dude.startScale = 0.1
                dude.scale.set(dude.startScale);
                dude.counter = 0;
                this.ripples.push(dude);
                sprites.addChild(dude);
            }
            // create a bounding box box for the little maggots
            var dudeBoundsPadding = 100;
            this.dudeBounds = new PIXI.Rectangle(
                -dudeBoundsPadding,
                -dudeBoundsPadding,
                app.screen.width + dudeBoundsPadding * 2,
                app.screen.height + dudeBoundsPadding * 2
            );

            this.tick = 0;
            this.animate = this.animate.bind(this);
            stage.interactive = true;
            this.mouseMove = this.mouseMove.bind(this);
            stage.on('pointermove', this.mouseMove);
             this.counter = 0;
             this.opc = 0;
		},
		grow: function (ripple, index) {

			 console.log(`${index}) ${ripple.counter} ${ripple}`)
			// console.log(ripple)

			ripple.scale.x += 0.01;
			ripple.scale.y += 0.01;
			ripple.counter ++;

			if (ripple.counter >= 100){
				this.reset(ripple);
				ripple.alpha = 0;
				this.growing.splice(this.growing.indexOf(ripple), 1);
			}
		
		},
		reset: function (ripple) {
			ripple.counter = 0;
			ripple.alpha = 1;
			//ripple.scale.set(0.01);
			
		},
		mouseMove: function(e){
			this.counter ++;
			if(this.counter % 10 === 0){

				let pos = e.data.global;
				if(this.growing.indexOf(this.ripples[this.opc]) !== -1)return;
				this.ripples[this.opc].alpha =1;
				this.ripples[this.opc].tint = Math.random() * 0xE8D4CD;
				this.ripples[this.opc].x = pos.x;
				this.ripples[this.opc].y = pos.y;
				//this.growing.push(this.ripples[this.opc]);
				this.opc ++;
				if(this.opc > this.totalSprites -1 ){
					this.opc = 0;
				}
				this.counter = 0;
			}
			
		},
		animate: function (){
			console.log("length = "+this.growing.length)
			// for(let i = 0; i < this.growing.length; i++){
			// 	this.grow(this.growing[i], i);
			// }
			for (let i = 0; i < this.totalSprites; i++) {
				this.ripples[i].counter ++;
				this.ripples[i].startScale += 0.001;
                this.ripples[i].scale.set(this.ripples[i].startScale);
            }
		}
	}
}