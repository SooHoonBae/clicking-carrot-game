'use strict'
const section = document.querySelector('section');
const playBtn = document.querySelector('.signs__play');
const playIcon = document.querySelector('.fa-play');
const time = document.querySelector('.signs__time');
const numb = document.querySelector('.signs__numb');
const stopIcon = document.createElement('i');
stopIcon.setAttribute('class','fas fa-stop');

let i=0;
playBtn.addEventListener('click',()=>{
        if(i===0) {
            playIcon.replaceWith(stopIcon);
            time.textContent='0:10';
            numb.textContent='10';
            makeTenCarrot();
            i++;
        }else{
            return;
        };   
    });

//making 10 carrots at one click
function makeTenCarrot() {
    let i=0;
    while(i<10){
        const carrot = document.createElement('img');
        carrot.setAttribute('class','carrot');
        carrot.setAttribute('src','img/carrot.png');
        carrot.style.transform = 
        `translate(${getRandomX(minX,maxX)}px,${getRandomY(minY,maxY)-80}px )`;    
        section.appendChild(carrot);
        i++;
    };
}
//Random coordinate(x,y) of carrot.
//1. X : left(min) and right(max) x coordination of section
const sectionRect = section.getBoundingClientRect();
const minX = sectionRect.left;
const maxX = sectionRect.right-80;

//2. Y : top + height/2 (min) and bottom(max) y coordination of section
const minY = sectionRect.bottom - sectionRect.height*2/5;
const maxY = sectionRect.bottom;


//3. random x coordination between minX and maxX
function getRandomX(minX,maxX) {
    const randomX = Math.random()*(maxX-minX) + minX;
    return randomX;
}
//4. random y coordination between minY and maxY
function getRandomY(minY,maxY) {
    const randomY = Math.random()*(maxY-minY) + minY;
    return randomY;
}
