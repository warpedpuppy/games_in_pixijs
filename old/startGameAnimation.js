import Utils from '../src/animations/utils/utils';
import Assets from '../src/animations/utils/assetCreation';
import PixiFps from "pixi-fps";

export default function () {
    return {
        utils: Utils,
        startButton: Assets.Sprite('startButton.png'),
        init: function (startGameFunction) {

            this.canvasWidth =  this.utils.returnCanvasWidth();
            this.canvasHeight = this.utils.returnCanvasHeight();

            var app = this.app = Assets.Application( this.canvasWidth, this.canvasHeight, false);
            document.getElementById('startGameCanvas').appendChild(app.view);

            this.stage = app.stage;
        
            const fpsCounter = new PixiFps();
            app.stage.addChild(fpsCounter);

            this.startGameFunction = startGameFunction;

            this.startButton.anchor.set(0.5);
            this.startButton.x = this.canvasWidth / 2;
            this.startButton.y = 200;
            this.stage.interactive = true;
            this.stage.addChild(this.startButton);
            this.startButton.interactive = true;
            this.startButton.buttonMode = true;
            this.startGame = this.startGame.bind(this);
            this.startButton.pointerdown = this.startGame;

            window.onresize = this.resizeHandlerX.bind(this);

            this.app.ticker.add(this.animate.bind(this));
        },
        resizeHandlerX: function () {
            this.canvasWidth =  this.utils.returnCanvasWidth();
            this.canvasHeight = this.utils.returnCanvasHeight();
            this.startButton.x = this.canvasWidth / 2;;
            this.startButton.y =  200;
            this.app.renderer.resize(this.canvasWidth, this.canvasHeight);
        },
        startGame: function () {
            window.onresize = undefined;
            this.stage.removeChild(this.startButton);
            if(this.app)this.app.destroy(true);
            this.startGameFunction();
        },
        stop: function () {
           
        },
        animate: function () {

            
            
        }
    }
}