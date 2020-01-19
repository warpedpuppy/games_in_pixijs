import Utils from '../src/animations/utils/utils';
import Assets from '../src/animations/utils/assetCreation';
import Tweens from '../src/animations/utils/Tweens';


export default function(obj) {
    return {
        cont: Assets.Container(),
        utils: Utils,
        dots: [],
        colQ: 10,
        rowQ: 10,
        spacer: 30,
        temp: [],
        tempCounter: 0,
        delayTimes: 0,
        activeDelayTimes: 250,
        setUp: true,
        startScale: 0.25,
        dot1: undefined,
        dot2: undefined,

        rainbowColors: [[0xFF0000, "red"],[0x4B0082, "purple"],[0x0000FF, "blue"], [0x00FF00, "green"], [0xFFFF00, "yellow"]],
        init: function (isMobile, isMobileOnly) {

            var app = this.app = Assets.Application( 
                1000,  
                500, 
                false
            );
            document.getElementById('threeOfAKindCanvas').appendChild(app.view);
            this.stage = app.stage;
        
            
            this.app.ticker.add(this.animate); 


            for (let i = 0; i < this.rowQ; i ++) {
                for (let j = 0; j < this.colQ; j ++) {
                    let dot = Assets.Sprite("pellet.png");
                    dot.anchor.set(0.5)
                    dot.scale.set(this.startScale)
                    let color = this.utils.randomItemFromArray(this.rainbowColors)
                    //dot.beginFill(color[0]).drawCircle(0,0,10).endFill();
                    dot.x = j * this.spacer;
                    dot.y = dot.startY = i * this.spacer;
                    dot.tint = color[0];
                    dot.color = color[1];
                    dot.interactive = dot.buttonMode = true;
                    dot.on('pointerdown', this.dotClick.bind(this));
                    this.cont.addChild(dot);
                    this.dots.push(dot)
                }
            }
            this.stage.addChild(this.cont);
            this.cont.x = (1000 - this.cont.width ) / 2;
            this.cont.y = (500 - this.cont.height ) / 2;
            this.dotClick = this.dotClick.bind(this);
            
            this.completeHandler1 = this.completeHandler1.bind(this);
            this.completeHandler2 = this.completeHandler2.bind(this);
            this.done = this.done.bind(this)
            setTimeout(this.completeHandler1, this.delayTimes);
             this.touchPower(false);
             this.cont.visible = false;
        },
        completeHandler1: function () {

            let result = this.lookForThreeOfAKind() || [[], ""];
           
            let arr = result[0];
            let direction = result[1];
            if(this.dot1)this.dot1.scale.set(this.startScale);
                
            if(this.dot2)this.dot2.scale.set(this.startScale);

            if(!arr.length) {
                this.touchPower(true);
                //console.log("done");

                if(this.setUp){
                    this.setUp = false;
                    this.delayTimes = this.activeDelayTimes;
                     this.cont.visible = true;
                }
            }
            

            this.temp = [];
            this.tempCounter = 0;

            arr.forEach(item => {
                item.scale.set((this.startScale * 2));
            })

            let obj = {arr, direction}
            setTimeout(this.completeHandler2.bind(this, obj), this.delayTimes)

        },
        completeHandler2: function (obj) {
          
           let arr = obj.arr;
           let direction = obj.direction; 

            arr.forEach(item => {
                item.scale.set(0.25);
            }) 

           if (direction === 'horiz') {
                arr.forEach(item => {
                        let index = this.dots.indexOf(item);
                        while (this.dots[index]) {

                            let dot = this.dots[index];
                            this.temp.push(dot)

                            let targetIndex = index - this.colQ;

                            if (targetIndex >= 0) {
                                dot.tint = this.dots[targetIndex].tint;
                                dot.color = this.dots[targetIndex].color;
                            } else {
                                let item = this.utils.randomItemFromArray(this.rainbowColors);
                                dot.tint = item[0];
                                dot.color = item[1];
                            }

                            if(!this.setUp){
                                this.dots[index].startY = this.dots[index].y;
                                this.dots[index].y -= this.spacer;
                            }
                            
                            index = targetIndex;
                        }
                })
             } else if (direction === 'vert') {

                let index = this.dots.indexOf(arr.pop());
                let firstIndex = this.dots.indexOf(arr[0]);
                let firstNonComboIndex = firstIndex - this.colQ;
                let riseAmount = (arr.length + 1)  * this.spacer;

                while (this.dots[index]) {
                    let dot = this.dots[index];
                    if(!this.setUp){
                        dot.y -= riseAmount;
                    }
                    this.temp.push(dot)

                    if (firstNonComboIndex >= 0) {
                        dot.tint = this.dots[firstNonComboIndex].tint;
                        dot.color = this.dots[firstNonComboIndex].color;
                    } else {
                        let item = this.utils.randomItemFromArray(this.rainbowColors);
                        dot.tint = item[0];
                        dot.color = item[1];
                    }
                  
                    firstNonComboIndex -= this.colQ;
                    index -= this.colQ;
                }



            }
            if(!this.setUp){
                this.temp.forEach(item => {
                    Tweens.tween(item, 0.5, {y: [item.y, item.startY]}, this.done, 'easeOutBounce')
                })
            } else {
                this.completeHandler1();
            }
          

        },
        done: function () {
           
            this.tempCounter ++;

            if (this.tempCounter === this.temp.length) {

                this.temp.forEach(item => {
                    item.y = item.startY;
                })

                setTimeout(this.completeHandler1, this.delayTimes);
                this.tempCounter = 0;

            }
        },
        returnArray: function (arr, str) {
            if(arr.length >= 3){
                return [arr, str]
            }
        },
        lookForThreeOfAKind: function () {
            let horiz = [],
                vert = [],
                counter = 0,
                testVerts = true;

            // there are two events that prompt the returning of the array:
            // 1) the end of a row if it found three of a kind
            // 2) the introduction of a new color after three or more had been put into an array
            for (let i = 0; i < this.dots.length; i ++) {

                let dot = this.dots[i];
                let lastHorizItem = horiz[horiz.length - 1];

                if (lastHorizItem && dot.color === lastHorizItem.color) {
                    horiz.push(dot);
                    if (counter === this.colQ - 1 && horiz.length >= 3) {
                             return [horiz, "horiz"];
                    }
                } else {
                     if (horiz.length >= 3) {
                        return [horiz, "horiz"];
                    }

                    horiz = [dot];
                }

                if (testVerts) {
                    let loopQ = 0;
                    while (loopQ < this.rowQ) {

                        let x = i + (this.colQ * loopQ)

                        let lastVertItem = vert[vert.length - 1];
                        if (lastVertItem && this.dots[x].color === lastVertItem.color) {
                            vert.push(this.dots[x]);
                            if(loopQ === (this.rowQ -1 ) && vert.length >= 3){
                                    return [vert, "vert"];
                            }
                        } else {
                            if(vert.length >= 3){
                                    return [vert, "vert"];
                            }
                            vert = [this.dots[x]];
                        }
                        loopQ ++;
                    }
                    vert = [];
                }

                counter ++;
                if (counter === this.colQ) {
                    testVerts = false;
                    counter = 0;
                    horiz = [];
                }
            }
        },
        touchPower: function (boolean) {
            this.dots.forEach(item =>{
                item.interactive = item.buttonMode = boolean;
            })
        },
        dotClick: function (e) {

            if(!this.dot1 && !this.dot2) {
                this.dot1 = e.target;
                this.dot1.scale.set((this.startScale * 2))
            } else if (this.dot1 && !this.dot2) {
                this.dot2 = e.target;
                this.dot2.scale.set((this.startScale * 2))

                let color1 = this.dot1.color;
                let tint1 = this.dot1.tint;

                let color2 = this.dot2.color;
                let tint2 = this.dot2.tint;

                this.dot1.color = color2;
                this.dot1.tint = tint2;

                this.dot2.color = color1;
                this.dot2.tint = tint1;

                this.touchPower(false);
                //this.completeHandler1();
                Tweens.tween(this.dot1, 0.25, {
                    x: [this.dot2.x, this.dot1.x], 
                    y: [this.dot2.y, this.dot1.y]
                }, undefined, 'linear')

                Tweens.tween(this.dot1.scale, 0.25, {
                    x: [this.dot1.scale.x, this.startScale],
                    y: [this.dot1.scale.y, this.startScale]
                }, undefined, 'linear')

                 Tweens.tween(this.dot2, 0.25, {
                    x: [this.dot1.x, this.dot2.x],
                    y: [this.dot1.y, this.dot2.y]
                }, undefined, 'linear')

                  Tweens.tween(this.dot2.scale, 0.25, {
                    x: [this.dot2.scale.x, this.startScale],
                    y: [this.dot2.scale.y, this.startScale]
                }, this.completeHandler1, 'linear')

            } else if(this.dot2) {
          
                this.dot2.scale.set((this.startScale))
                this.dot2 = undefined;
                this.dot1.scale.set((this.startScale))
                this.dot1 = e.target;
                this.dot1.scale.set((this.startScale * 2))
                
            }
           
           
            
        },
        animate: function () {
            Tweens.animate();
           
        }
    }
}