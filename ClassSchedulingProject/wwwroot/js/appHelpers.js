function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 17) % 16 | 0;
        dt = Math.floor(dt / 17);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
window.addEventListener('click', (event) => {
    ua = ua * 1.1
    if(ua > 5) ua = 5;
    if(developerMode) console.log(ua)
})
window.addEventListener('mousemove', function(e){
    _mousePOS.x = e.pageX;
    _mousePOS.y = e.pageY;

    ua = ua + 0.0008;
    if(ua > 4) ua = 4;
    if(developerMode) console.log(ua)
}, false);

window.addEventListener("keyup", function(){
    ua = ua * 1.01
    if(ua > 5) ua = 5;
    if(developerMode) console.log(ua)
})

function updateTimer(delay) {
    setTimeout(function () {
        if(developerMode) console.log("update timer set");
        if (elements.checkNull() && newCalender.isActive === 0 && isFetching === 0) {
            isFetching = 1;
            fetchData(new Object);
            checkCalendarState();
            ua = ua - 1;
            if(ua < 1) ua = 1;
        }
        updateTimer(delay);
    }, delay / ua);
}

let fetchData = (e, callback) => {
    document.getElementById("s1").style.setProperty("display", "inline-block");
    $("#s2").text("fetching data...");
    try {
        localStorage.setItem(e.id, e.value);
    } catch {
    }
    if (!elements.checkNull()) {
        return createCalender(caldata);
    }
    let filterterms = `${elements.year.val()},${elements.quarter.val()},${elements.building.val()},${elements.room.val()}`;
    //if(developerMode) console.log(filterterms);
    fetch(`/home/fetchEvents?filterterms=${filterterms}`).then(response => response.json()).then((data) => {
        if (data !== "error") {
            if (newCalender.init === 0) {
                newCalender.parseEvents(data);
                createCalender(newCalender.data.events);
            } else {
                newCalender.updateEvents(data);
            }
            setTimeout(() => {
                document.getElementById("s1").style.setProperty("display", "none");
                $("#s2").text(`Last fetched at ${new Date().toLocaleTimeString()}`);
            }, 500);
        } else {
            if(developerMode) console.log("error fetching calendar events...")
            setTimeout(() => {
                document.getElementById("s1").style.setProperty("display", "none");
                $("#s2").text(`error fetching calendar events...`);
            }, 1000);
        }
        setTimeout(function () {
            isFetching = 0;
            if(callback) callback();
        }, 200);
        updateWarningDisplayIfExist();
    });
}
function fetchEventTemplates(e, callback){
    closePopUp();
    try {
        localStorage.setItem(e.id, e.value);
    } catch {
    }
    //caldata.ProgramID = e.value;
    window.dontAssert = true;
    checkCalendarState(function(){
        fetch(`/home/fetchEventTemplates?programID=${e.value}`).then(res => res.json()).then(data => {
            if(developerMode) console.log(data);
            if(data){
                caldata.ProgramName = data.programName;
                caldata.ProgramType = data.programType;
                caldata.ProgramID = data.programID;
                caldata.EventTemplates = JSON.parse(data.programTemplates).sort( (a, b) => a.QuarterNumber > b.QuarterNumber ? 1 : -1);
                var colorIndex = 0;
                caldata.EventTemplates.map(function(o, i){
                    let color = colors[colorIndex++ % colors.length];
                    o.Active = false;
                    o.EventTemplateColor = color;
                    EventTemplatesColorMap.set(o.Id, color);
                    EventTemplateMaps.set(o.Id, o);
                });
                fetchData(new Object, function(){
                    window.dontAssert = false;
                });
                if(callback) callback();
            }
        });
    })
}
function checkEventSanity(event){
    let eventTemplate = EventTemplateMaps.get(event.extendedProps.courseID);
    if(!eventTemplate){
        event.extendedProps.insanityLevel = 1;
        return event;
    }
    event.title = eventTemplate.Title;
    event.extendedProps.coursePrefix = eventTemplate.CoursePrefix;
    event.extendedProps.courseNumber = eventTemplate.CourseNumber;
    event.extendedProps.component = eventTemplate.Component;
    event.extendedProps.ClassQuarterNumber = eventTemplate.QuarterNumber;
    event.extendedProps.credits = eventTemplate.Credits;

    event.extendedProps.insanityLevel = 0;

    event = checkForWarnings(event);

    return event;
}
function checkForWarnings(event){
    event.extendedProps.warnings = new Array();
    if(event.daysOfWeek.length === 0) event.extendedProps.warnings.push("Event days of week not set");
    if((!event.extendedProps.room || !event.extendedProps.building) && (event.extendedProps.delivery !== "Online")) event.extendedProps.warnings.push("Location not set")
    if(event.endTime === "" || event.startTime === "") event.extendedProps.warnings.push("Times not set")
    if(event.extendedProps.startDate === "" || event.extendedProps.endDate === "") event.extendedProps.warnings.push("Start and end date not set")
    if(event.extendedProps.classNumber === 0) event.extendedProps.warnings.push("Class number not set")
    if(event.extendedProps.section === null) event.extendedProps.warnings.push("Section number not set")
    return event;
}
function createSelectListRooms(){
    let currentBuilding = elements.building.val();
    console.log(currentBuilding)
    if(currentBuilding === "Select Building") return;
    let rooms = resources.get(currentBuilding);
    elements.room.text("");
    elements.room.append($(`<option>Select Room</option>`))
    for(let room of rooms){
        elements.room.append($(`<option value="${room}">${room}</option>`))
    }
    elements.room.val(localStorage.getItem(elements.room.attr('id')))
}
function updatePopUpSelectList(){
    let element = $(`#pufRoomNumber`);
    let currentBuilding = $(`#pufBuilding`).val();
    let rooms = resources.get(currentBuilding);
    element.text("");
    element.append($(`<option>Select Room</option>`))
    for(let room of rooms){
        element.append($(`<option value="${room}">${room}</option>`))
    }
}
function updateRoomsThenFetchNewCalendar(element){
    createSelectListRooms();
    fetchNewCalendar(element);
}
function fetchNewCalendar(element) {
    if(element.id === "yearSel" || element.id === "qSel") closePopUp();
    checkCalendarState();
    newCalender = new CalenderApp(caldata);
    fetchData(element);
}
function checkCalendarState(callback){
    window.dontAssert = true;
    let isActiveElement = $("#isActiveToggle")
    fetch(`/home/checkCalState?year=${elements.year.val()}&quarter=${elements.quarter.val()}&programID=${Number(elements.dpt.val())}`).then(data => data.json()).then(function(data){
        isActiveElement.bootstrapToggle('enable')
        if(data == 1){
            isActiveElement.bootstrapToggle('off')
        }else{
            isActiveElement.bootstrapToggle('on')
        }
        isActiveElement.bootstrapToggle('disable')
        _isActive = data;
        window.dontAssert = false;
        if(role < 3) isActiveElement.bootstrapToggle('enable')
        if(callback) callback();
    })
}
function formatdaysOfWeek(daysofweek, option = "Mon Tues Wed Thur Fri".split(" ")) {
    let days = [];
    for (let d of daysofweek) {
        switch (d) {
            case "1": days.push(option[0]); break;
            case "2": days.push(option[1]); break;
            case "3": days.push(option[2]); break;
            case "4": days.push(option[3]); break;
            case "5": days.push(option[4]); break;
        }
    }
    if (days.length === 0) {
        return "dates to be scheduled"
    } else {
        return days.join(", ");
    }
}
function shuffle(array) {
    let currentIndex = array.length, randomIndex = 0;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
function HEXtoRGB(hex, callback, multiplier) {
    if (!hex) return [0, 0, 0];
    hex = hex.replace(/#/g, '');
    if (hex.length === 3) {
        hex = hex.split('').map(function (hex) {
            return hex + hex;
        }).join('');
    }
    // validate hex format
    var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
    if (result) {
        var red = parseInt(result[1], 16);
        var green = parseInt(result[2], 16);
        var blue = parseInt(result[3], 16);
        if (typeof (callback) === "function") if (typeof (multiplier) === "number") {
            return callback(red, green, blue, multiplier);
        } else {
            return callback(red, green, blue);
        }
        return [red % 255, green % 255, blue % 255];
    } else {
        // invalid color
        return null;
    }
}
let colorFilterBrightness = function (red, green, blue, mulitplier) {
    if (!mulitplier) mulitplier = .6;
    let max = 210;
    let min = 90;
    if(_theme === 2){
        // mulitplier = .6
        max = 225;
        min = 0;
    } 
    return [Math.min(Math.max(parseInt(red * mulitplier), min), max), 
            Math.min(Math.max(parseInt(green * mulitplier), min), max),
            Math.min(Math.max(parseInt(blue * mulitplier), min), max)]
}
let pufDeleteAction = function (UUID) {
    newCalender.deleteEvent(UUID);
    closePopUp();
}
function formatTimeString(iTs, timestamps) {
    if (!iTs || iTs[0] === "" || iTs[1] === "") return "time to be scheduled...";
    let timeStamp = [];
    for (let ts of iTs) {
        ts = ts.split(":");
        ts[0] = Number(ts[0]);
        // ts.pop();
        if (ts[0] >= 12) {
            ts.push("pm");
            if (ts[0] !== 12) ts[0] = ts[0] % 12;
        } else {
            ts.push("am");
        }
        ts = `${ts[0]}:${ts[1]}${ts[3] || ts[2]}`;
        timeStamp.push(ts);
    }
    let time = `${timeStamp.join(" - ")}`;
    if (timestamps) time += ` (${getDuration(timestamps).toFixed(2)}hrs)`
    return time;
}
function goToEvent(building, roomNumber, callback) {
    elements.building.val(building.toString());
    createSelectListRooms();
    elements.room.val(roomNumber.toString());
    try{
        localStorage.setItem(elements.room.attr("id"), roomNumber.toString());
    }catch{

    }
    try{
        localStorage.setItem(elements.building.attr("id"), elements.building.val());
    }catch{

    }
    fetchData(elements.room);
    if(callback) callback();
}
function changeBackToCalendarThenGoToEvent(building, room, callback) {
    document.getElementById("viewStyle").value = "1";
    changeView(document.getElementById("viewStyle"), function () {
        goToEvent(building, room, callback);
    })
}
function stopPropagation(e){
    e.stopPropagation();
}