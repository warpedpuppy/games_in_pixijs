export default function renderTexture (PIXI, app, items) {
    return {
        base: new PIXI.Container(),
        init: function () {

            
            // create two render textures... these dynamic textures will be used to draw the scene into itself
            var renderTexture = PIXI.RenderTexture.create(
                app.screen.width,
                app.screen.height
            );
            var renderTexture2 = PIXI.RenderTexture.create(
                app.screen.width,
                app.screen.height
            );
            var currentTexture = renderTexture;

            // create a new sprite that uses the render texture we created above
            var outputSprite = new PIXI.Sprite(currentTexture);

            // align the sprite
            outputSprite.x = 400;
            outputSprite.y = 300;
            outputSprite.anchor.set(0.5);

            // add to stage
            this.base.addChild(outputSprite);

            // create two render textures... these dynamic textures will be used to draw the scene into itself
            var renderTexture = this.renderTexture = PIXI.RenderTexture.create(
                app.screen.width,
                app.screen.height
            );
            var renderTexture2 = this.renderTexture2 = PIXI.RenderTexture.create(
                app.screen.width,
                app.screen.height
            );
            var currentTexture = renderTexture;

            // create a new sprite that uses the render texture we created above
            var outputSprite = this.outputSprite = new PIXI.Sprite(currentTexture);

            // align the sprite
            outputSprite.x = 400;
            outputSprite.y = 300;
            outputSprite.anchor.set(0.5);

            // add to stage
            this.base.addChild(outputSprite);

            var stuffContainer = this.stuffContainer = new PIXI.Container();

            stuffContainer.x = 400;
            stuffContainer.y = 300;

            this.base.addChild(stuffContainer);

            // create an array of image ids..
            var fruits = [
                '/bmps/spinObjects/spinObj_01.png',
                '/bmps/spinObjects/spinObj_02.png',
                '/bmps/spinObjects/spinObj_03.png',
                '/bmps/spinObjects/spinObj_04.png',
                '/bmps/spinObjects/spinObj_05.png',
                '/bmps/spinObjects/spinObj_06.png',
                '/bmps/spinObjects/spinObj_07.png',
                '/bmps/spinObjects/spinObj_08.png'
            ];

            // // create an array of items
            var items = [];

            // // now create some items and randomly position them in the stuff container
            for (var i = 0; i < 20; i++) {
                var item = PIXI.Sprite.fromImage(fruits[i % fruits.length]);
                item.x = Math.random() * 400 - 200;
                item.y = Math.random() * 400 - 200;
                item.anchor.set(0.5);
                stuffContainer.addChild(item);
                items.push(item);
            }

            // used for spinning!
            var count = this.count = 0;
            app.stage.addChild(this.base);

        },
        animate: function () {
            for (var i = 0; i < items.length; i++) {
                // rotate each item
                var item = items[i];
                item.rotation += 0.1;
            }

            this.count += 0.01;

            // swap the buffers ...
            var temp = this.renderTexture;
            this.renderTexture = this.renderTexture2;
            this.renderTexture2 = temp;

            // set the new texture
            this.outputSprite.texture = this.renderTexture;

            // twist this up!
            this.stuffContainer.rotation -= 0.01;
            this.outputSprite.scale.set(1 + Math.sin(this.count) * 0.2);

            // render the stage to the texture
            // the 'true' clears the texture before the content is rendered
            //app.renderer.render(this.base, this.renderTexture2, false);


        }

    }
}


