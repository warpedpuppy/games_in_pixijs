import Assets from '../../utils/assetCreation';
import Utils from '../../utils/utils';
import Config from '../../animationsConfig';

export default function () {
    return {
        utils: Utils,
        score: 0,
        tokenEarned: false,
        init() {
            this.totalNeeded = Config.bouncePoints;
            this.text = Assets.BitmapText(`bounce points: ${this.score} / ${this.totalNeeded}`);
            this.text.x = this.utils.canvasWidth / 2;
            this.text.y = this.utils.canvasHeight - this.text.height;
            this.text.anchor.set(0.5);
        },
        ringHit() {
            this.score++;
            this.text.text = `bounce points: ${this.score} / ${this.totalNeeded}`;

            if (!this.tokenEarned && this.score >= this.totalNeeded) {
                this.tokenEarned = true;
                this.utils.root.earnToken(this.utils.root.grid.gridBuild.tokens[2]);
            }
        },
        spikeHit() {
            // this.score -= 10;
            this.text.text = `bounce points: ${this.score} / ${this.totalNeeded}`;
        },
        addToStage() {
            this.utils.app.stage.addChild(this.text);
        },
        removeFromStage() {
            this.utils.app.stage.removeChild(this.text);
        },
        resize() {
            this.text.x = this.utils.canvasWidth / 2;
            this.text.y = this.utils.canvasHeight - this.text.height;
        },
        animate() {

        },
    };
}
