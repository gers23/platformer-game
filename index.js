 function createImage(imgSrc) {
     const image = new Image();
     image.src = imgSrc;
     return image
 }
 
 const images = {
     'platform': "./assets/img/platform.png",
     'mountain': './assets/img/mountain_4.png', 
     'trees1': './assets/img/trees_1.png',
     'trees': './assets/img/trees.png',
     'tabl': './assets/img/tabl.png',
     'platformSmallTall': './assets/img/platformSmallTall.png',
     'spriteStandRight': './assets/img/spriteStandRight.png',
     'spriteStandLeft': './assets/img/spriteStandLeft.png',
     'spriteRunRight': './assets/img/spriteRunRight.png',
     'spriteRunLeft': './assets/img/spriteRunLeft.png',
     'spriteJumpRight': './assets/img/spriteJumpRight.png',
     'heart': './assets/img/heart.png',
 }

 
const startBtn = document.querySelector('.start')
const menu = document.querySelector('.container-menu')
const menuMini = document.querySelector('.menu-mini')
const recordsBtn = document.querySelector('.records')
const recordsTbl = document.querySelector('.container-records')
const namePlayer = document.querySelector('.name')
const settingsBtn = document.querySelector('.settings')
const settingsMenu = document.querySelector('.container-settings')