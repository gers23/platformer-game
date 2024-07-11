class Controller {
    constructor() { 
        this.keys = {
            up: {
                pressed: false
            },
            down: {
                pressed: false
            },
            right: {
                pressed: false
            },
            left: {
                pressed: false
            }
        }
    }

    keyDown(event) {
        // console.log(event.code);
        switch (event.code) {
        case ('KeyW'):
        case ('Space'):
            if(player.velocity.y === 0) player.velocity.y -= 20;
            this.keys['up']['pressed'] = true;
            switchSound('jump')
            // player.currentSrite = player.sprites.jump.right;
            // this.currentNumFrame = player.sprites.jump.numFrame;
            // this.currentLastFrame = player.sprites.jump.lastFrame
            // console.log('up-down');
            break;
            case ('KeyS'):
            // console.log('down');
            break;
        case ('KeyA'):
            this.keys['left']['pressed'] = true;
            player.currentSprite = player.sprites.run.left;
            this.currentNumFrame = player.sprites.run.numFrame;
            // console.log('left');
            break;
        case ('KeyD'):
            // console.log('right');
            this.keys.right.pressed = true;
            player.currentSprite = player.sprites.run.right;
            this.currentNumFrame = player.sprites.run.numFrame;
            break;
        }
    }

    keyUp(event) {
        switch (event.code) {
        case ('KeyW'):
            this.keys['up']['pressed'] = false;
            // console.log('up-up');
            break;
        case ('KeyS'): 
            // console.log('down');
            break;
        case ('KeyA'):
            // console.log('left');
            this.keys['left']['pressed'] = false;
            player.currentSprite = player.sprites.stand.left
            this.currentNumFrame = player.sprites.stand.numFrame
            break;
        case ('KeyD'):
            // console.log('right');
            this.keys['right']['pressed'] = false;
            player.currentSprite = player.sprites.stand.right
            this.currentNumFrame = player.sprites.stand.numFrame
            break;
        case('Enter'):
            console.log(enterEvent);
            
        }
    }
}