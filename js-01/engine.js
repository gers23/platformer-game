class Engine {
    constructor() {

    }

    motionX() {
        if (controller.keys['right']['pressed'] && player.position.x < 600) {
            player.velocity.x = player.speed;
        } else if (
            (controller.keys['left']['pressed'] && player.position.x > 100) ||
            (controller.keys['left']['pressed'] && scrollCount === 0 && player.position.x > 0)) {
            player.velocity.x = -player.speed;
        } else  {
            player.velocity.x = 0;

            if (controller.keys['right']['pressed']) {
                scrollCount += player.speed;
                platforms.map(platform => platform.position.x -= player.speed);
                genericObjects.map((object, index) => {
                    if(index % 2 === 0) object.position.x -= player.speed * .5
                    else object.position.x -= player.speed * .7
                    
                })

                
            } else if (controller.keys['left']['pressed'] && scrollCount > 0) {
                scrollCount -= player.speed;
                platforms.map(platform => platform.position.x += player.speed);
                genericObjects.map((object, index) => {
                    if(index % 2 === 0) object.position.x += player.speed * .5
                    else object.position.x += player.speed * .7
                    
                })
            }
        }
    }

    collisionPlatform() {
        platforms.map(platform => {
            if (player.position.y + player.heigth <= platform.position.y &&
                player.position.y + player.heigth + player.velocity.y >= platform.position.y &&        
                player.position.x + player.width >= platform.position.x &&        
                player.position.x <= platform.position.x + platform.width        
                ) {            
                    player.velocity.y = 0;       
            } else if (       
                player.position.x + player.width >= platform.position.x &&        
                player.position.x <= platform.position.x + platform.width &&        
                player.position.y + player.heigth >= platform.position.y &&       
                player.position.y <= platform.position.y + platform.height        
                ) {            
                    if (               
                        controller.keys['right']['pressed'] ||
                        (player.position.x + player.width <= platform.position.x)) {                
                            // player.position.x -= player.speed + 5;               
                            // console.log('collision right');             
                    } else if (controller.keys['left']['pressed'] ||
                    player.position.x >= platform.position.x + platform.width) {               
                            // player.position.x += player.speed;        
                            // console.log('collision left');
                    }
            }
        })
    }

    winCondition() {
        if(win === false) {
            if (scrollCount > 5600 && scrollCount < 7000) {
                audio.pause()
                switchSound('victory')
                // display.canvasCont.fillStyle = 'white'
                display.canvasCont.strokeStyle = 'blue'
                display.canvasCont.fillText('Finish!', 470, 200)
                console.log(timer.strTime); 
                resultTime = timer.sec + timer.min * 60;
                setTimeout(() => {
                    win  = true;
                    endGame()
                }, 1000);
            }   
        }
    } 

    loseCondition() {
        if (player.position.y + player.velocity.y + player.heigth > display.canvas.height) {
            life -= 1;
            if (life <= 0) {
                switchSound('gameOver')
                display.canvasCont.fillStyle = 'red'
                display.canvasCont.fillText('Oh! try again...', 450, 200)
                setTimeout(() => {
                    resetObject();
                    init();
                    player.framesUpdate()
                }, 800);
                
            } else {
                // scrollCount -= 10
                init();
            }
        } 
    }
}

const enterEvent = new MouseEvent('click', {
    'clientX': 200,
    'clientY': 200,
    'bubbles': true,
    'cancelable': false,
})
