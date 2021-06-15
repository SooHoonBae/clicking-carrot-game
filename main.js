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

let timeleft=10;
function countDown() {
    if(timeleft>=0){
    time.textContent=`0:${timeleft}`;
    timeleft--;
    }else{
        youLost();
        stopCount();
    }
}
let timer=null;
function startCount() {
    timer=setInterval(countDown, 1000);
    
    
}
function stopCount() {
    if(timer!=null){
        clearInterval(timer);
    }
}

//start game
let i=0;
let count=9;
section.addEventListener('click',event=>{
    const id = event.target.dataset.id;
    if(i===0){
        if(event.target==playBtn||event.target==playIcon){
            playIcon.replaceWith(stopIcon);
            numb.textContent='10';
            makeTenCarrot();
            makeBugs();          
            startCount();
        };
        i++;
    };
    if(i===1){
        if(event.target==stopIcon) {
            console.log('hi');
        }
    }
    if(id < 10) {
        const toBeDeleted = document.querySelector(`.carrot[data-id="${id}"]`);
        toBeDeleted.remove();
        numb.textContent=`${count}`;
        count--;
        
    }else if(id>=10){
        youLost();
        stopCount();         
    };         
});

const lost=document.createElement('div');
lost.setAttribute('class','lost');
const retryBtn=document.createElement('button');
retryBtn.setAttribute('class','retry')
const lostText = document.createElement('span');
lostText.setAttribute('class','lostText');

//When Fail
function youLost() {
    playBtn.style.opacity =0;
    section.appendChild(lost);
    lost.appendChild(retryBtn);
    retryBtn.innerHTML=`
    <i class="fas fa-redo"></i>
    `;
    lost.appendChild(lostText);
    lostText.textContent='You Lost~!!';
};

//retry event
retryBtn.addEventListener('click',()=>{
    playBtn.style.opacity=1;
    lost.remove();
    numb.textContent='10';
    
    timeleft=10;
    startCount();
    makeTenCarrot();
    makeBugs();

    const carrots = document.querySelectorAll('.carrot')
    const bugs = document.querySelectorAll('.bug')
    let i=0;
    while(i<10){
    let carrot = carrots[i];
    if(carrot){
        carrot.remove();
    }
    i++;
    };
    
    let j=0;
    while(j<7){
        let bug = bugs[j];
        bug.remove();
        j++;
    };
})