import * as PIXI from 'pixi.js';
import ArtBoard from './art_board_sub';
import portal_code from './portal';
import Score from './score';

export default function Panel(wH) {
    return {
        cont: new PIXI.Container(),
        artBoardLoaded: false,
        art_board: ArtBoard(),
        score: Score(),
        build(num, width, height, userData, point, primary, stage) {
            this.Doorway = portal_code;
            this.primary = primary;
            this.stage = stage;
            this.panelWidth = width;
            this.panelHeight = height;
            const dot = new PIXI.Graphics();
            dot.beginFill(0x000000).drawCircle(0, 0, 100).endFill();
            dot.x = this.panelWidth / 2;
            dot.y = this.panelHeight / 2;
            dot.pivot.x = dot.pivot.y = 0.5;
            this.cont.addChild(dot);

            const text = new PIXI.Text(num, {
                fontFamily: 'Arial', fontSize: 48, fill: 0xffffff, align: 'center',
            });
            text.x = this.panelWidth / 2;
            text.y = this.panelHeight / 2;
            text.anchor.x = text.anchor.y = 0.5;
            this.cont.addChild(text);

            const name = new PIXI.Text(`user name: ${userData.username}`, {
                fontFamily: 'Arial', fontSize: 22, fill: 0xFFFFFF, align: 'center',
            });
            name.x = 20;
            name.y = 60;
            this.cont.addChild(name);
            this.fake = userData.fake;
            this.username = userData.username;

            const frame = new PIXI.Graphics();
            frame.lineStyle(5, 0xFF00FF)
                .moveTo(0, 0)
                .lineTo(this.panelWidth, 0)
                .lineTo(this.panelWidth, this.panelHeight)
                .lineTo(0, this.panelHeight)
                .lineTo(0, 0);
            this.cont.addChild(frame);

            const topDoor = this.Doorway(wH.characterHeight, 10, 'top');
            topDoor.x = (width - wH.characterHeight) / 2;
            if (point.y !== 0) {
                this.cont.addChild(topDoor);
            }


            const leftDoor = this.Doorway(10, wH.characterHeight, 'left');
            leftDoor.x = 0;
            leftDoor.y = (height - wH.characterHeight) / 2;
            if (point.x !== 0) {
                this.cont.addChild(leftDoor);
            }

            const rightDoor = this.Doorway(10, wH.characterHeight, 'right');
            rightDoor.x = width - 10;
            rightDoor.y = (height - wH.characterHeight) / 2;
            if (point.x !== wH.leftX) {
                this.cont.addChild(rightDoor);
            } else {

            }

            const bottomDoor = this.Doorway(wH.characterHeight, 10, 'bottom');
            bottomDoor.x = (width - wH.characterHeight) / 2;
            bottomDoor.y = this.panelHeight - 10;
            if (point.y !== wH.bottomY) {
                this.cont.addChild(bottomDoor);
            }

            this.doors = [topDoor, bottomDoor, leftDoor, rightDoor];

            const line1 = new PIXI.Graphics();
            line1.lineStyle(25, 0xFF00FF, 0.25, 0).moveTo(0, 0).lineTo(this.panelWidth, this.panelHeight);
            this.cont.addChild(line1);

            const line2 = new PIXI.Graphics();
            line2.lineStyle(25, 0xFF00FF, 0.25, 0).moveTo(0, this.panelHeight).lineTo(this.panelWidth, 0);
            this.cont.addChild(line2);


            let gear;
            const corners = [[0, 0], [this.panelWidth, 0], [this.panelWidth, this.panelHeight], [0, this.panelHeight]];
            this.gears = [];
            for (let i = 0; i < 4; i++) {
                gear = new PIXI.Sprite.fromImage('/bmps/gear.png');
                gear.anchor.x = gear.anchor.y = 0.5;
                gear.x = corners[i][0];
                gear.y = corners[i][1];
                gear.alpha = 0.25;
                gear.rotate = (Math.random() * 0.01) + 0.01;
                // this.cont.addChild(gear);
                this.gears.push(gear);
            }

            // if primary user load artboard to start
            if (primary) {
                this.loadArtBoard(primary);
            } else {
                this.score.init(this.cont, { canvasHeight: this.panelHeight, canvasWidth: this.panelWidth }, userData.score);
            }
        },
        loadArtBoard() {
            if (this.artBoardLoaded) return;
            this.artBoardLoaded = true;
            this.art_board.init(this.fake);
            const artBoard = this.art_board.returnArtBoard();
            artBoard.pivot.x = artBoard.width / 2;
            artBoard.pivot.y = artBoard.height / 2;
            artBoard.x = this.panelWidth / 2;
            artBoard.y = this.panelHeight / 2;
            this.art_board.loadData({ username: this.username });
            this.cont.addChild(artBoard);
            this.artBoardLoaded = true;
            if (this.primary) {
                this.art_board.assignStage(this.stage);
            }
        },
        removeArtBoard() {
            if (!this.artBoardLoaded) return;
            this.cont.removeChild(this.art_board.returnArtBoard());
            this.artBoardLoaded = false;
        },
        returnPanel() {
            return this.cont;
        },
    };
}
