import Assets from '../../../utils/assetCreation';
import Utils from '../../../utils/utils';
import Tweens from '../../../utils/Tweens';

export default function () {
    return {
        utils: Utils,
        returnTopBar() {
            // TOP BAR
            this.topBanner = Assets.Container();
            this.topBackground = Assets.Sprite('scoreBackground.png');
            this.button = Assets.Sprite('arrow.png');
            this.button.anchor.set(0.5);
            this.button.buttonMode = this.button.interactive = true;
            this.button.on('pointerdown', this.seeScores.bind(this));
            this.button.on('pointerover', this.spin.bind(this));
            this.button.rotateDest = this.utils.deg2rad(360);
            this.button.finalDest = 0;
            this.button.rotateSpeed = 0.5;
            this.utils.app.stage.addChild(this.topBanner);
            this.topBanner.visible = false;
            return this.topBanner;
        },
        returnMainBar() {
            this.popUp = Assets.Container();
            this.popUpBackground1 = Assets.Graphics();
            this.popUpBackground1.beginFill(0xFFFF00).drawRect(0, 0, 520, 520).endFill();
            this.popUpBackground1.x = this.popUpBackground1.y = -10;
            this.popUp.addChild(this.popUpBackground1);
            this.popUpBackground = Assets.Graphics();
            this.popUpBackground.beginFill(0x000000).drawRect(0, 0, 500, 500).endFill();
            this.popUp.addChild(this.popUpBackground);
            this.closeButton = Assets.Sprite('arrow.png');
            this.closeButton.anchor.set(0.5);
            this.closeButton.rotateSpeed = 0.25;
            this.closeButton.rotateDest = this.closeButton.finalDest = this.utils.deg2rad(180);

            this.closeButton.buttonMode = this.closeButton.interactive = true;
            this.popUp.addChild(this.closeButton);
            this.closeButton.on('pointerdown', this.seeScores.bind(this));
            this.closeButton.on('pointerover', this.spin.bind(this));
            return this.popUp;
        },
        hide() {
            this.topBanner.visible = false;
            this.popUp.visible = false;
        },
        show() {
            this.topBanner.visible = true;
            this.popUp.visible = true;
        },
        spin(e) {
            Tweens.tween(e.target, e.target.rotateSpeed, { rotation: [0, e.target.rotateDest] }, this.spinEnd.bind(this, e.target));
        },
        spinEnd(button) {
            button.rotation = button.finalDest;
        },
        seeScores() {
            const { scoreTexts } = this.utils.root.score;
            if (!this.utils.root.fullStop) {
                this.utils.root.fullStop = true;
                let spacer = 0;
                this.utils.root.score.setGrandTotal();
                this.closeButton.rotation = 0;
                for (const key in scoreTexts) {
                    scoreTexts[key].x = 50;
                    scoreTexts[key].y = 50 + (spacer * 30);

                    this.popUp.addChild(scoreTexts[key]);
                    spacer++;
                }
                this.utils.app.stage.addChild(this.popUp);
                this.topBanner.visible = false;
                this.popUp.pivot = Assets.Point(250, 250);
                this.popUp.x = this.utils.canvasWidth / 2;
                this.popUp.y = this.utils.canvasHeight / 2;
            } else {
                this.utils.root.fullStop = false;
                this.utils.app.stage.removeChild(this.popUp);
                for (const key in scoreTexts) {
                    this.popUp.removeChild(scoreTexts[key]);
                }
                this.topBanner.visible = true;
                this.buildTopBanner();
            }
        },
        buildTopBanner() {
            this.topBanner.removeChildren();
            this.topBanner.addChild(this.topBackground);
            const newText = this.utils.root.score.scoreTexts[`${this.utils.root.activeMode}Text`];
            newText.x = 10;
            newText.y = 10;
            this.topBanner.addChild(newText);
            this.button.x = this.topBanner.width - 25;
            this.button.y = 23;
            this.topBanner.addChild(this.button);
            this.topBanner.x = (this.utils.canvasWidth - this.topBanner.width) / 2;
        },
    };
}
