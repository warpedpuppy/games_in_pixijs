import * as PIXI from 'pixi.js';
import Panel from './panel';

export default function PanelsBoard(obj) {
    return {
        rows: obj.rows,
        cols: obj.cols,
        panelWidth: obj.panelWidth,
        panelHeight: obj.panelHeight,
        canvasWidth: obj.canvasWidth,
        canvasHeight: obj.canvasHeight,
        backgroundCont: obj.backgroundCont,
        getUserName: obj.getUserName,
        userObject: obj.userObject,
        wh: obj.wh,
        activePanel: obj.activePanel,
        panelForArtBoard: obj.panelForArtBoard,
        stage: obj.stage,
        pelletCont: obj.pelletCont,
        hero: obj.hero,
        utils: obj.utils,
        panels: obj.panels,
        bounce: obj.bounce,
        init() {
            this.total = this.cols * this.rows;
            let panelCounter = 0;
            this.backgroundCont.removeChildren();
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    const w = this.panelWidth;
                    const h = this.panelHeight;

                    const userObject = (this.userObject.users[panelCounter]) ? this.userObject.users[panelCounter] : { username: this.getUserName(), fake: true };

                    if (!userObject.fake)userObject.fake = false;

                    const xVal = w * j;
                    const yVal = h * i;
                    this.wh.leftX = (this.cols - 1) * this.panelWidth;
                    this.wh.bottomY = (this.rows - 1) * this.panelHeight;

                    const panelClass = Panel(this.wh);

                    let primary = false;
                    if (panelCounter === this.panelForArtBoard) {
                        this.activePanel = panelClass;
                        primary = true;
                    }
                    panelClass.build(panelCounter, this.panelWidth, this.panelHeight, userObject, { x: xVal, y: yVal }, primary, this.stage);
                    const panel = panelClass.returnPanel();
                    panel.panelClass = panelClass;
                    panel.x = xVal;
                    panel.y = yVal;
                    this.panels.push(panel);
                    panel.index = panelCounter;
                    this.backgroundCont.addChild(panel);

                    panelCounter++;
                }
            }

            this.backgroundCont.x = -this.activePanel.cont.x + (this.canvasWidth / 2) - (this.panelWidth / 2);
            this.backgroundCont.y = -this.activePanel.cont.y + (this.canvasHeight / 2) - (this.panelHeight / 2);

            this.mask = new PIXI.Graphics();
            this.mask.beginFill(0x000000).drawRect(0, 0, this.backgroundCont.width, this.backgroundCont.height).endFill();
            this.mask.x = this.backgroundCont.x;
            this.mask.y = this.backgroundCont.y;
            this.stage.addChild(this.mask);
            this.pelletCont.mask = this.mask;
            this.switchPanel(0);
        },
	  	whichPanel(door, panel) {
            const rightX = panel.cont.x + this.panelWidth;
            const bottomY = panel.cont.y + this.panelHeight;
            const topY = panel.cont.y - this.panelHeight;
            const leftX = panel.cont.x - this.panelWidth;
            for (let i = 0; i < this.total; i++) {
                if (door.loc === 'top' && this.panels[i].y === topY && this.panels[i].x === panel.cont.x) {
                    this.switchPanel(i);
                    break;
                } else if (door.loc === 'bottom' && this.panels[i].y === bottomY && this.panels[i].x === panel.cont.x) {
                    this.switchPanel(i);
                    break;
                } else if (door.loc === 'left' && this.panels[i].x === leftX && this.panels[i].y === panel.cont.y) {
                    this.switchPanel(i);
                    break;
                } else if (door.loc === 'right' && this.panels[i].x === rightX && this.panels[i].y === panel.cont.y) {
                    this.switchPanel(i);
                    break;
                }
            }
        },
        switchPanel(index) {
            this.activePanel.removeArtBoard();
            this.activePanel = this.panels[index].panelClass;
            this.panelForArtBoard = index;
            this.backgroundCont.x = -this.activePanel.cont.x + (this.canvasWidth / 2) - (this.panelWidth / 2);
            this.backgroundCont.y = -this.activePanel.cont.y + (this.canvasHeight / 2) - (this.panelHeight / 2);

            this.yLimit = this.activePanel.cont.y + (this.panelHeight) - (this.canvasHeight / 2);
            this.yLimit2 = this.activePanel.cont.y - (this.canvasHeight / 2);

            this.xLimit = this.activePanel.cont.x + this.panelWidth - (this.canvasWidth / 2);
            this.xLimit2 = this.activePanel.cont.x - (this.canvasWidth / 2);
            this.activePanel.loadArtBoard();
        },
        sidePanelCollision(vx, vy) {
            // sides collision
            const xLimit = this.xLimit - this.hero.cont.radius;
            const xLimit2 = this.xLimit2 + this.hero.cont.radius;
            const yLimit = this.yLimit - this.hero.cont.radius;
            const yLimit2 = this.yLimit2 - this.hero.cont.radius;


            if (this.backgroundCont.x < -xLimit) {
                // currentAction.vy *= -1;
                // vx *= -1;
                this.bounce('vx');
                this.backgroundCont.x = -xLimit;
            } else if (this.backgroundCont.x > -xLimit2) {
                // currentAction.vy *= -1;
                // vx *= -1;
                this.bounce('vx');
                this.backgroundCont.x = -xLimit2;
            }


            if (this.backgroundCont.y <= -yLimit) {
                // vy *= -1;
                this.bounce('vy');
                // currentAction.vx *= -1;
                this.backgroundCont.y = -yLimit;
            } else if (this.backgroundCont.y >= -yLimit2) {
                // vy *= -1;
                this.bounce('vy');
                // currentAction.vx *= -1;
                this.backgroundCont.y = -yLimit2;
            }
        },
        animate(vx, vy) {
            this.backgroundCont.x += -vx;
            this.backgroundCont.y += -vy;
            this.sidePanelCollision(vx, vy);

            let rect = new PIXI.Rectangle();

            for (let i = 0; i < this.activePanel.doors.length; i++) {
                const globalPoint = this.activePanel.doors[i].toGlobal(this.stage, undefined, true);
                rect = new PIXI.Rectangle(
                    Math.floor(globalPoint.x),
                    Math.floor(globalPoint.y),
                    this.activePanel.doors[i].width,
                    this.activePanel.doors[i].height,
                );
                // this.hero.cont.radius = 50;
                if (this.utils.circleRectangleCollision(this.hero.cont, rect)) {
                    this.whichPanel(this.activePanel.doors[i], this.activePanel);
                }
            }
        },
    };
}
