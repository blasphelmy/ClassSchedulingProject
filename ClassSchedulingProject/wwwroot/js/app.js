var newCalender, calendar, init = 0, elements = {}, isFetching = 0, calEvents = [], newEvent = {};
var slotDuration = `00:05 00:10 00:15 00:30 01:00)`.split(" ");
var resources = [
    { id: 'J', building: 'J', title: '111' },
  ];
var developementMode = 1;
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
        selectable: false,
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
        eventOverlap: true,
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
    console.log("event mount action")
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
    console.log("event drop action");
    console.log(info);
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
    titleElement.innerHTML = ``;
    return info;
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
        overlap: true,
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
            eventAuthor: newCalender.data.firstName + " " + newCalender.data.lastName,
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
        finalizedEvent.extendedProps.eventAuthor = newEvent.extendedProps.eventAuthor;
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

        newCalender.addEvent(finalizedEvent, closePopUp);
    }
}
