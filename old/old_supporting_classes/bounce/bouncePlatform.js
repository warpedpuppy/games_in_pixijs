import Utils from '../../utils/utils';
import Assets from '../../utils/assetCreation';

export default function () {
    return {
        line: Assets.Sprite(),
        dot1: Assets.Sprite(),
        dot2: Assets.Sprite(),
        mouseDown: false,
        startMode: true,
        utils: Utils,
        init(cont, instructions) {
            this.instructions = instructions;
            const { spritesheet } = this.utils;
            this.cont = cont;
            this.line.height = 10;
            this.line.anchor.y = 0.5;
            this.line.tint = 0x000000;

            this.line.texture = spritesheet.textures['bouncePlatformLine.png'];
            this.dot1.texture = spritesheet.textures['transparentRing.png'];
            this.dot2.texture = spritesheet.textures['transparentRing.png'];

            this.dot1.scale.set(0.5);
            this.dot2.scale.set(0.5);

            cont.addChild(this.line);
            this.dot1.anchor.x = this.dot1.anchor.y = 0.5;
            cont.addChild(this.dot1);
            this.dot2.anchor.x = this.dot2.anchor.y = 0.5;
            cont.addChild(this.dot2);
            this.on = this.on.bind(this);
            this.on(true);
        },
        resize() {
            if (this.startMode) {
                this.start(this.utils.canvasWidth, this.utils.canvasHeight);
            }
        },
        start(canvasWidth, canvasHeight) {
            canvasWidth = this.utils.canvasWidth;
            canvasHeight = this.utils.canvasHeight;

            const halfWidth = canvasWidth / 2;
            const halfHeight = canvasHeight / 2;
            const point1 = { x: halfWidth - 100, y: halfHeight + 100 };
            const point2 = { x: halfWidth + 100, y: halfHeight + 100 };

            this.dot1.x = point1.x;
            this.dot1.y = point1.y;
            this.dot2.x = point2.x;
            this.dot2.y = point2.y;
            this.line.x = this.dot1.x;
            this.line.y = this.dot1.y;
            const disAngle = this.utils.distanceAndAngle({ x: this.dot1.x, y: this.dot1.y }, { x: this.dot2.x, y: this.dot2.y });
            this.line.rotation = disAngle[1];
            this.line.width = disAngle[0];
        },
        on(trueFalse) {
            this.placeFirstDot = this.placeFirstDot.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this);
            this.releaseMouse = this.releaseMouse.bind(this);
            this.line.visible = this.dot1.visible = this.dot2.visible = trueFalse;
            this.cont.interactive = trueFalse;
            this.cont.buttonMode = trueFalse;
            if (trueFalse) {
                this.cont.mousedown = this.cont.touchstart = this.placeFirstDot;
                this.cont.mousemove = this.cont.touchmove = this.onMouseMove;
                this.cont.mouseup = this.cont.touchend = this.releaseMouse;
            } else {
                this.cont.mousedown = this.cont.touchstart = null;
                this.cont.mousemove = this.cont.touchmove = null;
                this.cont.mouseup = this.cont.touchend = null;
            }
        },
        placeFirstDot(touchData) {
            this.instructions.removeFromStage();
            this.startMode = false;
            const mouse = touchData.data.global;
            const mouseX = mouse.x;
            const mouseY = mouse.y;
            this.line.width = 0;
            this.line.x = mouseX;
            this.line.y = mouseY;
            this.line.visible = true;
            this.dot1.x = mouseX;
            this.dot1.y = mouseY;
            this.dot1.visible = true;
            this.dot2.x = mouseX;
            this.dot2.y = mouseY;
            this.dot2.visible = true;
            this.mouseDown = true;
            // cont.removeChild(gv.swipeText);
        },
        onMouseMove(touchData) {
            if (this.mouseDown === true) {
                const mouse = touchData.data.global;
                const mouseX = mouse.x;
                const mouseY = mouse.y;
                this.dot2.x = mouseX;
                this.dot2.y = mouseY;
                const disAngle = this.utils.distanceAndAngle({ x: this.dot1.x, y: this.dot1.y }, { x: this.dot2.x, y: this.dot2.y });
                this.line.rotation = disAngle[1];
                this.line.width = disAngle[0];
            }
        },
        releaseMouse(data) {
            this.mouseDown = false;
        },
        animate() {
            if (this.dot2.visible === true) {
                this.dot1.rotation += 0.25;
                this.dot2.rotation += 0.25;
            }
        },
    };
}
