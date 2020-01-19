import Assets from '../../../utils/assetCreation';
import Utils from '../../../utils/utils';
import Config from '../../../animationsConfig';

export default {
    utils: Utils,
    minDist: 100,
    springAmount: 0.001,
    earnedRings: [],
    earnedLines: [],
    init(parent) {
        this.parent = parent;
        this.createRings();
    },
    createRings() {
        this.rings = [...Assets.rings];
        this.lines = [...Assets.lines];
        this.earnedRings = [];

        for (let i = 0; i < Config.bounceTotalPoints; i++) {
            const r = this.rings[i];
            r.anchor.set(0.5);
            r.scale.set(0.15);// .set(this.utils.randomNumberBetween(0.1, 0.5));
            r.name = 'ring';
            r.hit = false;
            r.tint = 0x00FF00;
            r.speedAdjust = this.utils.randomNumberBetween(0.1, 0.65);
            r.y = this.utils.randomNumberBetween(0, this.utils.canvasHeight);
            r.x = this.utils.randomNumberBetween(0, this.utils.canvasWidth);
            r.vx = Math.random() * 6 - 3;
            r.vy = Math.random() * 6 - 3;
            r.rotate = this.utils.randomNumberBetween(-4, 4);
            this.parent.ringsPC.addChild(r);
            // this.utils.app.stage.addChild(this.lines[i]);
        }

        this.loopingQ = Config.bounceTotalPoints;
    },
    reset() {
        this.createRings();
    },
    addToStage() {
    // console.log('adding rings, ', this.lines.length, 'on stage')
        for (let i = 0; i < this.lines.length; i++) {
            this.parent.ringsPC.addChild(this.rings[i]);
            this.utils.app.stage.addChild(this.lines[i]);
        }
    },
    removeFromStage() {
    // console.log('removing rings, ', this.lines.length, 'on stage')
        for (let i = 0; i < this.lines.length; i++) {
            this.parent.ringsPC.removeChild(this.rings[i]);
            this.utils.app.stage.removeChild(this.lines[i]);
        }
    },
    resize() {
        const len = this.rings.length;
        for (let i = 0; i < len; i++) {
            const r = this.rings[i];
            r.y = this.utils.randomNumberBetween(0, this.utils.canvasHeight);
            r.x = this.utils.randomNumberBetween(0, this.utils.canvasWidth);
        }
    },
    animate(event) {
        let i; let j; let particle; let partA; let
            partB;

        for (i = 0; i < this.loopingQ; i++) {
            if (this.lines[i]) this.lines[i].clear();
            particle = this.rings[i];

            particle.x += particle.vx;
            particle.y += particle.vy;

            // particle.x -= this.utils.root.activeAction.vx;
            // particle.y -= this.utils.root.activeAction.vy;

            particle.x += particle.vx - this.utils.root.activeAction.vx;
            particle.y += particle.vy - this.utils.root.activeAction.vy;

            if (particle.x > this.utils.canvasWidth) {
                particle.x = 0;
                particle.vx = Math.random() * 6 - 3;
            } else if (particle.x < 0) {
                particle.x = this.utils.canvasWidth;
                particle.vx = Math.random() * 6 - 3;
            }

            if (particle.y > this.utils.canvasHeight) {
                particle.y = 0;
                particle.vy = Math.random() * 6 - 3;
            } else if (particle.y < 0) {
                particle.y = this.utils.canvasHeight;
                particle.vy = Math.random() * 6 - 3;
            }

            if (!particle.hit && this.parent.itemHitDetect(particle)) {
                this.parent.bounceExplosion.startGood();
                this.removeRingsAndLines(i);
            }
        }
        for (i = 0; i < this.loopingQ - 1; i++) {
            partA = this.rings[i];
            for (j = i + 1; j < this.loopingQ; j++) {
                partB = this.rings[j];
                this.spring(partA, partB, i);
            }
        }
    },
    spring(partA, partB, index) {
        const dx = partB.x - partA.x;
        const dy = partB.y - partA.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.minDist) {
            const line = this.lines[index];
            line.clear();
            line.lineStyle(6, 0xFFFFFF);
            line.moveTo(partA.x, partA.y);
            line.lineTo(partB.x, partB.y);
            line.alpha = 1 - dist / this.minDist;
            const ax = dx * this.springAmount;
            const ay = dy * this.springAmount;
            partA.vx += ax;
            partA.vy += ay;
            partB.vx -= ax;
            partB.vy -= ay;
        }
    },
    removeRingsAndLines(i) {
        	// this.loopingQ--;
        	this.rings[i].hit = true;
        	this.parent.ringsPC.removeChild(this.rings[i]);
        this.utils.app.stage.removeChild(this.lines[i]);
        	this.earnedRings.push(this.rings[i]);
        	this.earnedLines.push(this.lines[i]);
        	this.rings.splice(i, 1);
        this.lines.splice(i, 1);
        // console.log('splice', this.lines.length)
        this.loopingQ = this.rings.length;
        this.utils.root.score.bounceScore.bounceRingHit();
    },
    reAddRingsAndLines(q, spike) {
        	// this.loopingQ += q;
        	this.utils.root.score.bounceScore.bounceSpikeHit(q);

        q = (q > this.earnedRings.length) ? this.earnedRings.length : q;

        	for (let i = 0; i < q; i++) {
            const ring = this.earnedRings[0];
            const line = this.lines[0];
        			ring.hit = false;
            ring.y = this.utils.randomNumberBetween(0, this.utils.canvasHeight);
            ring.x = this.utils.randomNumberBetween(0, this.utils.canvasWidth);
        			this.parent.ringsPC.addChild(ring);
            this.utils.app.stage.removeChild(line);
		        	this.rings.push(ring);
		        	this.lines.push(line);
		        	this.earnedRings.splice(0, 1);
            this.earnedLines.splice(0, 1);
        	}
        	this.loopingQ = this.rings.length;
        setTimeout(this.rePowerSpike.bind(this, spike), 2000);
    },
    rePowerSpike(spike) {
        spike.hit = false;
    },


};
