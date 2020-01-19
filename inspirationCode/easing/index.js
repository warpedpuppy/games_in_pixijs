
const app = new PIXI.Application({
    width: 1000, height: 100, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

const dot = new PIXI.Graphics();
dot.y = 50;
dot.x = 10;
dot.beginFill(0x000000).drawCircle(0, 0, 10).endFill();
app.stage.addChild(dot);
const tweenArray = [];


function move(item, seconds, obj) {
    const changeIncrement = 60 * seconds;
    item.obj = obj;
    item.changeIncrement = changeIncrement;
		  item.seconds = seconds;
    item.startTime = new Date().getTime();
    tweenArray.push(item);
}

app.ticker.add(animate);

/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
EasingFunctions = {
    // no easing, no acceleration
    linear(t) { return t; },
    // accelerating from zero velocity
    easeInQuad(t) { return t * t; },
    // decelerating to zero velocity
    easeOutQuad(t) { return t * (2 - t); },
    // acceleration until halfway, then deceleration
    easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
    // accelerating from zero velocity
    easeInCubic(t) { return t * t * t; },
    // decelerating to zero velocity
    easeOutCubic(t) { return (--t) * t * t + 1; },
    // acceleration until halfway, then deceleration
    easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
    // accelerating from zero velocity
    easeInQuart(t) { return t * t * t * t; },
    // decelerating to zero velocity
    easeOutQuart(t) { return 1 - (--t) * t * t * t; },
    // acceleration until halfway, then deceleration
    easeInOutQuart(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
    // accelerating from zero velocity
    easeInQuint(t) { return t * t * t * t * t; },
    // decelerating to zero velocity
    easeOutQuint(t) { return 1 + (--t) * t * t * t * t; },
    // acceleration until halfway, then deceleration
    easeInOutQuint(t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; },
};


// below works
function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
}
function easeInSine(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}
function easeOutBounce(t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
    } if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
    } if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
    }
    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
}

function easeOutElastic(t) {
    const p = 0.3;
    return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
}


move(dot, 0.5, { x: [10, 50] });
function animate(delta) {
    if (tweenArray.length) {
        tweenArray.forEach((item) => {
            const t = new Date().getTime() - item.startTime;
            const b = 10;
            const c = 500;
            const d = 3000;
            const e = c - b;
            const percentage = t / d;
            // console.log(percentage)
            const inc = easeOutElastic(percentage);
            const val = b + inc * (c - b);

            const inc2 = easeOutBounce(t, b, c, d);

            if (percentage < 1) {
                item.x = val;
            } else {
                console.log('done');
                tweenArray.splice(item, 1);
            }
        });
    }
}

// let startValue = item.obj.x[0];
//  let endValue = item.obj.x[1]
//  let changeIncrement = (endValue - startValue) / item.changeIncrement;

//  let currentMilliseconds = new Date().getTime()
//  let t = currentMilliseconds -  item.currentTime;


//  let b = startValue;
//  let c = item.x - startValue;
//  let d = item.seconds * 1000;

//  //console.log(t, startValue, c, s)
// // let newChangeIncrement = BackCubic(t, b, c, d)
//  //console.log(t, d)
//  let percentage = t/d;
//  console.log('percentage done = ', percentage)
//  t = easeInCubic(percentage);
//  newChangeIncrement = b + t * (c - b);
//  console.log(newChangeIncrement)
