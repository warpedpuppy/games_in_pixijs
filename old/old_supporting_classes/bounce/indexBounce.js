import BouncePlatform from './bouncePlatform';
import BounceBackground from './bounceBackground/bounceBackgroundIndex';
import BounceAction from './bounceAction';
import BounceInstructions from './bounceInstructions';
// import BouncePoints from './bouncePoints';
import Utils from '../../utils/utils';
// import Config from '../../animationsConfig';
export default function () {
    return {
        utils: Utils,
        bouncePlatform: BouncePlatform(),
        bounceAction: BounceAction(),
        bounceBackground: BounceBackground(),
        // bouncePoints: BouncePoints(),
        init(cont) {
            this.background = this.bounceBackground;
            this.bounceInstructions = BounceInstructions.init();
    		this.bouncePlatform.init(cont, this.bounceInstructions);
    		this.bouncePlatform.on(false);
    		this.bounceAction.init(this.bouncePlatform);
    		// this.bouncePoints.init();
    		this.bounceBackground.init(this.bounceAction, this.bouncePoints);
        },
        reset() {
            this.bounceBackground.reset();
        },
        addToStage() {
            this.bouncePlatform.start();
            this.bouncePlatform.on(true);
            this.bounceBackground.addToStage();
            this.bounceInstructions.addToStage();
            // this.bouncePoints.addToStage();
            return this.bounceAction;
        },
        removeFromStage() {
            this.bouncePlatform.on(false);
            this.bounceBackground.removeFromStage();
            this.bounceInstructions.removeFromStage();
            // this.bouncePoints.removeFromStage();
        },
        tokenUnlock() {
            this.bounceBackground.tokenUnlock();
        },
        tokenEarn(token) {
            this.utils.root.earnToken(token);
        },
        resize() {
            BounceInstructions.resize();
            this.bouncePlatform.resize();
            // this.bouncePoints.resize();
            this.bounceBackground.resize();
        },
        startSpaceShipJourney() {
		   this.bounceBackground.startSpaceShipJourney();
            this.bouncePlatform.on(false);
        },
        endSpaceShipJourney() {
        	this.bounceBackground.endSpaceShipJourney();
            this.bouncePlatform.on(true);
        },
        animate() {
            this.bouncePlatform.animate();
            this.bounceBackground.animate();
            this.bounceAction.animate();
            // this.bouncePoints.animate();
        },
    };
}
