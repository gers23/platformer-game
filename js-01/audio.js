const audio = new Audio();
const sound = new Audio();
const sliderVolumeMusic = document.querySelector('.vMusic');
const sliderVolumeSound = document.querySelector('.vSound');
const btns = document.querySelectorAll('button');
let isPlay = true;
let song = menu;

audio.volume = 0.5;
sound.volume = 0.2;


const songs = {
    'menu': './assets/audio/music/01.menu.mp3',
    'game': './assets/audio/music/02.game.ogg',
    
}

const sounds = {
    'btnHover': './assets/audio/sounds/01.button_hover.mp3',
    'btnClick': './assets/audio/sounds/02.button_click.mp3',
    'jump': './assets/audio/sounds/03.jump.ogg',
    'gameOver': './assets/audio/sounds/04.gameOver.ogg',
    'victory': './assets/audio//music/05.victory.ogg',
}

function switchSong(name) {
    if(menu.style.display === 'flex') {
        song = 'menu';
    } else if (display.canvas.style.display === 'grid') {
        song = 'game'
    }
    audio.src = songs[song];
    playSong()
}

function playSong() {
    console.log('play');
    console.log(audio.volume);
    
    if(isPlay) {
        audio.play();
    } else {
        audio.pause();
    }
}

audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

function switchSound(name) {
    console.log(name);
    sound.src = sounds[name];
    playSound()
}

function playSound() {
    sound.play()
}



const valueVMusic = document.querySelector('.valueVMusic');
const valueVSound = document.querySelector('.valueVSound');

function changeVolumeMusic(amount) {
    audio.volume = parseFloat(amount.target.value);
    
    valueVMusic.textContent = audio.volume * 100
    console.log(audio.volume * 100);
}

function changeVolumeSound(amount) {
    sound.volume = parseFloat(amount.target.value);
    
    valueVSound.textContent = sound.volume * 100
    console.log(sound.volume * 100);
}

//EVENTS
sliderVolumeMusic.addEventListener('input', changeVolumeMusic);
sliderVolumeSound.addEventListener('input', changeVolumeSound);

//events sound
btns.forEach(elem => elem.addEventListener('mouseenter', () => switchSound('btnHover')))
btns.forEach(elem => elem.addEventListener('click', () => switchSound('btnClick')))
