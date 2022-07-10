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
    console.log("event mount action");
    //console.log(info);
    formatCalendarItem(info);
}
let EventClickAction = (info) => {
    console.log(info.el.id);
    console.log(info);
    createPopUp(info);
}
let EventResizeAction = (info) => {
    console.log("ResizeAction");
    EventDropAction(info);
    formatTime(info);
}
let EventDropAction = (info) => {
    console.log("event drop triggerd");
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
    newCalender.isActive = 1;
    console.log("eventDragAction", newCalender.isActive);
}
let EventDragStopAction = (info) => {
    console.log("event drag stop action")
    newCalender.isActive = 0;
}
function renderCalendar() {
    createCalender();
}
function createCalender(events) {
    console.log("rendering calendar...");
    var calendarEl = document.getElementById('calendar');
    let scroll = document.querySelectorAll('.fc-scroller.fc-scroller-liquid-absolute')[0]?.scrollTop ?? 0;
    calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: 'America/Los_Angeles',
        initialView: 'timeGridWeek',
        selectable: true,
        slotDuration: slotDuration[Number(document.getElementById("viewSizeRangeSlider").value) - 1],
        snapDuration: '00:05',
        defaultView: 'basicWeek',
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
        week: {
            columnFormat: 'ddd'
        },
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
    eventTimeElement.innerText = `${timeStamp.join(" - ") } (${getDuration(timestamps).toFixed(2)}hrs)`;
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
