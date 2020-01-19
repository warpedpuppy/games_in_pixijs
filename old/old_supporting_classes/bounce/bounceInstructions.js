import Assets from '../../utils/assetCreation';
import Utils from '../../utils/utils';
// import Config from './animationsConfig';
export default {
    utils: Utils,
    init() {
        this.text = Assets.Sprite('swipeScreen.png');
        this.text.scale.set(0.5);
        this.text.anchor.set(0.5);
        this.text.x = this.utils.canvasWidth / 2;
        this.text.y = this.utils.canvasHeight / 2;
        return this;
    },
    addToStage() {
        this.utils.app.stage.addChild(this.text);
    },
    removeFromStage() {
        this.utils.app.stage.removeChild(this.text);
    },
    resize() {
        this.text.x = this.utils.canvasWidth / 2;
        this.text.y = this.utils.canvasHeight / 2;
    },
    animate() {

    },
};
