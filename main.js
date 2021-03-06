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

//countDown
const timeNumb = 15;
let timeleft=timeNumb;
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
    countDown();//to remove initial time delay
    timer=setInterval(countDown, 1000);
}
function stopCount() {
    if(timer!=null){
        clearInterval(timer);
    }
}

//sound
const bg=new Audio('sound/bg.mp3');
const carrotPull=new Audio('sound/carrot_pull.mp3');
const bugPull=new Audio('sound/bug_pull.mp3');
const gameWin=new Audio('sound/game_win.mp3');
const alert=new Audio('sound/alert.wav');

function startBg(){
    bg.play();
    bg.loop=true;
}
function stopBg(){
    bg.pause();
    bg.currentTime=0;   
}

//start game
let i=0;
let count=10;
playBtn.addEventListener('click',event=>{
    if(i===0){
        playIcon.replaceWith(stopIcon);
        numb.textContent=`${count}`;
        makeTenCarrot();
        makeBugs();          
        startCount();
        startBg()
        i++;
    }else{
        stopBg();       
        stopCount();
        pressStop();
    };
});

//click event of carrot or bug
section.addEventListener('click',event=>{
    const id = event.target.dataset.id;
    if(id < 10) {
        const toBeDeleted = document.querySelector(`.carrot[data-id="${id}"]`);
        toBeDeleted.remove();
        numb.textContent=`${count-1}`;
        count--;
        carrotPull.play();    
        if(count==0){
            youWon();
            stopCount();
        };        
    }else if(id>=10){
        youLost();
        stopCount();
        bugPull.play();         
    };
})

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
    stopBg();
    bugPull.play();
};
//When Win
function youWon() {
    playBtn.style.opacity =0;
    section.appendChild(lost);
    lost.appendChild(retryBtn);
    retryBtn.innerHTML=`
    <i class="fas fa-redo"></i>
    `;
    lost.appendChild(lostText);
    lostText.textContent='You Won~!!';
    stopBg();
    gameWin.play();
}

//When press stop button
function pressStop() {
    playBtn.style.opacity =0;
    section.appendChild(lost);
    lost.appendChild(retryBtn);
    retryBtn.innerHTML=`
    <i class="fas fa-redo"></i>
    `;
    lost.appendChild(lostText);
    lostText.textContent='Replay??';
    alert.play();
}
//retry event
retryBtn.addEventListener('click',()=>{
    playBtn.style.opacity=1;
    lost.remove();
    count=10;
    numb.textContent=`${count}`;
    
    timeleft=timeNumb;
    startCount();
    
    const carrots = document.querySelectorAll('.carrot')
    let i=0;
    while(i<10){
        let carrot = carrots[i];
        if(carrot){
            carrot.remove();
        }
        i++;
    };
    makeTenCarrot();
    
    const bugs = document.querySelectorAll('.bug')
    let j=0;
    while(j<7){
        let bug = bugs[j];
        bug.remove();
        j++;
    };
    makeBugs();
    startBg();  
})