class CalenderApp {
    data;
    calendar;
    permissibleEvents;
    constructor(data) {
        this.permissibleEvents = new Map();
        this.data = {};
        this.data.firstName = data.firstName;
        this.data.lastName = data.lastName;
        this.data.userAccountID = data.userAccountID;
        this.data.events = data.events;
        this.calendar = "undefined";
        //console.log(this.data);
        this.createCalender();
        this.parseEvents(this.data.events);
    }
    parseEvents(eventString) {
        let newEventList = eventString.split(" _--__- ").filter(e => e !== "");
        //console.log(newEventList);
        for (let i in newEventList) {
            newEventList[i] = JSON.parse(newEventList[i]);
            this.calendar.addEvent(newEventList[i]);
        }
        this.data.events = newEventList;
        console.log(newEventList);
    }
    createCalender() {
        var calendarEl = document.getElementById('calendar');
        this.calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'timeGridWeek',
            selectable: true,
            slotDuration: slotDuration[Number(document.getElementById("viewSizeRangeSlider").value) - 1],
            snapDuration: '00:05',
            defaultView: 'basicWeek',
            select: SelectAction,
            eventDidMount: EventMountAction,
            eventResize: EventResizeAction,
            eventClick: EventClickAction,
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
            editable: false,
            eventResizableFromStart: true,
            eventOverlap: false,
            events: this.data.events,
            contentHeight: 1,
        });
        this.calendar.render();
        $(".fc-header-toolbar").hide();
    }
    addEvent(newEvent) {
        newEvent.extendedProps.userAccountID = this.data.userAccountID;
        try {
            this.calendar.addEvent(newEvent);
        } catch {
            return "error";
        }
        //this.events.push(newEvent);
        console.log(newEvent.extendedProps.uuid);
        console.log(JSON.stringify(newEvent));
        
    }
}