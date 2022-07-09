//let events = JSON.parse(localStorage.getItem("tdata"))
let calEvents = [];
var newCalender;
var slotDuration = `00:05 00:10 00:15 00:30 01:00)`.split(" ");
console.log(slotDuration)
let SelectAction = (info) => {
    console.log("selectaction");
    //console.log(info);
    //console.log(document.getElementById("yearSel").value);
    if (document.getElementById("yearSel").value === "Select Year" || document.getElementById("qSel").value === "Select Quarter") return;
    let newEvent = {
        title: function () { return prompt("Enter Class Title") }(),
        start: info.startStr,
        end: info.endStr,
        overlap: false,
        color: "#cd3",
        extendedProps: {
            description: function () { return prompt("Enter Description") }(),
            uuid: create_UUID(),
            userAccountID: undefined
        }
    }
    calEvents.push(newEvent);
    newCalender.addEvent(newEvent);
}
let EventMountAction = (info) => {
    console.log("event mount action");
    //console.log("info", info);
    //console.log(info.el.querySelectorAll('.fc-event-title.fc-sticky')[0]);
    let timestamps = info.event._instance.range;
    timestamps.start = new Date(timestamps.start.getTime() + (7 * 1000 * 60 * 60));
    timestamps.end = new Date(timestamps.end.getTime() + (7 * 1000 * 60 * 60));
    let titleElement = info.el.querySelectorAll('.fc-event-title.fc-sticky')[0];
    let eventTimeElement = info.el.querySelectorAll('.fc-event-time')[0];
    titleElement.after(info.event.extendedProps.description);
    //console.log("duration: ", timestamps[0].toLocaleString());
    eventTimeElement.innerText = `${formatTime(timestamps)} (${getDuration(timestamps).toFixed(2)}hrs)`
    info.el.id = info.event.extendedProps.uuid ?? "error - " + create_UUID();
    console.log(info.el);
    //testContainer.querySelector('.four');
}
let EventResizeAction = (info) => {
    console.log("ResizeAction");
    console.log(info.el.id);
}
let EventClickAction = (info) => {
    console.log(info.el.id);
    console.log(info.jsEvent);
    if (info.el.id === newCalender.userAccountID) {
        console.log(true);
    }
}
function renderCalendar() {
    newCalender.createCalender();
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
function formatTime(timestamps) {
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
    return timeStamp.join(" - ");
}
