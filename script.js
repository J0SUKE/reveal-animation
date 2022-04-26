let mainTitleContainer = [...document.querySelectorAll(".title p")];
let aboutTitleContainer = [...document.querySelectorAll(".about-content p")];

function splitToSpans(domElement) {
    domElement.forEach(element => {
        let textContent = element.textContent;
        let markup="";
        textContent=textContent.split("");
        textContent.forEach(word => {
            markup+=`<span>${word}</span>`;
        });
        element.innerHTML=markup;
    });    
}

splitToSpans(mainTitleContainer);
splitToSpans(aboutTitleContainer);


let mainTitleLetters = [...document.querySelectorAll(".title span")];
let aboutTilteletter = [...document.querySelectorAll(".about-content p")];
let menuActive = false;
let isTransitioning = false;
let animationDuration = 440;

function UnrevealMainTitle(letters,delay) {
    isTransitioning=true;
    letters.forEach(element => {
        element.style.animation = `letter-animation-unreveal ${animationDuration}ms ${delay}ms forwards cubic-bezier(0.74,0.12,0.59,0.91)`;
        setTimeout(() => {
            element.style.animation='unset';
            element.style.transform='translateY(-100%)';
        }, animationDuration+delay);
        delay+=20;
    });    
    setTimeout(() => {
        isTransitioning=false;
    }, 500+delay);
}

function RevealMainTitle(letters,delay) {
    isTransitioning=true;
    
    for (let i = letters.length-1; i >=0; i--) 
    {
        letters[i].style.animation = `letter-animation-reveal ${animationDuration}ms ${delay}ms forwards cubic-bezier(0.74,0.12,0.59,0.91)`
        setTimeout(() => {
            letters[i].style.animation='unset';
            letters[i].style.transform='translateY(0%)';
        },animationDuration+delay);
        delay+=15;   
    }      

    setTimeout(() => {
        isTransitioning=false;
    }, 500+delay);
}

function revealAboutTitle(paragraphs,duration,delay) {
    let d1 = delay;
    let d2 = delay+200;
    let d3 = d2+300;
    let d4 = d3+300;
    let delays = [d1,d2,d3,d4];


    document.querySelector(".about").style.animation = `animateBackgound ${duration}ms ${delay}ms forwards`;
    
    setTimeout(() => {
        document.querySelector(".about").style.backgroundColor = "rgba(195, 185, 150,1)";    
    }, duration+d4);
    

    setTimeout(() => {
        document.querySelector(".about").style.display = `unset`;
    }, delay);

    for (let i = 0; i < paragraphs.length; i++) {

        let spans = [...paragraphs[i].querySelectorAll("span")];

        for (let j =0; j <spans.length; j++) {
            spans[j].style.animation = `from-bottom-letter-reveal ${duration}ms ${delays[i]}ms forwards`;
            //apres combien de temps l'animation d'un span se termine t'elle ? 
            setTimeout(() => {
                spans[j].style.transform = "translateY(0%)"
            }, duration+delays[i]);
            delays[i]+=15;
        }
    }

}

function unrevealAboutTitle(paragraphs,duration,delay) {
    let d4 = delay;
    let d3 = d4+200;
    let d2 = d3+200;
    let d1 = d2+200;
    
    let delays = [d1,d2,d3,d4];
    
    for (let i = 0; i < paragraphs.length; i++) {

        let spans = [...paragraphs[i].querySelectorAll("span")];

        for (let j = spans.length-1; j >=0; j--) {
            spans[j].style.animation = `from-bottom-letter-unreveal ${duration}ms ${delays[i]}ms forwards`;
            setTimeout(() => {
                spans[j].style.transform = "translateY(100%)"
            }, duration+delays[i]);
            delays[i]+=15;
            
        }
    }

    document.querySelector(".about").style.animation = `revertAnimateBackgound ${duration}ms ${d1}ms forwards`;

    setTimeout(() => {
        document.querySelector(".about").style.backgroundColor = "rgba(250, 245, 227,0)";    
        document.querySelector(".about").style.display = `none`;
    }, delays[0]+duration);
}

let aboutBtn = document.querySelector("header span");
let closeBtn = document.querySelector(".about header span");

function ToggleAbout() {
    if (menuActive)
    {
        menuActive=false;
        RevealMainTitle(mainTitleLetters,1200);        
        unrevealAboutTitle(aboutTilteletter,900,200);    
        return;
    }
    menuActive=true;
    UnrevealMainTitle(mainTitleLetters,0)
    revealAboutTitle(aboutTilteletter,900,400)
}


aboutBtn.addEventListener("click",ToggleAbout);
closeBtn.addEventListener("click",ToggleAbout);

