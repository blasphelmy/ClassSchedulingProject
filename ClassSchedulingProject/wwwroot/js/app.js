//let events = JSON.parse(localStorage.getItem("tdata"))
let calEvents = [];
let resources = [
    { id: 'J', building: 'J', title: '111' },
  ];
var newCalender;
let calendar;
var slotDuration = `00:05 00:10 00:15 00:30 01:00)`.split(" ");
var init = 0;
let elements = {}
let isFetching = 0;
var newEvent = {};
document.addEventListener('DOMContentLoaded', function () {
    elements = {
        year: $("#yearSel"),
        quarter: $("#qSel"),
        building: $("#building"),
        room: $("#room"),
        dpt: $('#dptSel'),
        checkNull: function () {
            if (this.year.val() === "Select Year"
                || this.quarter.val() === "Select Quarter"
                || this.building.val() === "Select Building"
                || this.room.val() === "Select Room"
                || this.dpt.val() === "Dept") {
                return false;
            }
            return true;
        },
        setItemsFromLocalStorage: function () {
            if (localStorage.getItem(this.year.attr('id'))) {
                this.year.val(localStorage.getItem(this.year.attr('id')));
            }
            if (localStorage.getItem(this.quarter.attr('id'))) {
                this.quarter.val(localStorage.getItem(this.quarter.attr('id')));
            }
            if (localStorage.getItem(this.building.attr('id'))) {
                this.building.val(localStorage.getItem(this.building.attr('id')));
            }
            if (localStorage.getItem(this.room.attr('id'))) {
                this.room.val(localStorage.getItem(this.room.attr('id')));
            }
            if (localStorage.getItem(this.dpt.attr('id'))) {
                this.dpt.val(localStorage.getItem(this.dpt.attr('id')));
            }
        }
    }
    generateResourceGroups();
    elements.setItemsFromLocalStorage();
    newCalender = new CalenderApp(caldata);
    fetchData(new Object);
    updateTimer(30 * 1000);
});
function createCalender(events) {
    //console.log("rendering calendar...");
    var calendarEl = document.getElementById('calendar');
    let scroll = document.querySelectorAll('.fc-scroller.fc-scroller-liquid-absolute')[0]?.scrollTop ?? 0;
    calendar = new FullCalendar.Calendar(calendarEl, {
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        timeZone: 'America/Los_Angeles',
        initialView: 'timeGridWeek',
        // initialView : 'resourceTimelineDay',
        duration: { days: 5 },
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
        resourceChange: eventResourceChange,
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
        resources: resources,
        // resourceGroupField: 'building',
        //events: JSON.parse(),
        contentHeight: 1,
        initialDate: "2022-07-04"
    });
    calendar.render();
    $(".fc-header-toolbar").hide();
    document.querySelectorAll('.fc-scroller.fc-scroller-liquid-absolute')[0].scrollTop = scroll;
}
let SelectAction = (info) => {
    console.log("selectaction");
    closePopUp();
    if (!elements.checkNull()) return;
    createAnEventPopUp(info);
    generateFormData(info);
    //newCalender.addEvent(newEvent);
}
let EventMountAction = (info) => {
    formatCalendarItem(info);
}
let EventClickAction = (info) => {
    console.log("event click action...");
    if (info.event._def.extendedProps.userAccountID === newCalender.data.userAccountID) {
        let event = newCalender.data.events[newCalender.EventMap.get(info.event._def.extendedProps.uuid)];
        closePopUp();
        generateFormData(info);
        createAnEventPopUp(info, event);
    } else {
        createPopUp(info);
    }
}
let EventResizeAction = (info) => {
    info.el.id = info.event.extendedProps.uuid ?? "error - " + create_UUID();
    console.log("ResizeAction");
    closePopUp();
    EventDropAction(info);
    formatTime(info);
}
let EventDropAction = (info) => {
    let newEvent = newCalender.data.events[newCalender.EventMap.get(info.event._def.groupId)];
    newEvent.startTime = new Date(info.event._instance.range.start.getTime() + (7 * 1000 * 60 * 60)).toTimeString().split(" ")[0];
    newEvent.endTime = new Date(info.event._instance.range.end.getTime() + (7 * 1000 * 60 * 60)).toTimeString().split(" ")[0];
    newEvent.extendedProps.endTime = newEvent.endTime;
    newEvent.extendedProps.startTime = newEvent.startTime;
    newCalender.saveEvent(newEvent, fetchData);
}
let EventDragStartAction = (info) => {
    closePopUp();
    newCalender.isActive = 1;
}
let EventDragStopAction = (info) => {
    console.log("event drag stop action")
    newCalender.isActive = 0;
}
let eventResourceChange = (info) => {
    console.log("event render action...");
}
function renderCalendar() {
    createCalender();
}
function generateResourceGroups(){
    // let 
}

function getDuration(timestamps) {
    let xms = timestamps.end - timestamps.start;
    xms = xms / 1000 / 60 / 60;
    return xms;
}
function formatTime(info) {
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
    return `${timeStamp.join(" - ")} (${getDuration(timestamps).toFixed(2)}hrs)`;
}
function formatCalendarItem(info) {
    info.event.extendedProps.userAccountID = caldata.userAccountID;
    let titleElement = info.el.querySelectorAll('.fc-event-title.fc-sticky')[0];
    let mainContainerElement = info.el.querySelectorAll('.fc-event-title-container')[0];
    let timestamps = {};
    let extendedProps = info.event.extendedProps;
    timestamps.start = new Date(info.event._instance.range.start.getTime() + (7 * 1000 * 60 * 60));
    timestamps.end = new Date(info.event._instance.range.end.getTime() + (7 * 1000 * 60 * 60));

    let eventTimeElement = info.el.querySelectorAll('.fc-event-time')[0];
    try {
        eventTimeElement.innerHTML = `${function () {
            if (info.event._def.extendedProps.userAccountID === newCalender.data.userAccountID) {
                return `<span id="eventDelete_${info.event._def.extendedProps.uuid}" class="close text-light" style="position:relative;bottom:6px;">&times;</span> <br /> `;
            }
            return ``;
        }()}<span>${info.event._def.title} - ${info.event._def.extendedProps.instructorName}</span><br />${formatTime(info)}`;
        if (info.event._def.extendedProps.userAccountID === newCalender.data.userAccountID) {
            document.getElementById(`eventDelete_${info.event._def.extendedProps.uuid}`).addEventListener("click", function (e) {
                closePopUp();
                e.stopPropagation();
                let element = document.getElementById(`eventDelete_${info.event._def.extendedProps.uuid}`);
                newCalender.deleteEvent(element.id.split("_")[1]);
            });
        }
    } catch {
        console.log("error formatting time...")
    }
    titleElement.innerHTML = `<span style="font-size: 12px;">${extendedProps.instructorName}<br />`;
    return info;
}

function createPopUp(info) {
    closePopUp();
    let event = newCalender.data.events[newCalender.EventMap.get(info.event._def.extendedProps.uuid)];
    renderPopUp(event, info);
    let popupElement = document.getElementById("eventPopUP");
    setPopUpPos(popupElement, { x: info.jsEvent.clientX, y: info.jsEvent.clientY });
}
function renderPopUp(event, info) {
    $(`<div id="eventPopUP" class="card popup">
        <div id="ptitle">${event.title}<span id="pclose-UUID" class="close" onclick="closePopUp()">&times;</span></div>
        <div id="ptime">${formatTime(info)} <i>room ${event.extendedProps.building}-${event.extendedProps.room}</i></div>
            <div class="pauthor">
                <div>Recurs : <b>${function () {
                    let eventDaysOfWeek = "";
                    for (let i = 0; i < event.daysOfWeek.length; i++) {
                        switch (event.daysOfWeek[i]) {
                            case "1": eventDaysOfWeek = eventDaysOfWeek + "Mon "; break;
                            case "2": eventDaysOfWeek = eventDaysOfWeek + "Tues "; break;
                            case "3": eventDaysOfWeek = eventDaysOfWeek + "Wed "; break;
                            case "4": eventDaysOfWeek = eventDaysOfWeek + "Thu "; break;
                            case "5": eventDaysOfWeek = eventDaysOfWeek + "Fri "; break;
                        }
                    }
                return eventDaysOfWeek;
                    
                }()}</b></div>
                <div>Instructor : <b>${event.extendedProps.instructorName}</b></div>
                <div>Component : <b>${event.extendedProps.component}</b></div>
                <div>Delivery : <b>${event.extendedProps.delivery}</b></div>
                <div>From : <b>${event.extendedProps.startDate}</b></div >
                <div>To : <b>${event.extendedProps.endDate}</b></div >
            </div>
        <hr />
        <div  class="pauthor">
            <div>Course : <b>${event.extendedProps.coursePrefix + "-" + event.extendedProps.courseNumber} Section # ${event.extendedProps.section}, ${event.extendedProps.Session}</b> </div>
            <div>Class # <b>${event.extendedProps.classNumber}</b></div>
        </div>
    </div>`).appendTo("body");
    createDraggableElement(document.getElementById("eventPopUP"));
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
function generateFormData(info) {
        newEvent = {
        title: function () {
            let e = $("#pufTitle");
            if (e.val()) {
                return e.val();
            } else {
                return null;
            }
        },
        start: info.startStr,
        end: info.endStr,
        overlap: false,
        color: "#cd3",
        daysOfWeek: function () {
            let elementCheckboxes = document.getElementsByClassName("pufDaysOfWeek");
            let daysofweek = [];
            for (e of elementCheckboxes) {
                if (e.checked) {
                    daysofweek.push(e.value);
                }
            }
            return daysofweek;
        },
            extendedProps: {
            uuid: info.event?._def.extendedProps.uuid || create_UUID(),
            userAccountID: newCalender.data.userAccountID,
            instructorName: function () {
                let e = $("#pufInstructor");
                if (e.val()) {
                    return e.val();
                }
                return null;
            },
            classNumber: function () {
                let e = $("#pufClassNumber");
                try {
                    Number(e.val());
                    return Number(e.val());
                } catch {
                    return null;
                }
            },
            section: function () {
                let e = $("#pufSection");
                if (e.val()) {
                    return e.val();
                } else {
                    return null;
                }
            },
            coursePrefix: elements.dpt.val(),
            courseNumber: function () {
                let e = $("#pufCourseNumber");
                try {
                    Number(e.val());
                    return Number(e.val());
                } catch {
                    return null;
                }
            },
            building: elements.building.val(),
            room: elements.room.val(),
            component: function () {
                let e = $("#pufComponent");
                if (e.val() !== "Component") {
                    return e.val();
                } else {
                    return null;
                }
            },
            delivery: function () {
                let e = $("#pufDeliveryType");
                if (e.val() !== "Delivery") {
                    return e.val();
                } else {
                    return null;
                }
            },
            Session: function () {
                return $("#pufSession").val();
            },
            startDate: function () {
                return $("#pufStartDate").val();
            },
            endDate: function () {
                return $("#pufEndDate").val();
            },
            startTime: function () {
                return $("#pufStartTime").val();
            },
            endTime: function () {
                return $("#pufEndTime").val();
            }
        }
    }
}
function createAnEventPopUp(info, event) {
    $(`
<div id="addEventPopUp" class="card popup">
    <span style="width:20px" id="pclose-UUID" class="close" popupid="addEventPopUp" onclick="closePopUp(this)">&times;</span>
    <div class="container" style="position:relative;top: 20px; left: 25px;">
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label class="control-label"><b>Course Title</b></label><br />
                    <input id="pufTitle" class="form-control-xs" placeholder="Database Design" value="${event?.title||""}"/>
                </div>
                <div class="form-group">
                    <label class="control-label"><b>Class Number (If unknown, leave blank)</b></label><br />
                    <input id="pufClassNumber" class="form-control-xs" placeholder="28964" value="${event?.extendedProps.classNumber || ""}"/>
                </div>
                <div class="form-group">
                    <label class="control-label" ><b>Instructor</b></label><br />
                    <input id="pufInstructor" class="form-control-xs" placeholder="${caldata.lastName}" value="${event?.extendedProps.instructorName || ""}"/>
                </div>
                <div class="form-group">
                    <label class="control-label" ><b>Section</b></label><br />
                    <input id="pufSection" class="form-control-xs" placeholder="1" value="${event?.extendedProps.section || ""}"/>
                </div>
                <div class="form-group">
                    <label class="control-label"><b>Course Number</b></label><br />
                        <select id="pufCourseNumberPrefix" class="custom-select-xs">
                          <option selected>${event?.extendedProps.coursePrefix || elements.dpt.val()}</option >
                        </select>
                    <input id="pufCourseNumber" class="form-control-xs" value="${event?.extendedProps.courseNumber || ""}"/>
                </div>
            </div>
            <div class="col">

                <div class="form-group">
                        <select id="pufDeliveryType" onchange="pufSelectBoxChange(this)" class="custom-select-xs">
                          <option selected>${event?.extendedProps.delivery || "Delivery"}</option>
                          <option value="Flex">Flex</option>
                          <option value="Online">Online</option>
                          <option value="InPerson">In Person</option>
                          <option value="IndStudy">Ind Study</option>
                        </select>
                        <select id="pufComponent" class="custom-select-xs">
                          <option selected>${event?.extendedProps.component || "Component"}</option>
                          <option value="Lecture">Lecture</option>
                          <option value="Lab">Lab</option>
                        </select>
                        <select id="pufSession" class="custom-select-xs">
                          <option selected>${event?.extendedProps.Session || "Reg"}</option>
                        </select>
                </div>

                <div style="margin-bottom: 20px;">
                    <span><b>Room:</b> <span>

                    <select id="pufBuilding" class="custom-select-xs">
                        <option selected>${elements.building.val()}</option>
                    </select></span></span>
                    <select id="pufRoomNumber" class="custom-select-xs">
                        <option selected>${elements.room.val()}</option>
                    </select>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label class="control-label">Start Date</label><br />
                            <input id="pufStartDate" type="date" class="form-control-xs" value="${event?.extendedProps.startDate || ""}" />
                        </div>
                        <div class="form-group">
                            <label class="control-label">End Date</label><br />
                            <input id="pufEndDate" type="date" class="form-control-xs" value="${event?.extendedProps.endDate || ""}" />
                        </div>

                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label class="control-label">Start Time</label><br />
                            <input id="pufStartTime"type="time" class="form-control-xs" value="${info.startStr?.split("T")[1] ?? info.event._def.extendedProps.startTime}"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">End Time</label><br />
                            <input id="pufEndTime" type="time" class="form-control-xs" value="${info.endStr?.split("T")[1] ?? info.event._def.extendedProps.endTime}"/>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label"><b>Recurs:</b></label><br />
                    <label class="control-label">M</label>
                    <input type="checkbox" value="1" class="form-control-xs pufDaysOfWeek" />
                    <label class="control-label">T</label>
                    <input type="checkbox" value="2" class="form-control-xs pufDaysOfWeek" />
                    <label class="control-label">W</label>
                    <input type="checkbox" value="3" class="form-control-xs pufDaysOfWeek" />
                    <label class="control-label">Th</label>
                    <input type="checkbox" value="4" class="form-control-xs pufDaysOfWeek" />
                    <label class="control-label">F</label>
                    <input type="checkbox" value="5" class="form-control-xs pufDaysOfWeek" />
                </div>
            </div>
        </div>
        <br />
            <button onclick="finalizeFormDataAndAdd()" style="position:relative; float:right; margin-right: 30px;" class="btn btn-primary">Submit</button>
    </div>
</div>
    `).appendTo("body");
    if (event) {
        let checkboxes = document.getElementsByClassName("pufDaysOfWeek");
        for (let i = 0; i < event.daysOfWeek.length; i++) {
            checkboxes[Number(event.daysOfWeek[i])-1].checked = true
        }
    }
    createDraggableElement(document.getElementById("addEventPopUp"));
    setPopUpPos(document.getElementById("addEventPopUp"), { x: info.jsEvent.clientX, y: info.jsEvent.clientY });
}
function pufSelectBoxChange(element) {
    if (element.id === "pufDeliveryType") {
        if (element.value === "Online") {
            document.getElementById("pufRoomNumber").value = "na";
            document.getElementById("pufRoomNumber").disabled = true;
            document.getElementById("pufBuilding").value = "na";
            document.getElementById("pufBuilding").disabled = true;
        }
    }
}
function createDraggableElement(element) {
        dragElement(element);

        function dragElement(element) {
        var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
        element.onmousedown = dragMouseDown;
        element.ontouchstart = touchStart;

            function dragMouseDown(e) {
                e = e || window.event;
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
function closePopUp(e) {
    try {
        $('.popup')[0].remove();
    } catch {

    }
}
function finalizeFormDataAndAdd() {
    let finalizedEvent = JSON.parse(JSON.stringify(newEvent));
    if (newEvent.title() &&
        newEvent.extendedProps.classNumber() &&
        newEvent.extendedProps.courseNumber() &&
        newEvent.extendedProps.section() &&
        newEvent.extendedProps.component() &&
        newEvent.extendedProps.delivery()) {

        finalizedEvent.title = newEvent.title();
        finalizedEvent.daysOfWeek = newEvent.daysOfWeek();
        finalizedEvent.extendedProps.instructorName = newEvent.extendedProps.instructorName();
        finalizedEvent.extendedProps.classNumber = newEvent.extendedProps.classNumber();
        finalizedEvent.extendedProps.Session = newEvent.extendedProps.Session();
        finalizedEvent.extendedProps.section = newEvent.extendedProps.section();
        finalizedEvent.extendedProps.courseNumber = newEvent.extendedProps.courseNumber();
        finalizedEvent.extendedProps.component = newEvent.extendedProps.component();
        finalizedEvent.extendedProps.delivery = newEvent.extendedProps.delivery();
        finalizedEvent.extendedProps.startTime = newEvent.extendedProps.startTime();
        finalizedEvent.extendedProps.endTime = newEvent.extendedProps.endTime();
        finalizedEvent.extendedProps.startDate = newEvent.extendedProps.startDate();
        finalizedEvent.extendedProps.endDate = newEvent.extendedProps.endDate();

        finalizedEvent.groupId = finalizedEvent.extendedProps.uuid;
        finalizedEvent.startTime = finalizedEvent.extendedProps.startTime;
        finalizedEvent.endTime = finalizedEvent.extendedProps.endTime;

        newCalender.addEvent(finalizedEvent);
    }
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
