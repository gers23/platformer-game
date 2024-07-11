
let gravity = 1;  
let scrollCount = 0;
let life = 0;
let nickName = 'Player';
let win = false;
let requestId;
let resultTime;

let platformImg = createImage(images.platform);
let platformSmallTall = createImage(images.platformSmallTall);
let mountain = createImage(images.mountain);
let trees = createImage(images.trees1);
let heart = createImage(images.heart);
let treesOne = createImage(images.trees);
let tabl = createImage(images.tabl);
let platformSet = [];
let genericObjectSet = [];
let heartSet = [];

let results = {};
let allResults = [];
let arrObj = {};


let display;
let player;
let platforms = platformSet;
let genericObjects = genericObjectSet;
let hearts;
let controller;
let engine;
let timer;



// FUNCTIONS

function resetObject() {
    life = 1;
    scrollCount = 0;

    platformSet = [
        new Platform({x: platformImg.width * 3 + 300 + platformImg.width - platformSmallTall.width,
            y: 300, image: platformSmallTall}),
        new Platform({x: 300, y: 425, image: tabl}),
        new Platform({x: platformImg.width * 9 + 935 , y: 0, image: treesOne}),    
        new Platform({x: 0, y: 500, image: platformImg}),
        new Platform({x: platformImg.width - 3, y: 500, image: platformImg}),
        new Platform({x: platformImg.width * 2 + 100, y: 500, image: platformImg}),
        new Platform({x: platformImg.width * 3 + 300, y: 500, image: platformImg}),
        new Platform({x: platformImg.width * 4 + 720, y: 500, image: platformImg}),
        new Platform({x: platformImg.width * 5 + 1020, y: 400, image: platformSmallTall}),
        new Platform({x: platformImg.width * 6 + 1260, y: 300, image: platformSmallTall}),
        new Platform({x: platformImg.width * 7 + 500, y: 500, image: platformImg}),
        new Platform({x: platformImg.width * 8 + 740, y: 200, image: platformSmallTall}),
        new Platform({x: platformImg.width * 9 + 930, y: 500, image: platformImg}),
        
        
    ]
    genericObjectSet = [
        // new GenericObject({x: -1, y: -100, image: createImage(images.background)}),
        new GenericObject({x: -1, y:  -300, image: mountain}),
        new GenericObject({x: -1, y: -400, image: trees}),

        // new GenericObject({x: -1, y: -100, image: createImage(images.background)}),
        new GenericObject({x: mountain.width - 3, y:  -300, image: mountain}),
        new GenericObject({x: trees.width - 3, y: -400, image: trees}),
        
        new GenericObject({x: mountain.width + 500 * 2, y:  -300, image: mountain}),
        new GenericObject({x: trees.width * 2 - 200, y: -400, image: trees}),
    ]
    heartSet = [
        new Heart({x: 1280 - 100, y: 10, image: heart}),
        new Heart({x: 1280 - 60, y: 10, image: heart})
    ]
}

function init() {
    // console.log('LIFE:', life);
    // (life === 2) ? hearts = heartSet : hearts = heartSet[0]
    
    
    // hearts = heartSet;
    display = new Display(gravity);
    player = new Player();
    platforms = platformSet;
    genericObjects = genericObjectSet;
    controller = new Controller();
    engine = new Engine(controller, player, platforms, scrollCount);
    timer = new Timer();
}

function animation() {
    requestId =  requestAnimationFrame(animation);
    display.canvasCont.fillStyle = 'white';
    display.canvasCont.fillRect(0, 0, display.canvas.width, display.canvas.height);
    genericObjects.map(object => object.drawFigure());
    platforms.map(platform => platform.drawFigure());
    // hearts.map(heart => heart.drawFigure());
    player.update();
    
    timer.toggleTimer();
    // timer.startTimer();
    timer.drawTimer();

    engine.motionX();
    engine.collisionPlatform();
    engine.winCondition();
    engine.loseCondition()
    // console.log(scrollCount);
}

function startGame() {
    win = false
    resetObject();
    init();
    animation();
    player.framesUpdate()   
}

function endGame() {
    cancelAnimationFrame(requestId)
    display.canvas.style.display = 'none'
    recordsTbl.style.display = 'flex'
    countResult()
}
    
 function countResult() {
     while(allResults.includes(resultTime)) {
         resultTime += 0.1;
     }
     
     arrObj[resultTime] = nickName;
     allResults.push(resultTime)
     allResults.sort((a, b) => a - b)
     delete arrObj[allResults[10]];
     if (allResults.length > 10) allResults.pop();

     for (let i = 0; i < 10; i++) {
         results[String(i)] = `${arrObj[allResults[i]]} - ${parseInt(allResults[i])}`
     }
     showRecords ();
     setLocalStorage() ;
 }


function addElementResult() {
    let resultDiv = document.createElement('div');
    resultDiv.className = 'result'
    document.querySelector('.table-records').append(resultDiv);
}

function showRecords () {
    let value = '';
    clearDiv()
    for(let i = 0; i < 10; i++) {
        addElementResult(results)
        if(results[String(i)] === 'undefined - undefined' || results[String(i)] === 'undefined - NaN' || 
        results[String(i)] === undefined || results[String(i)] === '') {
            value = `<span>${i+1}: - </span>`;
        } else {
            value = `<span>${i+1} : ${results[String(i)]}</span>`
        }
        document.querySelectorAll('.result')[i].insertAdjacentHTML('afterbegin', value)
    }
}

function clearDiv() {
    document.getElementsByClassName('table-records')[0].innerHTML = '';
}


function setLocalStorage() {
    localStorage.setItem('results', JSON.stringify(results));
    localStorage.setItem('allResults', JSON.stringify(allResults));
    localStorage.setItem('arrObj', JSON.stringify(arrObj));
}
function getLocalStorage() {
    let resul = JSON.parse(localStorage.getItem('results'))
    let allResul = JSON.parse(localStorage.getItem('allResults'))
    let arrOb = JSON.parse(localStorage.getItem('arrObj'))
    if(resul !== null) results = resul;
    if(allResul !== null) allResults = allResul;
    if(arrOb !== null) arrObj = arrOb;
}



//EVENT-------------------------------------
window.addEventListener('load', () => {
    getLocalStorage()
    showRecords()
})



addEventListener('keydown', (event) => controller.keyDown(event));
addEventListener('keyup', (event) => controller.keyUp(event));

//buttons event
startBtn.addEventListener('click', () => {
    cancelAnimationFrame(requestId)
    startGame()
    menu.style.display = 'none';
    menuMini.style.display = 'grid';
    display.canvas.style.display = 'grid'
    switchSong()
})

recordsBtn.addEventListener('click', () => {
    menu.style.display = 'none';
    menuMini.style.display = 'grid';
    recordsTbl.style.display = 'flex'
})

menuMini.addEventListener('click', (event) => {
    console.log(event);
    menuMini.style.display = 'none';
    recordsTbl.style.display = 'none';
    settingsMenu.style.display = 'none';
    if(recordsTbl.style.display === 'none' && settingsMenu.style.display === 'none') display.canvas.style.display = 'none';
    menu.style.display = 'flex';
    if(song !== 'menu') {
        switchSong()
    }
    
})

settingsBtn.addEventListener('click', () => {
    menu.style.display = 'none';
    menuMini.style.display = 'grid';
    settingsMenu.style.display = 'flex';

})

namePlayer.addEventListener('change', (e) => {
    nickName = e.target.value;
})

resetObject();
init();
// menu.style.display = 'flex'

setTimeout(() => {
    switchSong()
}, 2000);
