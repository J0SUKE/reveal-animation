let mainTitleContainer = [...document.querySelectorAll(".title p")];
let aboutTitleContainer = [...document.querySelectorAll(".about-content p")];

//Divise un paragraph en plusieurs spans 

function splitToSpans(domElement) {
    domElement.forEach(element => {    
        let textContent = element.textContent;
        let markup="";
        textContent=textContent.split("");
        textContent.forEach(word => {
            if (word==" ") {
                markup+=`<span class="space">I</span>`;    
            }
            else
            {
                markup+=`<span>${word}</span>`;
            }
            
        });
        element.innerHTML=markup;
    });    
}

splitToSpans(mainTitleContainer);
splitToSpans(aboutTitleContainer);


let mainTitleLetters = [...document.querySelectorAll(".title span")];
let aboutTilteletter = [...document.querySelectorAll(".about-content p")];
let aboutImg = document.querySelector(".about img");
let figcaption = document.querySelector(".about figure");
let menuActive = false;
let isTransitioning = false;
let animationDuration = 440;
let bezierCurve1 = "cubic-bezier(0.74,0.12,0.59,0.91)";
let bezierCurve2 = "cubic-bezier( 1, 0.01, 0.78, 0.98 )";

function UnrevealMainTitle(letters,delay) {
    isTransitioning=true;
    letters.forEach(element => {
        element.style.animation = `letter-animation-unreveal ${animationDuration}ms ${delay}ms forwards ${bezierCurve1}`;
        setTimeout(() => {
            element.style.animation='unset';
            element.style.transform='translateY(-100%)';
        }, animationDuration+delay);
        delay+=20;
    });    
}

function RevealMainTitle(letters,delay) {
    for (let i = letters.length-1; i >=0; i--) 
    {
        letters[i].style.animation = `letter-animation-reveal ${animationDuration}ms ${delay}ms forwards ${bezierCurve1}`
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


    document.body.style.animation = `animateBackgound ${duration}ms ${delay}ms forwards`;
    
    setTimeout(() => {
        document.body.style.backgroundColor = "rgba(195, 185, 150,1)";    
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

    aboutImg.style.animation = `animate-reveal-Img ${duration}ms ${d4}ms forwards`;
    figcaption.style.animation = `animate-reveal-Img ${duration}ms ${d4}ms forwards`;
    setTimeout(() => {
        aboutImg.classList.add("img-revealed");
        aboutImg.classList.remove("img-unrevealed");
        
        figcaption.classList.add("img-revealed");
        figcaption.classList.remove("img-unrevealed");
        
        isTransitioning=false;
        
    }, duration+d4);

}

function unrevealAboutTitle(paragraphs,duration,delay) {
    let d4 = delay;
    let d3 = d4+200;
    let d2 = d3+200;
    let d1 = d2+200;
    
    let delays = [d1,d2,d3,d4];

    isTransitioning=true;

    for (let i = 0; i < paragraphs.length; i++) {

        let spans = [...paragraphs[i].querySelectorAll("span")];

        for (let j = spans.length-1; j >=0; j--) {
            spans[j].style.animation = `from-bottom-letter-unreveal ${duration}ms ${delays[i]}ms forwards ${bezierCurve2}`;
            setTimeout(() => {
                spans[j].style.transform = "translateY(100%)"
            }, duration+delays[i]);
            delays[i]+=15;
            
        }
    }

    aboutImg.style.animation = `animate-unreveal-Img ${duration}ms ${d1}ms forwards ${bezierCurve2}`;
    figcaption.style.animation = `animate-unreveal-Img ${duration}ms ${d1}ms forwards ${bezierCurve2}`;
    setTimeout(() => {
        aboutImg.classList.add("img-unrevealed");
        aboutImg.classList.remove("img-revealed");
        
        figcaption.classList.add("img-unrevealed");
        figcaption.classList.remove("img-revealed");
    }, duration+d1);

    document.body.style.animation = `revertAnimateBackgound ${duration}ms ${d1}ms forwards`;

    setTimeout(() => {
        document.body.style.backgroundColor = "rgba(250, 245, 227,1)";    
        document.querySelector(".about").style.display = `none`;
    }, delays[0]+duration);
}

let aboutBtn = document.querySelector("header .About-btn");

function ToggleAbout() {
    if (isTransitioning) return; 
    
    if (menuActive)
    {
        menuActive=false;
        aboutBtn.textContent = "About";
        RevealMainTitle(mainTitleLetters,1400);        
        unrevealAboutTitle(aboutTilteletter,900,0);    
        return;
    }
    menuActive=true;
    aboutBtn.textContent = "Close";
    UnrevealMainTitle(mainTitleLetters,0)
    revealAboutTitle(aboutTilteletter,900,300)
}

aboutBtn.addEventListener("click",ToggleAbout);

