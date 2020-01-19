import Assets from '../../../../utils/assetCreation';
import Utils from '../../../../utils/utils';
import Config from '../../../../animationsConfig';
import Tweens from '../../../../utils/Tweens';

export default function () {
    return {
        utils: Utils,
        init() {
            this.makeJumpActive = this.makeJumpActive.bind(this);
            this.completeReturnHomeHandler = this.completeReturnHomeHandler.bind(this);
            this.ship = Assets.Sprite('spaceShip.png');
            this.ship.anchor.set(0.5);
            this.ship.scale.set(0.25);
            this.ship.counter = 0;
            this.ship.name = 'spaceship';
            this.ship.classRef = this;
            return this.ship;
        },
        blastOff() {
            this.utils.root.score.hide();
            this.utils.root.startSpaceShipJourney();

            this.storeActiveMode = this.utils.root.activeMode;

            this.utils.app.stage.addChild(this.ship);
            this.ship.x = this.utils.canvasWidth / 2;
            this.ship.y = this.utils.canvasHeight / 2;

            const maze = this.utils.root.grid.gridBuild.cont;
            const { jump } = this.utils.root;
            const background = this.utils.root.jump.jumpBackground.orbsCont;
            background.scale.set(0);
            jump.addToStage();

            Tweens.spaceShipBlastOff(this.ship, maze, background, this.makeJumpActive);
        },
        makeJumpActive() {
            this.utils.root.animations.explosionStart();
            this.utils.root.animations.circles(false);
            this.utils.root.score.show();
            Tweens.killAll();
            this.utils.root.makeJumpActive();
            // this.ship.visible = false;
            this.utils.root.jump.jumpBackground.addSpaceShip();
        },
        returnHome() {
            this.utils.root.score.hide();
            this.utils.hero.cont.visible = false;
            this.utils.app.stage.addChild(this.ship);
            this.ship.x = this.utils.canvasWidth / 2;
            this.ship.y = this.utils.canvasHeight / 2;
            const maze = this.utils.root.grid.gridBuild.cont;
            const { jump } = this.utils.root;
            const background = jump.jumpBackground.orbsCont;
            Tweens.spaceShipReturnHome(
                background,
                maze,
                this.ship,
                this.completeReturnHomeHandler,
            );
        },
        completeReturnHomeHandler(storeX) {
            // in case coming back from jump
            this.utils.root.score.show();
            if (this.utils.root.activeMode === 'jump') {
                const { jump } = this.utils.root;
                const background = jump.jumpBackground.orbsCont;
                background.scale.set(1);
                const maze = this.utils.root.grid.gridBuild.cont;
                maze.scale.set(1);
                // maze.x = this.storeX;
                this.ship.scale.set(0.25);
                this.ship.rotation = 0;
            }

            this.utils.hero.cont.visible = true;
            this.utils.hero.activeHero.cont.y = 0;


            this.ship.x = this.ship.storeX;
            this.ship.y = this.ship.storeY;

            this.utils.root.endSpaceShipJourney();
            this.utils.root.animations.circles({ start: false, expand: true });
        },
        placeShip() {
            // for now just place space ship here
            const { gridBuild } = this.utils.root.grid;
            const index = (!Config.testing) ? Math.floor(Math.random() * gridBuild.freeSpaces.length) : 0;
            gridBuild.shipSpace = gridBuild.freeSpaces[index];
            gridBuild.spaceShip.x = gridBuild.spaceShip.storeX = gridBuild.freeSpaces[index][0] + gridBuild.blockWidth / 2;
            gridBuild.spaceShip.y = gridBuild.spaceShip.storeY = gridBuild.freeSpaces[index][1] + gridBuild.blockHeight / 2;
            gridBuild.freeSpaces.splice(index, 1);
            gridBuild.cont.addChild(gridBuild.spaceShip);
            gridBuild.shipSpace[2].alpha = 0;
            gridBuild.shipSpace[5].alpha = 0;

            if (gridBuild.vortexes.vortexArray.length < 2)gridBuild.vortexes.createVortex(0.15, gridBuild.spaceShip);

            gridBuild.spaceShipPoint = { x: gridBuild.spaceShip.x, y: gridBuild.spaceShip.y, item: gridBuild.spaceShip };
        },
        addToStage() {

        },
        removeFromStage() {

        },
        resize() {

        },
        animate() {

        },
    };
}
