const canvas = document.querySelector('canvas');

const canvasCont = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 1.0;

//CLASSES
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.speed = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.heigth = 30
    }
    drawFigure() {
        canvasCont.fillStyle = 'blue';
        canvasCont.fillRect(this.position.x, this.position.y, this.width, this.heigth);
    }
    update() {
        this.drawFigure();
        this.position.y += this.speed.y;
        this.position.x += this.speed.x;
        
        if(this.position.y + this.speed.y + this.heigth  <= canvas.height) {
            this.speed.y += gravity;
        } else this.speed.y = 0;
    } 
}

class Platform {
    constructor () {
        this.position = {
            x: 200,
            y: 200
        }

        this.width = 200;
        this.height = 200;
    }

    drawFigure() {
        canvasCont.fillStyle = 'green';
        canvasCont.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}


//----------------------------------------------

const player = new Player();
// player.drawFigure();
const platform = new Platform();



const keys = {
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


//ACTION---------------------------------------------------------------------
function animation() {
    requestAnimationFrame(animation);
    canvasCont.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    platform.drawFigure();


    if (keys['right']['pressed']) {
        player.speed.x = 5;
    } else if (keys['left']['pressed']) {
        player.speed.x = -5;
    } else player.speed.x = 0;


    //platform collision-------------------------------------------------
    if (player.position.y + player.heigth <= platform.position.y &&
        player.position.y + player.heigth + player.speed.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
        ) {
            player.speed.y = 0;
    } else if (
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width &&
        player.position.y + player.heigth >= platform.position.y
        ) {
            if (keys['right']['pressed'] || player.position.x + player.width <= platform.position.x) {
                player.position.x -= 5;
                console.log('collision right');
            } else if (keys['left']['pressed'] || player.position.x >= platform.position.x + platform.width) {
                player.position.x += 5;
                console.log('collision left');
            }
            // else player.position.x = player.position.x - 5;
    }
}
animation();


//CONTROLLER
addEventListener('keydown', (event) => {
    // console.log(event.code)
    // if(player.position.y + player.speed.y + player.heigth  <= canvas.height && event.code === 'KeyW') console.log('NO');
    // else {
        switch (event.code) {
        case ('KeyW'):
            player.speed.y -= 20;
            keys['up']['pressed'] = true;
            console.log('up-down');
            break;
            case ('KeyS'):
            console.log('down');
            break;
        case ('KeyA'):
            console.log('left');
            keys['left']['pressed'] = true;
            break;
        case ('KeyD'):
            console.log('right');
            keys['right']['pressed'] = true;
            break;
    }
    // }
    
})

addEventListener('keyup', (event) => {
    // console.log(event.code)
    switch (event.code) {
        case ('KeyW'):
            // player.speed.y -= 20;
            keys['up']['pressed'] = false;
            console.log('up-up');
            break;
            case ('KeyS'):
            console.log('down');
            break;
        case ('KeyA'):
            console.log('left');
            keys['left']['pressed'] = false;
            break;
        case ('KeyD'):
            console.log('right');
            keys['right']['pressed'] = false;
            break;
    }
})