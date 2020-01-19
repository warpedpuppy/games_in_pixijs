import Utils from '../../../utils/utils';

export default function () {
    return {
        bounceTokenUnlocked: false,
        bounceRingHit() {
            const { score } = Utils.root;
            score.bouncePoints++;
            score.scoreTexts.bounceText.text = `bounce points: ${score.bouncePoints} / ${score.bounceTotal}`;


            if (!this.bounceTokenUnlocked && score.bouncePoints >= score.bounceTotal) {
                this.bounceTokenUnlocked = true;
                Utils.root.bounce.tokenUnlock();
            }
        },
        bounceSpikeHit(q) {
            const { score } = Utils.root;

            q = (q > score.bouncePoints) ? score.bouncePoints : q;
            score.bouncePoints -= q;
            score.scoreTexts.bounceText.text = `bounce points: ${score.bouncePoints} / ${score.bounceTotal}`;
        },
    };
}
