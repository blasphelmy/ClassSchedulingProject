﻿class CalenderApp {
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
        this.data.userAccountLevel = data.userAccountLevel;
        this.data.events = [];
        //console.log(this.data);
        if (data.events) {
            this.parseEvents(data.events);
        }
    }
    parseEvents(eventString) {
        let newEventList = eventString.split(" _--__- ").filter(e => e !== "");
        //console.log(newEventList);
        this.data.events = [];
        for (let i in newEventList) {
            newEventList[i] = JSON.parse(newEventList[i]);
            newEventList[i].overlap = true;
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
            newEventList[i].overlap = true;
            this.data.events[i] = newEventList[i];
            if (this.EventMap.get(this.data.events[i]) != i) {
                this.EventMap.set(this.data.events[i].extendedProps.uuid, i);
            }
            if (!this.usersColors.get(this.data.events[i].extendedProps.userAccountID) && this.data.events[i].extendedProps.userAccountID !== caldata.userAccountID) {
                console.log("new user detected");
                console.log(this.data.events[i].extendedProps.userAccountID !== caldata.userAccountID);
                this.usersColors.set(this.data.events[i].extendedProps.userAccountID, this.colorWheel.colors[this.colorWheel.index++]);
                if (this.colorWheel.index > this.colorWheel.colors.length) {
                    this.colorWheel.index = 0;
                }
            }

            if (this.data.events[i].extendedProps.userAccountID === this.data.userAccountID) {
                this.data.events[i].color = this.colorWheel.default;
            } else {
                this.data.events[i].color = this.usersColors.get(this.data.events[i].extendedProps.userAccountID);
            }
            //this.addEvent(newEventList[i], 1);
        }
        setTimeout(createCalender, 20);
    }
    addEvent(newEvent, callback){
        console.log("addEventClassMethod");
        newEvent.color = this.usersColors.get(newEvent.extendedProps.userAccountID);
        if (newEvent.extendedProps.userAccountID === this.data.userAccountID) {
            newEvent.color = this.colorWheel.default;
            if (this.EventMap.get(newEvent.extendedProps.uuid) === 0 || this.EventMap.get(newEvent.extendedProps.uuid)) {
                if (JSON.stringify(this.data.events[this.EventMap.get(newEvent.extendedProps.uuid)]) !== JSON.stringify(newEvent)) {
                    console.log(this.data.events[this.EventMap.get(newEvent.extendedProps.uuid)], newEvent)
                    console.log("event changes detected..saving event...")
                    this.saveEvent(newEvent, function(){
                        setTimeout(createCalender, 20);
                    });
                }
                this.data.events[this.EventMap.get(newEvent.extendedProps.uuid)] = newEvent;
                if(callback) callback();
                return;
            }
            console.log("new event detected... adding event to calender...")
            this.EventMap.set(newEvent.extendedProps.uuid, this.data.events.length);
            this.data.events[this.data.events.length] = newEvent;
            this.saveEvent(newEvent, function(){
                setTimeout(createCalender, 20);
            });
        }

        if(callback) callback();
        this.isActive = 0;
    }
    checkEventPermmisions(eventUID) {
        if(this.EventMap.get(eventUID) && this.data.events[this.EventMap.get(eventUID)].extendedProps.userAccountID === this.data.userAccountID ){
            return true;
        }
        return false;
    }
    saveEvent(newEvent, callback) {
        let newPost = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EventData: JSON.stringify(newEvent),
                EventUuid: newEvent.extendedProps.uuid,
                Year: Number(elements.year.val()),
                InstructorHash : newEvent.extendedProps.instructorHash,
                InstitutonId : caldata.institutionID,
                Quarter: Number(elements.quarter.val()),
                Building: newEvent.extendedProps.building,
                Room: newEvent.extendedProps.room,
                ProgramId: Number(elements.dpt.val()),
                ClassQuarterNumber : newEvent.extendedProps.ClassQuarterNumber,
                CoursePrefix: newEvent.extendedProps.coursePrefix + "",
                DeliveryType: newEvent.extendedProps.delivery + "",
                CourseNumber: newEvent.extendedProps.courseNumber + "",
                Section: newEvent.extendedProps.section + "",
                Component: newEvent.extendedProps.component + "",

            })
        }
        console.log(newPost)
        fetch(`/home/SaveEventData`, newPost).then(response => response.json()).then((data) => {
            console.log(data);
            if (callback) callback();
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
}