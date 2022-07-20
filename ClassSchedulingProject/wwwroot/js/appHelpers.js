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

let fetchData = (e) => {
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
        setTimeout(function() {
            isFetching = 0;
        }, 200);
    });
}
function fetchNewCalendar(element) {
    newCalender = new CalenderApp(caldata);
    fetchData(element);
}