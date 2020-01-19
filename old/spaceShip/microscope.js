import Assets from '../../../../utils/assetCreation';
import Utils from '../../../../utils/utils';
import Config from '../../../../animationsConfig';

export default function () {
    return {
        utils: Utils,
        build() {
            this.microscope = Assets.Sprite('microscope.png');
            this.microscope.anchor.set(0.5);
            this.microscope.scale.set(0.5);
            this.microscope.name = 'bounce';
            return this.microscope;
        },
        place() {
            const { gridBuild } = this.utils.root.grid;
            const index = (!Config.testing) ? Math.floor(Math.random() * gridBuild.freeSpaces.length) : 1;
            gridBuild.microscope.x = gridBuild.microscope.storeX = gridBuild.freeSpaces[index][0] + gridBuild.blockWidth / 2;
            gridBuild.microscope.y = gridBuild.microscope.storeY = gridBuild.freeSpaces[index][1] + gridBuild.blockHeight / 2;
            gridBuild.freeSpaces.splice(index, 1);
            gridBuild.microscope.hit = false;
            gridBuild.cont.addChild(gridBuild.microscope);

            if (gridBuild.vortexes.vortexArray.length < 2)gridBuild.vortexes.createVortex(-0.15, gridBuild.microscope);
        },


    };
}
