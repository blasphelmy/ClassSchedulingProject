var newCalender, calendar, init = 0, elements = {}, isFetching = 0, calEvents = [], newEvent = {};
var slotDuration = `00:05 00:10 00:15 00:30 01:00)`.split(" ");
var developementMode = 1;
var caldata = {
    firstName: "",
    lastName: "",
    userAccountID: "",
    userAccountLevel: "",
    UserAssociatedDepartment: "",
    ProgramType: "",
    ProgramName: "",
    EventTemplates: [],
    events: undefined,
    institutionID: "",
    role: undefined,
    EventTemplates: []
}
let userList = undefined;

var eventBuilder = function(e){
    if(e.extendedProps.room === elements.room.val() &&
        e.extendedProps.building === elements.building.val()){
        return e;
    }
    return {};
}
let EventTemplatesColorMap = new Map();
let colors = "#3587e9 #ff8700 #c87a17 #5e4fa2 #00ea2f #1fb976 #ee66a8 #79a2ed".split(" ");
var elements;
function initializeCaldata(callback){
    console.log(localStorage.getItem("sessionID"))
    fetch(`${host}/home/caldata?sessionID=${localStorage.getItem("sessionID")}`).then(data => data.json()).then(function(data){
        if(data !== 0){
            caldata.firstName = data.firstName;
            caldata.lastName = data.lastName;
            caldata.institutionID = data.institutionID;
            userList = JSON.parse(data.userList);
            caldata.userAccountID = data.userAccountID;
            caldata.role = Number(data.userAccountLevel);
            caldata.UserAssociatedDepartment = data.departmentName;
            $("#thisUsersName").text(caldata.firstName + " " + caldata.lastName);
            $("#thisUsersDepartment").text(caldata.UserAssociatedDepartment)
            JSON.parse(data.programOfferings).map(function(i){
                $(`<option value="${i.ProgramId}">${i.ProgramName + " " + i.ProgrameType}</option>`).appendTo("#dptSel")
            })
            for(let x = 0; x < 4; x++){
                $(`<option value="${x + new Date().getFullYear()}">${x + new Date().getFullYear()}</option>`).appendTo("#yearSel")
            }
            if(typeof callback === "function") callback(caldata);
        }
    });
}
let initApp = () => {
        document.getElementById("role").innerText = function() { 
        switch (caldata.role) {
            case 0: return "Admin"; break;
            case 1: return "Admin Assistant"; break;
            default: return "Professor"; break;
        }
    }();
    elements = {
        year: $("#yearSel"),
        quarter: $("#qSel"),
        building: $("#building"),
        room: $("#room"),
        dpt: $('#dptSel'),
        checkNull: function () {
            if (this.year.val() === "Select Year"
                || this.quarter.val() === "Select Quarter"
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
    fetchEventTemplates(document.getElementById("dptSel"), function(){
        updateTimer(10 * 1000);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    initializeCaldata(initApp);
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
        snapDuration: '00:01',
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
    newCalender.saveEvent(newEvent, function(){
        fetchData(new Object, function(){
            $("#s2").text(`Last modified at ${new Date().toLocaleTimeString()}`);
        })
    });
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
    let iTs = [timestamps.start.toTimeString().split(" ")[0], timestamps.end.toTimeString().split(" ")[0]];
    return formatTimeString(iTs, timestamps);
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
    // try {
        eventTimeElement.innerHTML = `${function () {
            if (info.event._def.extendedProps.userAccountID === newCalender.data.userAccountID) {
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
    // } catch {
    //     console.log("error formatting time...")
    // }
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
