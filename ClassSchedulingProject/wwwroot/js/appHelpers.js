function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 17) % 16 | 0;
        dt = Math.floor(dt / 17);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
function updateTimer(delay) {
    setTimeout(function () {
        console.log("update timer set");
        if (elements.checkNull() && newCalender.isActive === 0 && isFetching === 0) {
            isFetching = 1;
            fetchData(new Object);
        }
        updateTimer(delay);
    }, delay);
}

let fetchData = (e, callback) => {
    console.log("fetching data...");
    try {
        localStorage.setItem(e.id, e.value);
    } catch {
    }
    if (!elements.checkNull()) {
        return createCalender(caldata);
    }
    let filterterms = `${elements.year.val()},${elements.quarter.val()},${elements.building.val()},${elements.room.val()}`;
    //console.log(filterterms);
    fetch(`/home/fetchEvents?filterterms=${filterterms}`).then(response => response.json()).then((data) => {
        if (data !== "error") {
            if (newCalender.init === 0) {
                newCalender.parseEvents(data);
                createCalender(newCalender.data.events);
            } else {
                newCalender.updateEvents(data);
            }
        } else {
            console.log("error fetching calendar events...")
        }
        setTimeout(function () {
            isFetching = 0;
        }, 200);
    });
}
function fetchEventTemplates(e, callback){
    try {
        localStorage.setItem(e.id, e.value);
    } catch {
    }
    fetch(`/home/fetchEventTemplates?programID=${e.value}`).then(res => res.json()).then(data => {
        console.log(data);
        if(data){
            caldata.ProgramName = data.programName;
            caldata.ProgramType = data.programType;
            caldata.ProgramID = data.programID;
            caldata.EventTemplates = JSON.parse(data.programTemplates);
            var colorIndex = 0;
            caldata.EventTemplates.map(function(o, id){
                let color = colors[colorIndex++ % colors.length];
                o.Active = false;
                o.EventTemplateColor = color;
                EventTemplatesColorMap.set(o.Title, color);
            });
            fetchData(new Object);
            if(callback) callback();
        }
    });
}
function fetchNewCalendar(element) {
    newCalender = new CalenderApp(caldata);
    fetchData(element);
}
function formatdaysOfWeek(daysofweek) {
    let days = [];
    for (let d of daysofweek) {
        switch (d) {
            case "1": days.push("Mon"); break;
            case "2": days.push("Tue"); break;
            case "3": days.push("Wed"); break;
            case "4": days.push("Thu"); break;
            case "5": days.push("Fri"); break;
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
    return [(red * mulitplier) % 255, (green * mulitplier) % 255, (blue * mulitplier) % 255]
}
let pufDeleteAction = function (UUID) {
    newCalender.deleteEvent(UUID);
    closePopUp();
}
function formatTimeString(iTs, timestamps) {
    if (iTs[0] === "" || iTs[1] === "") return "time to be scheduled...";
    let timeStamp = [];
    for (let ts of iTs) {
        ts = ts.split(":");
        ts[0] = Number(ts[0]);
        ts.pop();
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
function goToEvent(building, roomNumber) {
    elements.room.val(roomNumber.toString());
    elements.building.val(building.toString());
    fetchData(elements.room);
}