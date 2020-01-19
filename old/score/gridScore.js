import Utils from '../../../utils/utils';
import Config from '../../../animationsConfig';

export default function () {
    return {
        utils: Utils,
        treasureIncrease() {
            const { activeMode } = this.utils.root;
            const { score } = this.utils.root;
            score[`${activeMode}Points`] += Config[`${activeMode}CoinsPerTreasureChest`];
            score.scoreTexts[`${activeMode}Text`].text = `dragon points: ${score[`${activeMode}Points`]} / ${score[`${activeMode}Total`]}`;
        },
        treasureChange(str) {
            const { activeMode } = this.utils.root;
            const { score } = this.utils.root;

            if (str === 'down') {
                score[`${activeMode}Points`]--;
            } else if (str === 'up') {
                score[`${activeMode}Points`]++;
            }

            score.scoreTexts[`${activeMode}Text`].text = `dragon points: ${score[`${activeMode}Points`]} / ${score[`${activeMode}Total`]}`;
        },
        gridWeaponHit() {
            if (this.utils.root.score[`${this.utils.root.activeMode}Points`] <= 0) return;
            this.treasureChange('down');
            this.utils.root.grid.gridBuild.coins.addCoinToGrid();
        },
    };
}
