import axios from 'axios';
import { API_BASE_URL } from '../../config';
import Assets from '../utils/assetCreation';
import Utils from '../utils/utils';

export default function () {
    return {
    	boardWidth: 500,
    	boardHeight: 500,
    	drag: false,
        chosenColor: 0x000000,
        offsetX: 0,
        offsetY: 0,
        storeColors: {},
        dotSize: 10,
        primary: false,
        edited: false,
        utils: Utils,
        init(fake) {
            this.lsToken = localStorage.getItem('token');
	        this.canvasWidth = this.width;

	        this.artBoard = Assets.Container();
	        // this.pixelCont = new PIXI.Container();
	        this.mouseListen = Assets.Container();

            this.height = this.utils.returnCanvasHeight();
            this.halfWidth = this.width / 2;
            this.halfHeight = this.height / 2;


            this.artBoard.addChild(this.mouseListen);
            // this.artBoard.addChild(this.pixelCont);
            const s = Assets.Graphics();
            s.beginFill(0xFFFF00).drawRect(0, 0, this.boardWidth, this.boardHeight).endFill();
            s.alpha = 0.5;
            this.mouseListen.addChild(s);

            if (fake) {
                for (let i = 0; i < this.boardHeight; i += this.dotSize) {
                    for (let j = 0; j < this.boardWidth; j += this.dotSize) {
                        const n = Assets.Graphics();
                        n.beginFill(this.utils.randomColor()).drawRect(0, 0, 10, 10).endFill();
                        n.x = j;
                        n.y = i;

                        this.artBoard.addChild(n);
                    }
                }
            }
            this.artBoard.cacheAsBitmap = true;

            this.s = s;
            this.loadData();
        },
        assignStage(stage) {
            this.stage = stage;
        },
        returnArtBoard() {
            return this.artBoard;
        },
        setOffsets(x, y) {
            this.offsetX = x;
            this.offsetY = y;
        },
        changeColor(color) {
            if (color) {
                const convert = `0x${color.substr(1)}`;
                this.chosenColor = convert;
            }
        },
        mouseOverHandler(e) {
        },
        mouseOutHandler(e) {
            // console.log("out")
            this.drag = false;
        },
        mouseDownHandler(e) {
            // console.log("down")
            this.drag = true;

            this.drawPoint(e);
        },
        mouseUpHandler() {
            // console.log("up")
            this.drag = false;
            // this.s.pointerup = null;
        },
        mouseMoveHandler(e) {
            // console.log("move")
            this.drawPoint(e);
        },
        drawPoint(e) {
            if (this.drag) {
                this.x = Math.floor(e.data.global.x);
                this.y = Math.floor(e.data.global.y);
                const n = Assets.Graphics();

                const fromPoint = { x: this.x, y: this.y };
                const localPoint = this.artBoard.toLocal(fromPoint, this.stage, undefined, true);
                n.beginFill(this.chosenColor).drawRect(0, 0, 10, 10).endFill();
                n.x = Math.floor(localPoint.x / 10) * 10;
                n.y = Math.floor(localPoint.y / 10) * 10;

                this.artBoard.addChild(n);
                this.storeColors[`${n.x}_${n.y}`] = this.chosenColor;
            }
        },
        loadData(obj) {
            axios.post(`${API_BASE_URL}/store/artBoardData`, obj, { headers: { Authorization: `Bearer ${this.lsToken}` } })
                .then((result) => {
                    this.artBoard.cacheAsBitmap = false;
                    // console.log("result from load artboard call ", result.data.board)
                    if (result.data.board) {
                        for (const key in result.data.board[0]) {
                            // console.log(key+" ) "+ result.data.board[0][key])
                            const tempArray = key.split('_');
                            // let x = tempArray[0];
                            // let y = tempArray[1];
                            const n = Assets.Graphics();
                            n.beginFill(result.data.board[0][key]).drawRect(0, 0, 10, 10).endFill();
                            n.x = tempArray[0];
                            n.y = tempArray[1];
                            this.storeColors[`${n.x}_${n.y}`] = result.data.board[0][key];
                            this.artBoard.addChild(n);
                        }
                        this.artBoard.cacheAsBitmap = true;
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        sendToServer() {
		    return axios.post(`${API_BASE_URL}/store/artBoard`, this.storeColors, { headers: { Authorization: `Bearer ${this.lsToken}` } })
		    .then((response) => {
		     	 console.log(response);
		    })
		    .catch((err) => {
		       console.error(err);
		    });
        },
        editMode(boolean) {
            if (!this.edited) {
                this.edited = true;
                this.s.interactive = boolean;
                this.s.buttonMode = boolean;
                this.mouseOverHandler = this.mouseOverHandler.bind(this);
				    this.mouseOutHandler = this.mouseOutHandler.bind(this);
				    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
				    this.drawPoint = this.drawPoint.bind(this);
				    this.mouseDownHandler = this.mouseDownHandler.bind(this);
				    this.mouseUpHandler = this.mouseUpHandler.bind(this);
            }

            if (boolean) {
                this.s.mouseover = this.mouseOverHandler;
                this.s.mouseout = this.mouseOutHandler;
                this.s.pointerdown = this.mouseDownHandler;
                this.s.pointerup = this.mouseUpHandler;
                this.s.mousemove = this.mouseMoveHandler;
                this.artBoard.cacheAsBitmap = false;
            } else if (!boolean) {
                this.s.mouseover = undefined;
                this.s.mouseout = undefined;
                this.s.pointerdown = undefined;
                this.s.pointerup = undefined;
                this.s.mousemove = undefined;
                this.sendToServer();
                this.artBoard.cacheAsBitmap = true;
            }
        },
    };
}
