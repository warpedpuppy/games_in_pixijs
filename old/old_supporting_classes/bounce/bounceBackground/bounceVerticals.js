import Assets from '../../../utils/assetCreation';
import Utils from '../../../utils/utils';
// import Config from './animationsConfig';
export default {
    barsOP: [],
    spikesOP: [],
    utils: Utils,
    colorCounter: 0,
    spikes: [],
    colors: [0xFF00FF, 0xFF0000, 0xFFFF00, 0xFF9900, 0x33FF00],
    init(parent) {
        this.parent = parent;
        this.createResources();
        this.createBars(this.level1Object);
        this.createBars(this.level2Object);
        this.createBars(this.level3Object);
        this.createBars(this.level4Object);
    },
    createResources() {
        this.array1 = [];
        this.array2 = [];
        this.array3 = [];
        this.array4 = [];

        this.level1Object = {
            w: 100,
            q: 3,
            speedAdjust: 0.15,
            color: 0xFF0000,
            cont: this.parent.level1,
            array: this.array1,
        };
        this.level2Object = {
            w: 50,
            q: 5,
            speedAdjust: 0.35,
            color: 0x33FF00,
            cont: this.parent.level2,
            array: this.array2,
        };
        this.level3Object = {
            w: 20,
            q: 10,
            speedAdjust: 0.65,
            color: 0xFFFF00,
            cont: this.parent.level3,
            array: this.array3,
        };
        this.level4Object = {
            w: 10,
            q: 20,
            speedAdjust: 0.15,
            color: 0xFF00FF,
            cont: this.parent.level4,
            array: this.array4,
        };


        const opQ = this.level1Object.q + this.level2Object.q + this.level3Object.q + this.level4Object.q;
        const arr = [
            'pinkGradient.png',
            'orangeGradient.png',
            'blueGradient.png',
            'redGradient.png',
        ];
        let arrCounter = 0;
        for (let i = 0; i < opQ; i++) {
            this.barsOP.push(Assets.Sprite(arr[arrCounter]));
            arrCounter++;
            if (arrCounter >= arr.length)arrCounter = 0;
            if (i < this.level1Object.q) {
                const spike = this.createSpikes(1);
                this.spikesOP.push(spike);
            }
        }
    },
    createSpikes(scale) {
        const cont = Assets.Container();
        const backSpike = Assets.Sprite('spike.png');
        backSpike.anchor.set(0.5);
        backSpike.scale.set(scale);
        const frontSpike = Assets.Sprite('spike.png');
        frontSpike.anchor.set(0.5);
        frontSpike.scale.set(scale * 0.5);
        cont.addChild(backSpike);
        cont.addChild(frontSpike);
        cont.frontSpike = frontSpike;
        cont.backSpike = backSpike;
        return cont;
    },
    createBars(obj) {
        obj.cont.removeChildren();
        const w = this.utils.canvasWidth;
        const spacing = w / obj.q;

        for (let i = 0; i < obj.q; i++) {
            let bar = this.barsOP[this.createCounter];
            if (!bar) {
                this.createCounter = 0;
                bar = this.barsOP[this.createCounter];
            }
            bar.anchor.x = 0.5;
            bar.speedAdjust = obj.speedAdjust;
            bar.width = obj.w;
            bar.height = this.utils.canvasHeight;
            bar.spacing = spacing;
            // bar.tint = obj.color;
            bar.x = i * spacing;
            // console.log(i, spacing)
            bar.array = obj.array;
            obj.cont.addChild(bar);
            // console.log(bar.x, bar.y)
            obj.array.push(bar);


            // dot.tint = this.colors[this.colorCounter];

            this.colorCounter++;

            if (this.colorCounter > this.colors.length - 1) {
                this.colorCounter = 0;
            }


            // dot.anchor.set(0.5);
            if (obj === this.level1Object) {
                const spike = this.spikesOP[this.createCounter];
                spike.bar = bar;
                spike.x = bar.x;
                bar.spike = spike;
                spike.y = this.utils.randomNumberBetween(0, this.utils.canvasHeight);
                obj.cont.addChild(spike);
                this.spikes.push(spike);
            } else {
                bar.alpha = 0.25;
            }

            this.createCounter++;
        }
    },
    moveBars(bar) {
        bar.x -= (this.utils.root.activeAction.vx * bar.speedAdjust);
        if (bar.x < 0 && this.utils.root.activeAction.vx > 0) {
            const backBarX = bar.array[bar.array.length - 1].x;
            bar.x = backBarX + bar.spacing;
            bar.array.splice(0, 1);
            bar.array.push(bar);
        } else if (bar.x > this.utils.canvasWidth && this.utils.root.activeAction.vx < 0) {
            const firstBarX = bar.array[0].x;
            bar.x = firstBarX - bar.spacing;
            bar.array.splice(bar.array.length - 1, 1);
            bar.array.unshift(bar);
        }
    },
    addToStage() {

    },
    removeFromStage() {

    },
    resize() {
        this.createCounter = 0;

        this.spikes.length = 0;
        this.array1.length = 0;
        this.array2.length = 0;
        this.array3.length = 0;
        this.array4.length = 0;

        this.createBars(this.level1Object);
        this.createBars(this.level2Object);
        this.createBars(this.level3Object);
        this.createBars(this.level4Object);

        this.loopingQ = Math.max(
            this.spikes.length,
            this.array1.length,
            this.array2.length,
            this.array3.length,
            this.array4.length,
        );
    },
    animate() {

    },

};
