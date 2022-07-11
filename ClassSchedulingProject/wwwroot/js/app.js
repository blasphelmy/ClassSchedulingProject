//let events = JSON.parse(localStorage.getItem("tdata"))
let calEvents = [];
var newCalender;
let calendar;
var slotDuration = `00:05 00:10 00:15 00:30 01:00)`.split(" ");
var init = 0;
let SelectAction = (info) => {
    console.log("selectaction");
    //console.log(info);
    //console.log(document.getElementById("yearSel").value);
    if (!elements.checkNull()) return;
    let newEvent = {
        title: function () { return prompt("Enter Class Title") }(),
        start: info.startStr,
        end: info.endStr,
        overlap: false,
        color: "#cd3",
        extendedProps: {
            description: function () { return prompt("Enter Description") }(),
            uuid: create_UUID(),
            userAccountID: newCalender.data.userAccountID
        }
    }
    newCalender.addEvent(newEvent);
}
let EventMountAction = (info) => {
    //console.log("event mount action");
    //console.log(info);
    formatCalendarItem(info);
}
let EventClickAction = (info) => {
    createPopUp(info);
}
let EventResizeAction = (info) => {
    //console.log("ResizeAction");
    closePopUp();
    EventDropAction(info);
    formatTime(info);
}
let EventDropAction = (info) => {
    //console.log("event drop triggerd");
    let newEvent = {
        title: info.event._def.title,
        start: info.event._instance.range.start.toISOString(),
        end: info.event._instance.range.end.toISOString(),
        overlap: false,
        color: "#cd3",
        extendedProps: info.event._def.extendedProps
    }
    newCalender.addEvent(newEvent);
}
let EventDragStartAction = (info) => {
    closePopUp();
    newCalender.isActive = 1;
    //console.log("eventDragAction", newCalender.isActive);
}
let EventDragStopAction = (info) => {
    //console.log("event drag stop action")
    newCalender.isActive = 0;
}
function renderCalendar() {
    createCalender();
}
function createCalender(events) {
    //console.log("rendering calendar...");
    var calendarEl = document.getElementById('calendar');
    let scroll = document.querySelectorAll('.fc-scroller.fc-scroller-liquid-absolute')[0]?.scrollTop ?? 0;
    calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: 'America/Los_Angeles',
        initialView: 'timeGridWeek',
        selectable: true,
        slotDuration: slotDuration[Number(document.getElementById("viewSizeRangeSlider").value) - 1],
        snapDuration: '00:05',
        //defaultView: 'basicWeek',
        select: SelectAction,
        eventDidMount: EventMountAction,
        eventResize: EventResizeAction,
        eventClick: EventClickAction,
        eventDrop: EventDropAction,
        eventDragStart: EventDragStartAction,
        eventDragStop: EventDragStopAction,
        eventResizeStart: function (info) {
            newCalender.isActive = 1;
        },
        eventResizeStop: function (info) {
            newCalender.isActive = 0;
        },
        //week: {
        //    columnFormat: 'ddd'
        //},
        displayEventTime: true,
        selectMirror: true,
        slotMinTime: "06:00:00",
        slotMaxTime: "21:00:00",
        slotLabelInterval: "01:00",
        height: '100%',
        allDaySlot: false,
        weekends: false,
        dayHeaderFormat: { weekday: 'short' },
        editable: true,
        eventResizableFromStart: true,
        eventOverlap: false,
        events: events ?? newCalender.data.events ?? [],
        //events: JSON.parse(),
        contentHeight: 1,
        initialDate: "2022-07-04"
    });
    calendar.render();
    $(".fc-header-toolbar").hide();
    document.querySelectorAll('.fc-scroller.fc-scroller-liquid-absolute')[0].scrollTop = scroll;
}
function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 17) % 16 | 0;
        dt = Math.floor(dt / 17);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
function getDuration(timestamps) {
    let xms = timestamps.end - timestamps.start;
    xms = xms / 1000 / 60 / 60;
    return xms;
}
function formatTime(info) {
    let eventTimeElement = info.el.querySelectorAll('.fc-event-time')[0];
    let timestamps = {};
    timestamps.start = new Date(info.event._instance.range.start.getTime() + (7 * 1000 * 60 * 60));
    timestamps.end = new Date(info.event._instance.range.end.getTime() + (7 * 1000 * 60 * 60));
    let iTs = [timestamps.start, timestamps.end];
    let timeStamp = [];
    for (let date of iTs) {
        let ts = date.toTimeString().split(" ")[0];
        ts = ts.split(":");
        ts[0] = Number(ts[0]);
        ts.pop();
        if (ts[0] > 12) {
            ts.push("pm");
            ts[0] = ts[0] % 12;
        } else {
            ts.push("am");
        }
        ts = `${ts[0]}:${ts[1]}${ts[2]}`;
        timeStamp.push(ts);
    }
    let timeStampStr = `${timeStamp.join(" - ")} (${getDuration(timestamps).toFixed(2)}hrs)`;
    eventTimeElement.innerHTML = `${function () {
        if (info.event._def.extendedProps.userAccountID === newCalender.data.userAccountID) {
            return `<span id="eventDelete_${info.event._def.extendedProps.uuid}" class="close text-light" style="position:relative;bottom:6px;">&times;</span> <br /> `;
        }
        return ``;
    }()}${timeStampStr}`;
    if (info.event._def.extendedProps.userAccountID === newCalender.data.userAccountID) {
        document.getElementById(`eventDelete_${info.event._def.extendedProps.uuid}`).addEventListener("click", function (e) {
            closePopUp();
            e.stopPropagation();
            let element = document.getElementById(`eventDelete_${info.event._def.extendedProps.uuid}`);
            newCalender.deleteEvent(element.id.split("_")[1]);
        });
    }
}
function formatCalendarItem(info) {
    info.event.extendedProps.userAccountID = caldata.userAccountID;
    let titleElement = info.el.querySelectorAll('.fc-event-title.fc-sticky')[0];
    let timestamps = {};
    timestamps.start = new Date(info.event._instance.range.start.getTime() + (7 * 1000 * 60 * 60));
    timestamps.end = new Date(info.event._instance.range.end.getTime() + (7 * 1000 * 60 * 60));
    formatTime(info);
    titleElement.after(info.event.extendedProps.description);
    //console.log("duration: ", timestamps[0].toLocaleString());
    info.el.id = info.event.extendedProps.uuid ?? "error - " + create_UUID();
    return info;
}

function createPopUp(info) {
    closePopUp();
    let element = info.el;
    let data = {
        
    }
    renderPopUp(info);
    let popupElement = document.getElementById("popup");
    setPopUpPos(popupElement, { x: info.jsEvent.clientX, y: info.jsEvent.clientY });
}
function setPopUpPos(popupElement, mouseClickData) {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let popUpElementWidth = popupElement.offsetWidth;
    let popUpElementHeight = popupElement.offsetHeight;
    popupElement.style.setProperty("top", mouseClickData.y + "px");
    popupElement.style.setProperty("left", mouseClickData.x + "px");
    if (mouseClickData.x > (screenWidth - popUpElementWidth)) { 
        popupElement.style.setProperty("left", (mouseClickData.x - popUpElementWidth) + "px");
    }
    if (screenHeight - mouseClickData.y < (popUpElementHeight)) {
        popupElement.style.setProperty("top", (mouseClickData.y - popUpElementHeight) + "px");
    }
}
function renderPopUp(info) {
    $(`<div id="popup" class="card">
        <div id="ptitle">CSI 242 Lab <span id="pclose-UUID" class="close" onclick="closePopUp()">&times;</span></div>
        <div id="ptime">3:00pm - 7:00pm</div>
        <div><span class="pauthor">Event by</span> <span id="pauthor">David Nguyen</span></div>
        <div id="pdescription">With Live Code Sessions!</div>
        <hr />
        <div id="comments">
            <div class="comment">Duck says: can you move this event to a different time please</div>
            <div class="comment">Duck says: can you move this event to a different time please</div>
            <div class="comment">Duck says: can you move this event to a different time please</div>
            <div class="comment">Duck says: can you move this event to a different time please</div>
            <div class="comment">Duck says: can you move this event to a different time please</div>
            <div class="comment">Duck says: can you move this event to a different time please</div>
            <div class="comment">Duck says: can you move this event to a different time please</div>
            <div class="comment">Duck says: can you move this event to a different time please</div>
            <div class="comment">Duck says: can you move this event to a different time please</div>
        </div>
    </div>`).appendTo("body");
    createDraggableElement(document.getElementById("popup"));
}
function createDraggableElement(element) {
        dragElement(element);

        function dragElement(element) {
        var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
        element.onmousedown = dragMouseDown;
        element.ontouchstart = touchStart;

            function dragMouseDown(e) {
                e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            x2 = e.clientX;
            y2 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

            function touchStart(e) {
                e = e || window.event;
            x1 = e.targetTouches[0].clientX;
            y1 = e.targetTouches[0].clientY;
            document.ontouchend = closeTouchAndDragElement;
            document.ontouchmove = dragElement;
        }

            function elementDrag(e) {
                e = e || window.event;
            e.preventDefault();
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
function closePopUp() {
    try {
        $('#popup').remove();
    } catch {

    }
}
