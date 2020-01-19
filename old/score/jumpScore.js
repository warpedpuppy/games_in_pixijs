import Utils from '../../../utils/utils';
import Tweens from '../../../utils/Tweens';

export default function () {
    return {
        utils: Utils,
        jumpDotHit(str) {
            const { activeMode } = this.utils.root;
            const { jumpBackground } = this.utils.root.jump;
            const dotsEaten = this.utils.root.jump.jumpBackground.eatenDots.length;
            const { score } = this.utils.root;

            score[`${activeMode}Points`] = dotsEaten;

            score.scoreTexts[`${activeMode}Text`].text = `space points: ${score[`${activeMode}Points`]} / ${score[`${activeMode}Total`]}`;
            // console.log(jumpBackground.jumpTokenUnlocked,
            // score[`${activeMode}Points`], score.jumpTokenUnlockPoints);
            if (
                !jumpBackground.jumpTokenUnlocked
			&& score[`${activeMode}Points`] >= score.jumpTokenUnlockPoints
            ) {
                jumpBackground.jumpTokenUnlocked = true;
                jumpBackground.jumpTokenUnlockedGraphic.addToStage();
                Tweens.tween(jumpBackground.tokenLock, 0.5, { alpha: [1, 0], onComplete: this.jumpRemoveLock.bind(this) });
            }
        },
        jumpRemoveLock() {
            const { jumpBackground } = this.utils.jump;
            jumpBackground.tokenLock.removeChild(jumpBackground.tokenLock);
        },
    };
}
