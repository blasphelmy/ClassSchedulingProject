class CalenderApp {
    data;
    EventMap;
    colorWheel;
    usersColors;
    isActive;
    init;
    constructor(data) {
        this.init = 0;
        this.isActive = 0;
        this.usersColors = new Map();
        this.EventMap = new Map();
        this.colorWheel = {
            colors: this.shuffle("#90BE6D #507DBC #F4C095 #C3ACCE #2271B3".split(" ")),
            default: "#ab4e68",
            index: 0
        }
        this.data = {};
        this.data.firstName = data.firstName;
        this.data.lastName = data.lastName;
        this.data.userAccountID = data.userAccountID;
        this.data.events = [];
        //console.log(this.data);
        if (data.events) {
            this.parseEvents(data.events);
        }
    }
    parseEvents(eventString) {
        let newEventList = eventString.split(" _--__- ").filter(e => e !== "");
        //console.log(newEventList);
        for (let i in newEventList) {
            newEventList[i] = JSON.parse(newEventList[i]);
            if (this.usersColors.get(newEventList[i].extendedProps.userAccountID) === undefined) {
                this.usersColors.set(newEventList[i].extendedProps.userAccountID, this.colorWheel.colors[this.colorWheel.index++]);
                if (this.colorWheel.index > this.colorWheel.colors.length) {
                    this.colorWheel.index = 0;
                }
            }
            if (newEventList[i].extendedProps.userAccountID === this.data.userAccountID) {
                newEventList[i].color = this.colorWheel.default;
            } else {
                newEventList[i].color = this.usersColors.get(newEventList[i].extendedProps.userAccountID);
            }
            this.data.events.push(newEventList[i]);
            this.EventMap.set(this.data.events[i].extendedProps.uuid, i);
        }
        this.init = 1;
        //console.log(this.data.events);
    }
    updateEvents(eventString) {
        let newEventList = eventString.split(" _--__- ").filter(e => e !== "");
        //console.log(newEventList);
        this.data.events = [];
        for (let i in newEventList) {
            newEventList[i] = JSON.parse(newEventList[i]);
            this.data.events[i] = newEventList[i];
            if (this.EventMap.get(this.data.events[i]) != i) {
                this.EventMap.set(this.data.events[i].extendedProps.uuid, i);
            }
            this.addEvent(newEventList[i], 1);
        }
        setTimeout(createCalender, 20);
    }
    addEvent(newEvent, isUpdatingEventList){
        //console.log("addEventClassMethod");
        //console.log("newevent", newEvent);
        newEvent.color = this.usersColors.get(newEvent.extendedProps.userAccountID);
        //console.log(this.permissibleEvents);
        //console.log(newEvent.extendedProps.uuid)
        if (newEvent.extendedProps.userAccountID === this.data.userAccountID) {
            newEvent.color = this.colorWheel.default;
            if (this.EventMap.get(newEvent.extendedProps.uuid) === 0 || this.EventMap.get(newEvent.extendedProps.uuid)) {
                if (this.data.events[this.EventMap.get(newEvent.extendedProps.uuid)] !== newEvent) {
                    console.log("event changes detected..saving event...")
                    this.saveEvent(newEvent);
                }
                this.data.events[this.EventMap.get(newEvent.extendedProps.uuid)] = newEvent;
                if (isUpdatingEventList !== 1) setTimeout(createCalender, 20);
                return;
            }
            console.log("new event detected... adding event to calender...")
            this.EventMap.set(newEvent.extendedProps.uuid, this.data.events.length);
            this.data.events[this.data.events.length] = newEvent;
            this.saveEvent(newEvent);
        }

        if (isUpdatingEventList != 1) setTimeout(createCalender, 20);
        this.isActive = 0;
    }
    checkEventPermmisions(eventUID) {
        for (let event of this.data.events) {
            if (eventUID === event.extendedProps.uuid && event.extendedProps.userAccountID === this.data.userAccountID) {
                return true;
            }
        }
        return false;
    }
    saveEvent(newEvent) {
        let newPost = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EventData: JSON.stringify(newEvent),
                EventUuid: newEvent.extendedProps.uuid,
                Year: Number(elements.year.val()),
                Quarter: Number(elements.quarter.val()),
                Building: elements.building.val(),
                Room: elements.room.val()
            })
        }
        //console.log(newPost)
        fetch(`/home/SaveEventData`, newPost).then(response => response.json()).then((data) => {
            //console.log(data);
        });
    }
    deleteEvent(uuid) {
        console.log(this.data.events[this.EventMap.get(uuid)]);
        if (this.data.events[this.EventMap.get(uuid)] && this.data.events[this.EventMap.get(uuid)].extendedProps.userAccountID === this.data.userAccountID) {
            fetch(`/home/deleteEvent?uuid=${uuid}`).then(response => response.json()).then((data) => {
                console.log(data);
                if (data === 1) {
                    this.data.events = this.data.events.splice(Number(this.EventMap.get(uuid)), 1);
                    console.log(this.data.events);
                    fetchData(new Object);
                }
            });
        }
    }
    shuffle(array) {
    let currentIndex = array.length, randomIndex;

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
}