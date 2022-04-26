class Cursor
{
    constructor(domElement,positionX,positionY)
    {
        this.element = domElement;
        this.x=positionX;
        this.y=positionY;
        this.cursorTop=0;
        this.lastScroll=document.documentElement.scrollTop;
    }

    updateCursor(positionX,positionY)
    {
        this.x = lerp(this.x, positionX, 0.3);
        this.y = lerp(this.y, positionY, 0.3);

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
}

function lerp (start, end, amt){
    return (1-amt)*start+amt*end
  }


let cursor=new Cursor(document.querySelector(".cursor"),0,0);

window.addEventListener("mouseover",()=>{
    cursor.show();
})

window.addEventListener("mousemove",(e)=>{
    cursor.updateCursor(e.pageX,e.pageY);
})

window.addEventListener("scroll",cursor.scroll.bind(cursor))