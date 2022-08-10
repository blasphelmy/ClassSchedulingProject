var calendar, init = 0, elements = {}, isFetching = 0, calEvents = [], newEvent = {};
const slotDuration = `00:05 00:10 00:15 00:20 00:30 01:00)`.split(" "), colors = "#3587e9 #ff8700 #c87a17 #5e4fa2 #00ea2f #1fb976 #ee66a8 #79a2ed".split(" "), timeoffset = (7 * 1000 * 60 * 60)
var resources = [
    { id: 'J', building: 'J', title: '111' },
  ];
const developerMode = false;
let eventBuilder = function(e){
    if(e.extendedProps.room === elements.room.val() &&
        e.extendedProps.building === elements.building.val()){
        return e;
    }
    return {};
}
let ua = 5;
let EventTemplatesColorMap = new Map();
var EventTemplateMaps = new Map();
// function buildEventTemplatMaps(eventsTemplates){
//     EventTemplateMaps = new Map();
//     eventsTemplates.map(function(o, i){
//         console.log(o)
//         EventTemplateMaps.set(o.Id, o);
//     })
// }
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
                || this.dpt.val() === "") {
                    document.getElementById("calendar").style.setProperty("display", "none");
                    $("#helpPage").css("display", "block");
                    renderHelpPage();
                return false;
            }
            $("#helpPage").css("display", "none");
            if(document.getElementById("viewStyle").value === "1") document.getElementById("calendar").style.setProperty("display", "");
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
    checkCalendarState(function(){
        newCalender = new CalenderApp(caldata);
        fetchEventTemplates(document.getElementById("dptSel"), function(){
            updateTimer(10 * 1000);
        });
    });
});
function createCalender(events) {
    if(developerMode) console.log("rendering calendar...");
    var calendarEl = document.getElementById('calendar');
    let scroll = document.querySelectorAll('.fc-scroller.fc-scroller-liquid-absolute')[0]?.scrollTop ?? 0;
    calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: 'America/Los_Angeles',
        initialView: 'timeGridWeek',
        duration: { days: 5 },
        selectable: false,
        slotDuration: slotDuration[Number(document.getElementById("viewSizeRangeSlider").value) - 1],
        snapDuration: '00:01',
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
        displayEventTime: true,
        selectMirror: true,
        slotMinTime: "06:00:00",
        slotMaxTime: "23:00:00",
        slotLabelInterval: "01:00",
        height: '100%',
        allDaySlot: false,
        weekends: false,
        dayHeaderFormat: { weekday: 'short' },
        editable: true,
        eventResizableFromStart: true,
        eventOverlap: true,
        events: function(){
            caldata.EventTemplates.map((o) => {o.Active = false});
            return events ?? newCalender.data?.events ?? [];
        }().map(eventBuilder),
        contentHeight: 1,
        initialDate: "2022-07-04"
    });
    calendar.render();
    $(".fc-header-toolbar").hide();
    document.querySelectorAll('.fc-scroller.fc-scroller-liquid-absolute')[0].scrollTop = scroll;
}
let SelectAction = (info) => {
    if(developerMode) console.log("selectaction");
    closePopUp();
    if (!elements.checkNull()) return;
    createAnEventPopUp(info);
    generateFormData(info);
    //newCalender.addEvent(newEvent);
}
let EventMountAction = (info) => {
    if(developerMode) console.log("event mount action")
    formatCalendarItem(info);
}
let EventClickAction = (info) => {
    if(developerMode) console.log("event click action...");
    if (newCalender.checkPermissions(info.event._def)) {
        let event = newCalender.data.events[newCalender.EventMap.get(info.event._def.extendedProps.uuid)];
        closePopUp();
        generateFormData(info, event);
        createAnEventPopUp(info, event, "eventList");
    } else {
        createPopUp(info);
    }
}
let EventResizeAction = (info) => {
    info.el.id = info.event.extendedProps.uuid;
    closePopUp();
    EventDropAction(info);
    formatTime(info);
}
let EventDropAction = (info) => {
    let newEvent = newCalender.data.events[newCalender.EventMap.get(info.event._def.groupId)];
    newEvent.startTime = new Date(info.event._instance.range.start.getTime() + timeoffset).toTimeString().split(" ")[0];
    newEvent.endTime = new Date(info.event._instance.range.end.getTime() + timeoffset).toTimeString().split(" ")[0];
    newEvent.extendedProps.endTime = newEvent.endTime;
    newEvent.extendedProps.startTime = newEvent.startTime;
    newCalender.saveEvent(newEvent, fetchData);
}
let EventDragStartAction = (info) => {
    closePopUp();
    newCalender.isActive = 1;
}
let EventDragStopAction = (info) => {
    if(developerMode) console.log("event drag stop action")
    newCalender.isActive = 0;
}
let eventResourceChange = (info) => {
    if(developerMode) console.log("event render action...");
}
function renderCalendar() {
    createCalender();
}
function generateResourceGroups(){
}

function getDuration(timestamps) {
    let xms = timestamps.end - timestamps.start;
    xms = xms / 1000 / 60 / 60;
    return xms;
}
function formatTime(info) {
    let timestamps = {};
    timestamps.start = new Date(info.event._instance.range.start.getTime() + timeoffset);
    timestamps.end = new Date(info.event._instance.range.end.getTime() + timeoffset);
    let iTs = [timestamps.start.toTimeString().split(" ")[0], timestamps.end.toTimeString().split(" ")[0]];
    return formatTimeString(iTs, timestamps);
}
function formatCalendarItem(info) {
    info.event.extendedProps.userAccountID = userAccountID;
    let titleElement = info.el.querySelectorAll('.fc-event-title.fc-sticky')[0];
    let eventTimeElement = info.el.querySelectorAll('.fc-event-time')[0];
    try {
        eventTimeElement.innerHTML = `${function () {
            if (info.event._def.extendedProps.userAccountID === newCalender.data.userAccountID && role < 3 && _isActive == 1 && caldata.ProgramID == info.event._def.extendedProps.ProgramId) {
                return `<span id="eventDelete_${info.event._def.extendedProps.uuid}" class="close text-light" style="position:relative;bottom:6px;">&times;</span> <br /> `;
            }
            return ``;
        }()}<span>${info.event._def.title} <br /> ${info.event._def.extendedProps.instructorName}</span><br />${formatTime(info)}`;
        if (info.event._def.extendedProps.userAccountID === newCalender.data.userAccountID) {
            document.getElementById(`eventDelete_${info.event._def.extendedProps.uuid}`).addEventListener("click", function (e) {
                closePopUp();
                e.stopPropagation();
                let element = document.getElementById(`eventDelete_${info.event._def.extendedProps.uuid}`);
                newCalender.deleteEvent(element.id.split("_")[1]);
            });
        }
    } catch {
        if(developerMode) console.log("error formatting time...")
    }
    titleElement.innerHTML = ``;
    return info;
}

function pufSelectBoxChange(element) {
    if (element.id === "pufDeliveryType") {
        if (element.value === "Online") {
            document.getElementById("pufRoomNumber").value = "na";
            document.getElementById("pufRoomNumber").disabled = true;
            document.getElementById("pufBuilding").value = "na";
            document.getElementById("pufBuilding").disabled = true;
        } else {
            document.getElementById("pufRoomNumber").value = "na";
            document.getElementById("pufRoomNumber").disabled = false;
            document.getElementById("pufBuilding").value = "na";
            document.getElementById("pufBuilding").disabled = false;
        }
    }
}
