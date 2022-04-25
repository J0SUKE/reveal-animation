let textContainers = [...document.querySelectorAll(".title p")];

textContainers.forEach(element => {
    let textContent = element.textContent;
    let markup="";
    textContent=textContent.split("");
    textContent.forEach(word => {
        markup+=`<span>${word}</span>`;
    });
    element.innerHTML=markup;
});

let mainTitleLetters = [...document.querySelectorAll(".title span")];
let menuActive = false;
let isTransitioning = false;

function UnrevealMainTitle() {
    menuActive=true;
    let delay=0;
    isTransitioning=true;
    mainTitleLetters.forEach(element => {
        element.style.animation = `letter-animation-unreveal .5s ${delay}ms forwards ease-in-out`;
        setTimeout(() => {
            element.style.animation='unset';
            element.style.transform='translateY(-100%)';
        }, 500+delay);
        delay+=25;
    });    
    setTimeout(() => {
        isTransitioning=false;
    }, 500+delay);
}

function RevealMainTitle() {
    menuActive=false;
    let delay=0;
    isTransitioning=true;
    mainTitleLetters.forEach(element => {
        element.style.animation = `letter-animation-reveal .5s ${delay}ms forwards ease-in-out`
        setTimeout(() => {
            element.style.animation='unset';
            element.style.transform='translateY(0%)';
        }, 500+delay);
        delay+=25;
    });       

    setTimeout(() => {
        isTransitioning=false;
    }, 500+delay);
}



let aboutBtn = document.querySelector("header span");
aboutBtn.addEventListener("click",()=>{
    if (isTransitioning) return;
    
    if (menuActive) {
        RevealMainTitle();
        return;
    }
    UnrevealMainTitle();
});