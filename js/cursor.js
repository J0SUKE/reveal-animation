class Cursor
{
    constructor(domElement,lerp)
    {
        //domElement : the cursor html element
        // lerp : the lerp factor (between 0 and 1)

        this.element = domElement;
        this.x=0;
        this.y=0;
        this.cursorTop=0;
        this.lerp=lerp;
        this.lastScroll=document.documentElement.scrollTop;
        this.enabled = true;
    }

    updateCursor(positionX,positionY)
    {
        this.x = lerp(this.x, positionX, this.lerp);
        this.y = lerp(this.y, positionY, this.lerp);

        this.cursorTop=this.y;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

        const{scrollTop} = document.documentElement;
        this.lastScroll=scrollTop;

    }
    scroll()
    {
        const{scrollTop} = document.documentElement;
        let deltaScroll = scrollTop-this.lastScroll;
        this.y = this.cursorTop+deltaScroll;
        this.element.style.top = `${this.y}px`;    
    
    }
    show()
    {
        this.element.style.opacity = "1";
    }
    enable()
    {
        this.inabled=true;
        this.element.style.display = "unset";
    }
    disable()
    {
        this.inabled=false;
        this.element.style.display = "none";
    }
}

function lerp (start, end, amt){
    return (1-amt)*start+amt*end
  }


let cursor=new Cursor(document.querySelector(".cursor"),0.3);

document.addEventListener("mouseover",()=>{
    if (!cursor.enabled) return;
    cursor.show();
});
document.addEventListener("scroll",()=>{
    if (!cursor.inabled) return;
    cursor.scroll();
});


document.addEventListener("mousemove",(e)=>{
    if (!cursor.enabled) return;
    cursor.updateCursor(e.pageX,e.pageY);
})



const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

let deviceType = getDeviceType();

if (deviceType=="mobile" || deviceType=="tablet") {
    cursor.disable();
}