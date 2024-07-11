class Display {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.canvasCont = this.canvas.getContext('2d');

        this.canvas.width = 1280;
        this.canvas.height = 576;
    }

}

class Player {
    constructor() {
        this.speed = 8
        this.objSpeed = 0.1
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 80
        this.heigth = 80

        this.image = createImage(images.spriteStandRight)
        this.frame = 0
        this.sprites = {
            stand: {
                right: createImage(images.spriteStandRight),
                left: createImage(images.spriteStandLeft),
                numFrame: 3,
                lastFame: 0
            },
            run: {
                right: createImage(images.spriteRunRight),
                left: createImage(images.spriteRunLeft),
                numFrame: 5,
                lastFame: 0
            },
            jump: {
                right: createImage(images.spriteJumpRight),
                numFrame: 7,
                lastFame: 7
            }
        }

        this.currentSprite = this.sprites.stand.right
        this.currentNumFrame = 3
        this.currentLastFrame = 0
    }
    drawFigure() {
        
        display.canvasCont.drawImage(
            this.currentSprite,
            32* this.frame,
            0,
            32,
            32,
            this.position.x,
            this.position.y,
            this.width,
            this.heigth
            )
        // display.canvasCont.fillStyle = 'blue';
        // display.canvasCont.fillRect(this.position.x, this.position.y, this.width, this.heigth);
    }

    framesUpdate() {
        setTimeout(() => {
            this.frame++
        if (this.frame > this.currentNumFrame) this.frame = this.currentLastFrame
            setTimeout(this.framesUpdate(), 200)
        }, 200);
    }

    update() {
        
        this.drawFigure();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        
        if(this.position.y + this.velocity.y + this.heigth  <= display.canvas.height) {
            this.velocity.y += gravity;
        } 
        // else this.velocity.y = 0;
        
    } 
}

//Math.floor(Math.random() * (max - min + 1)) + min;

class Platform {
    constructor ({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.image = image;
        this.width = this.image.width;
        this.height = this.image.height;
        
    }

    drawFigure() {
        display.canvasCont.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        // display.canvasCont.fillStyle = 'green';
        // display.canvasCont.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class GenericObject {
    constructor ({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.image = image;
        this.width = this.image.width
        this.height = this.image.height
    }

    drawFigure() {
        display.canvasCont.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        // display.canvasCont.fillStyle = 'green';
        // display.canvasCont.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Heart {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }
        this.image = image;

        this.width = this.image.width;
        this.height = this.image.height;
    }

    drawFigure() {
        display.canvasCont.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

class Timer {
    constructor() {
        this.stopwatch = false
        this.timerId
        this.sec = 0
        this.min = 0
        this.hour = 0
        this.str = ''

    }

    startTimer() {
        setTimeout(() => {
        
            if (this.sec === 60) {
                this.min += 1;
                this.sec = 0;
            } else if (this.min === 60) {
                this.hour += 1;
                this.min = 0
            } else this.sec += 1/4;
            setTimeout(this.startTimer(), 1000)
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerId)
    }

    toggleTimer() {
        display.canvasCont.fillStyle = 'black'
        if(player.position.x > 100 && player.position.x < 150) {
            this.stopwatch = true;
            timer.startTimer()
        } else if (player.position.x < 50 && win === true ) {
            this.stopwatch = false;
            timer.stopTimer()
        }
    }

    drawTimer() {
        this.strTime = String(parseInt(this.min)).padStart(2, 0) + ':' + String(parseInt(this.sec)).padStart(2, 0)
        display.canvasCont.fillStyle = 'black'
        display.canvasCont.font = '48px serif'
        display.canvasCont.fillText(this.strTime, 80, 70)
    }
}