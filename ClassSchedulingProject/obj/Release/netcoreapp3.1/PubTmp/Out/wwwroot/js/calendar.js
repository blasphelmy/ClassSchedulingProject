﻿class CalenderApp {
    data;
    EventMap; //{eventUUID, index i in data.events[i]}
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
            colors: ("#abdda4 #ee8a29 #66c2a5 #abc71d #3288bd #5e4fa2".split(" ").reverse()),
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
    checkPermissions(event){
        if (event.extendedProps.userAccountID === this.data.userAccountID
            || event.extendedProps.instructorHash === this.data.userAccountID) {
            return true;
        }
        return false;

    }
    parseEvents(eventString) {
        let newEventList = eventString.split(" _--__- ").filter(e => e !== "");
        //console.log(newEventList);
        this.data.events = [];
        for (let i in newEventList) {
            newEventList[i] = JSON.parse(newEventList[i]);
            newEventList[i].overlap = true;
            if (this.usersColors.get(newEventList[i].extendedProps.instructorHash) === undefined) {
                this.usersColors.set(newEventList[i].extendedProps.instructorHash, this.colorWheel.colors[this.colorWheel.index++]);
                if (this.colorWheel.index > this.colorWheel.colors.length) {
                    this.colorWheel.index = 0;
                }
            }
            if (this.checkPermissions(newEventList[i])) {
                newEventList[i].color = this.colorWheel.default;
            } else {
                newEventList[i].color = this.usersColors.get(newEventList[i].extendedProps.instructorHash);
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
            //if usersColor return undefined and 
            if (!this.usersColors.get(this.data.events[i].extendedProps.instructorHash) && this.data.events[i].extendedProps.instructorHash !== caldata.userAccountID) {
                console.log("new user detected");
                this.usersColors.set(this.data.events[i].extendedProps.instructorHash, this.colorWheel.colors[this.colorWheel.index++]);
                if (this.colorWheel.index > this.colorWheel.colors.length) {
                    this.colorWheel.index = 0;
                }
            }

            if (this.checkPermissions(newEventList[i])) {
                this.data.events[i].color = this.colorWheel.default;
            } else {
                this.data.events[i].color = this.usersColors.get(this.data.events[i].extendedProps.instructorHash);
            }
            //this.addEvent(newEventList[i], 1);
        }
        setTimeout(createCalender, 20);
    }
    addEvent(newEvent, callback){
        console.log("addEventClassMethod");
        newEvent.color = this.usersColors.get(newEvent.extendedProps.userAccountID);
        if (this.checkPermissions(newEvent)) {
            newEvent.color = this.colorWheel.default;
            //if(0) returns false
            if (this.EventMap.get(newEvent.extendedProps.uuid) === 0 || this.EventMap.get(newEvent.extendedProps.uuid)) {
                console.log("event changes detected..saving event...")
                this.saveEvent(newEvent, function(){
                    setTimeout(createCalender, 20);
                });
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
        console.log(newEvent);
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
                EventAuthorHash: newEvent.extendedProps.userAccountID || caldata.userAccountID,
                InstitutonId : caldata.institutionID,
                Quarter: Number(elements.quarter.val()),
                Building: newEvent.extendedProps.building + "",
                Room: newEvent.extendedProps.room + "",
                ProgramId: Number(elements.dpt.val()),
                ClassQuarterNumber : Number(newEvent.extendedProps.ClassQuarterNumber),
                CoursePrefix: newEvent.extendedProps.coursePrefix + "",
                DeliveryType: newEvent.extendedProps.delivery + "",
                CourseNumber: newEvent.extendedProps.courseNumber + "",
                Section: newEvent.extendedProps.section + "",
                Component: newEvent.extendedProps.component + "",

            })
        }
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
}