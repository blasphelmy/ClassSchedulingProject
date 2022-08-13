function createDraggableElement(element) {
    dragElement(element);

    function dragElement(element) {
    var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    element.onmousedown = dragMouseDown;
    element.ontouchstart = touchStart;

        function dragMouseDown(e) {
        if(!element.classList.contains("popup")) focusWarningWindow(element.id)
        else element.style.setProperty("z-index", ++window.zIndex)
        e = e || window.event;
        // get the mouse cursor position at startup:
        x2 = e.clientX;
        y2 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

        function touchStart(e) {
        if(!element.classList.contains("popup")) focusWarningWindow(element.id)
        else element.style.setProperty("z-index", ++window.zIndex)
        e = e || window.event;
        x1 = e.targetTouches[0].clientX;
        y1 = e.targetTouches[0].clientY;
        document.ontouchend = closeTouchAndDragElement;
        document.ontouchmove = dragElement;
    }

        function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        x1 = x2 - e.clientX;
        y1 = y2 - e.clientY;
        x2 = e.clientX;
        y2 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - y1) + "px";
        element.style.left = (element.offsetLeft - x1) + "px";
    }

        function dragElement(e) {
        e = e || window.event;
        x2 = x1 - e.targetTouches[0].clientX;
        y2 = y1 - e.targetTouches[0].clientY;
        x1 = e.targetTouches[0].clientX;
        y1 = e.targetTouches[0].clientY;
        element.style.top = (element.offsetTop - y2) + "px";
        element.style.left = (element.offsetLeft - x2) + "px";
    }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
        document.onmousemove = null;
    }
        function closeTouchAndDragElement() {
            document.ontouchend = null;
        document.ontouchmove = null;
    }
}
}
function centerWindow(element) {
    let w = window.innerWidth;
    let h = window.innerHeight;

    let elementWidth = element.getBoundingClientRect().width;
    let elementHeight = element.getBoundingClientRect().height;

    if(developerMode) console.log(w + " " + h + " " + elementWidth);

    element.style.top = (innerHeight * .25) + "px";
    element.style.left = ((innerWidth - elementWidth) * .5) + "px";

}