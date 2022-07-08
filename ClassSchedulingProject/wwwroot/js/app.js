//let events = JSON.parse(localStorage.getItem("tdata"))
let calEvents = [];
var newCalender;
var slotDuration = `00:05 00:10 00:15 00:30 01:00)`.split(" ");
console.log(slotDuration)
let SelectAction = (info) => {
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
        }
    }
    calEvents.push(newEvent);
    newCalender.addEvent(newEvent);
}
let EventMountAction = (info) => {
    //console.log(info.event.extendedProps);
    //console.log(info.el);
    console.log("info", info);
    //console.log(info.el.querySelectorAll('.fc-event-title.fc-sticky')[0]);
    let titleElement = info.el.querySelectorAll('.fc-event-title.fc-sticky')[0];
    titleElement.after(info.event.extendedProps.description);
    //testContainer.querySelector('.four');
}
function renderCalendar() {
    newCalender.createCalender();
}