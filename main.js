'use strict'
const section = document.querySelector('section');
const playBtn = document.querySelector('.signs__play');
const playIcon = document.querySelector('.fa-play');
const time = document.querySelector('.signs__time');
const numb = document.querySelector('.signs__numb');
const stopIcon = document.createElement('i');

stopIcon.setAttribute('class','fas fa-stop');
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
//making 10 carrots at one click
function makeTenCarrot() {
    let i=0;
    while(i<10){
        const carrot = document.createElement('img');
        carrot.setAttribute('class','carrot');
        carrot.setAttribute('src','img/carrot.png');
        carrot.setAttribute('data-id',i);
        carrot.style.transform = 
        `translate(${getRandomX(minX,maxX)}px,${getRandomY(minY,maxY)-80}px )`;    
        section.appendChild(carrot);
        i++;
    };
    
}
//making 7 bugs
function makeBugs() {
    let i=10;
    while(i<17){
        const bug = document.createElement('img');
        bug.setAttribute('class','bug');
        bug.setAttribute('src','img/bug.png');
        bug.setAttribute('data-id',i);
        bug.style.transform = 
        `translate(${getRandomX(minX,maxX)}px,${getRandomY(minY,maxY)-80}px )`;    
        section.appendChild(bug);
        i++;
    };
}
//countdown
function countDown() {
    let timeleft=10;
    const timer = setInterval(function(){
        if(timeleft<0){
            clearInterval(timer);
            youLost();
        }else{
            time.textContent=`0:${timeleft}`;
            timeleft--;
        }
        },1000);
};

//start game
let i=0;
playBtn.addEventListener('click',event=>{
    if(i===0) {
        playIcon.replaceWith(stopIcon);
        numb.textContent='10';
        
        countDown();
        makeTenCarrot();
        makeBugs();
        i++;
    }
        
});
let count=9;
section.addEventListener('click',(event)=>{
    const id = event.target.dataset.id;
    if(id < 10) {
        const toBeDeleted = document.querySelector(`.carrot[data-id="${id}"]`);
        toBeDeleted.remove();
        numb.textContent=`${count}`;
        count--;
        
        }else if(id>9){
            youLost();
                 
        };
})    
function youLost() {
    playBtn.style.opacity =0;
    const lost=document.createElement('div');
    lost.setAttribute('class','lost');
    section.appendChild(lost);
    lost.innerHTML=`  
        <button class="retry">
          <i class="fas fa-redo"></i>
        </button>
        <span>You Lost!!</span>
    `;
    
};