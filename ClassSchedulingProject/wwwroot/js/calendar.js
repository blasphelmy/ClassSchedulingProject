class CalenderApp {
    data;
    EventMap; //{eventUUID, index i in data.events[i]}
    colorWheel;
    usersColors;
    isActive;
    init;
    UsersEventsMap;
    constructor(data) {
        this.init = 0;
        this.isActive = 0;
        this.usersColors = new Map();
        this.EventMap = new Map();
        this.colorWheel = {
            //colors: ("#6a7b12 #29949b #8d77f3 #883bac #5f24f6 #ee8a29 #007acf".split(" ")),
            colors: gColors.reverse(),
            default: "#ab4e68",
            locked: "",
            index: 0
        }
        this.data = {};
        this.data.firstName = data.firstName;
        this.data.lastName = data.lastName;
        this.data.events = [];
        this.UsersEventsMap = new Map();
        if(developerMode) console.log(this.data);
        if (data.events) {
            this.parseEvents(data.events);
        }
    }
    checkPermissions(event){
        if(event.extendedProps.ProgramId !== caldata.ProgramID) return false
        if(role < 3) return true;
        if (event.extendedProps.ProgramId === caldata.ProgramID && (event.extendedProps.userAccountID === userAccountID
            || event.extendedProps.instructorHash === userAccountID)) {
            return true;
        }
        return false;
    }
    sortEvents(newEventList){
        for(let i in newEventList){
            newEventList[i] = JSON.parse(newEventList[i]);
            newEventList[i] = checkEventSanity(newEventList[i]);
        }
        newEventList = newEventList.sort(function(a, b){
            if (a.extendedProps.instructorHash === b.extendedProps.instructorHash){
                return a.title < b.title ? -1 : 1
              } else {
                return a.extendedProps.instructorName < b.extendedProps.instructorName ? -1 : 1
              }
        })
        return newEventList;
    }
    parseEvents(eventString) {
        if(developerMode) console.log(eventString);
        let newEventList = eventString.split(" _--__- ").filter(e => e !== "");
        newEventList = this.sortEvents(newEventList);
        this.data.events = [];
        this.UsersEventsMap = new Map();
        for (let i in newEventList) {
            //newEventList[i] = JSON.parse(newEventList[i]);
            //newEventList[i] = checkEventSanity(newEventList[i]);
            newEventList[i].overlap = true;
            if (this.usersColors.get(newEventList[i].extendedProps.instructorHash) === undefined) {
                this.usersColors.set(newEventList[i].extendedProps.instructorHash, this.colorWheel.colors[this.colorWheel.index++]);
                if (this.colorWheel.index >= this.colorWheel.colors.length) {
                    this.colorWheel.index = 0;
                }
            }
            if (newEventList[i].extendedProps.instructorHash === userAccountID) {
                newEventList[i].color = this.colorWheel.default;
            } else {
                newEventList[i].color = this.usersColors.get(newEventList[i].extendedProps.instructorHash);
            }
            if(newEventList[i].extendedProps.ProgramId !== caldata.ProgramID) newEventList[i].color = "#444444"
            if(_isActive === 0 && newEventList[i].extendedProps.ProgramId === caldata.ProgramID) newEventList[i].color = "#a36475"
            newEventList[i].color2 = newEventList[i].color;
            this.data.events.push(newEventList[i]);
            this.EventMap.set(this.data.events[i].extendedProps.uuid, i);
            this.setUserEventMap(this.data.events[i]);
        }
        this.checkForConflicts();
        this.init = 1;
    }
    updateEvents(eventString) {
        let newEventList = eventString.split(" _--__- ").filter(e => e !== "");
        //if(developerMode) console.log(newEventList)
        newEventList = this.sortEvents(newEventList);
        this.colorWheel.index = 0;
        this.UsersEventsMap = new Map();
        this.data.events = [];
        for (let i in newEventList) {
            // newEventList[i] = JSON.parse(newEventList[i]);
            // newEventList[i] = checkEventSanity(newEventList[i]);
            newEventList[i].overlap = true;
            this.data.events[i] = newEventList[i];
            if (this.EventMap.get(this.data.events[i]) != i) {
                this.EventMap.set(this.data.events[i].extendedProps.uuid, i);
            }
            //if usersColor return undefined and 
            if (!this.usersColors.get(this.data.events[i].extendedProps.instructorHash) && this.data.events[i].extendedProps.instructorHash !== userAccountID) {
                if(developerMode) console.log("new user detected");
                this.usersColors.set(this.data.events[i].extendedProps.instructorHash, this.colorWheel.colors[this.colorWheel.index++]);
                if (this.colorWheel.index >= this.colorWheel.colors.length) {
                    this.colorWheel.index = 0;
                }
            }

            if (newEventList[i].extendedProps.instructorHash === userAccountID) {
                this.data.events[i].color = this.colorWheel.default;
            } else {
                this.data.events[i].color = this.usersColors.get(this.data.events[i].extendedProps.instructorHash);
            }
            if(newEventList[i].extendedProps.ProgramId !== caldata.ProgramID) newEventList[i].color = "#444444";
            if(_isActive === 0 && newEventList[i].extendedProps.ProgramId === caldata.ProgramID) newEventList[i].color = "#a36475"
            //this.addEvent(newEventList[i], 1);
            newEventList[i].color2 = newEventList[i].color;
            this.setUserEventMap(this.data.events[i]);
        }
        this.checkForConflicts();
        updateWarningDisplayIfExist();
        setTimeout(createCalender, 20);
    }
    checkForConflicts(){

        for(let eventA of this.data.events){
            for(let eventB of this.data.events){
                eventA.extendedProps.errors = new Array();
                eventB.extendedProps.errors = new Array();
            }
        }

        var checkedCombo = new Map();

        for(let eventA of this.data.events){
            for(let eventB of this.data.events){
                //prevent same event from checking each other
                if(eventA.extendedProps.uuid === eventB.extendedProps.uuid) continue;

                //flush out unscheduled/unfinished event pairs
                if(!eventA.extendedProps.room
                || !eventA.extendedProps.building
                || !eventB.extendedProps.room
                || !eventB.extendedProps.building
                || !eventA.extendedProps.startTime
                || !eventA.extendedProps.endTime
                || !eventB.extendedProps.startTime
                || !eventB.extendedProps.endTime
                || !eventA.daysOfWeek.length
                || !eventB.daysOfWeek.length) continue;

                //prevent previously seen combos from rechecking 
                if(checkedCombo.get(eventA.extendedProps.uuid+eventB.extendedProps.uuid) || checkedCombo.get(eventB.extendedProps.uuid+eventA.extendedProps.uuid)) continue;
                checkedCombo.set(eventA.extendedProps.uuid + eventB.extendedProps.uuid, true); //probably wont need this
                checkedCombo.set(eventB.extendedProps.uuid + eventA.extendedProps.uuid, true);


                const checkDayOverlay = function(eventA, eventB){
                    for(let dayA of eventA.daysOfWeek){
                        for(let dayB of eventB.daysOfWeek){
                            if(dayA === dayB) return true;
                        }
                    }
                    return false;
                }
                
                //if events never falls on the same day we skip checking
                if(!checkDayOverlay(eventA, eventB)) continue;

                const checkitsConflict_offSet = function(itsA, itsB, offset = (1000 * 60 * 15)){
                    if((itsA.start.getTime() <= itsB.start.getTime() && itsB.start.getTime() <= (itsA.end.getTime() + offset))
                    || (itsB.start.getTime() <= itsA.start && itsA.start.getTime() <= (itsB.end.getTime() + offset))) return true;
                    return false;
                }

                let defaultColor = `#dfd29e`
                if(_theme === 2) defaultColor = "#555555"

                const colorA = `rgb(${HEXtoRGB(eventA.color, colorFilterBrightness, _colorBrightnessVal).join(",")})`;
                const colorB = `rgb(${HEXtoRGB(eventB.color, colorFilterBrightness, _colorBrightnessVal).join(",")})`;
                const roomA = eventA.extendedProps.building + "-" + eventA.extendedProps.room;
                const roomB = eventB.extendedProps.building + "-" + eventB.extendedProps.room;
                const eventALink = `"<span class='underlineText' onclick="goToEvent('${eventA.extendedProps.building}', '${eventA.extendedProps.room}')" style='color:${defaultColor}'>${roomA}</span>"`
                const eventBLink = `"<span class='underlineText' onclick="goToEvent('${eventB.extendedProps.building}', '${eventB.extendedProps.room}')" style='color:${defaultColor}'>${roomB}</span>"`
                const eventATime = `<span style="color:${defaultColor}">"${formatTimeString([eventA.extendedProps.startTime, eventA.extendedProps.endTime])}"</span>`
                const eventBTime = `<span style="color:${defaultColor}">"${formatTimeString([eventB.extendedProps.startTime, eventB.extendedProps.endTime])}"</span>`

                let itsA = {
                    start : new Date("01 Jan 1970 " + eventA.extendedProps.startTime),
                    end : new Date("01 Jan 1970 " + eventA.extendedProps.endTime),
                }
                let itsB = {
                    start : new Date("01 Jan 1970 " + eventB.extendedProps.startTime),
                    end : new Date("01 Jan 1970 " + eventB.extendedProps.endTime)
                }
                let override1 = false;
                let override2 = false;
                let override1A = false;
                let override2A = false;
                
                //if events fall in the same room, check for time conflicts
                if(eventA.extendedProps.room === eventB.extendedProps.room && eventA.extendedProps.building === eventB.extendedProps.building){
                        //check for tangible and concrete time conflicts
                        //if event are potentially taught on the same days and if they overlap
                        if(checkitsConflict_offSet(itsA, itsB, 0)) {
                                 eventA.extendedProps.errors.push(`Time conflict with <span style="color:${colorB}">"${eventB.title}"</span> in room ${eventBLink} from ${eventBTime}`)
                                 eventB.extendedProps.errors.push(`Time conflict with <span style="color:${colorA}">"${eventA.title}"</span> in room ${eventBLink} from ${eventATime}`)
                                 override1A = true;
                        }
                        else if(checkitsConflict_offSet(itsA, itsB)) {
                            eventA.extendedProps.warnings.push(`<span style="color:${colorB}">"${eventB.title}"</span> from ${eventBTime} in this room ${eventBLink} starts/ends within 15 minutes of this event..`)
                            eventB.extendedProps.warnings.push(`<span style="color:${colorA}">"${eventA.title}"</span> from ${eventATime} in this room ${eventALink} starts/ends within 15 minutes of this event..`)
                            override1 = true;
                        }
                }
                //if events belong to the same program and have the same quarter number, check for time conflicts
                if(eventA.extendedProps.ClassQuarterNumber === eventB.extendedProps.ClassQuarterNumber 
                    && eventA.extendedProps.ProgramId == eventB.extendedProps.ProgramId){
                        //if event are potentially taught on the same days and if they overlap
                        if(!override1A && checkitsConflict_offSet(itsA, itsB, 0)) {
                            eventA.extendedProps.errors.push(`Conflict with <span style="color:${colorB}">"${eventB.title}"</span> in room ${eventBLink} from ${eventBTime} - classes meant to be taught together are overlapping`)
                            eventB.extendedProps.errors.push(`Conflict with <span style="color:${colorA}">"${eventA.title}"</span> in room ${eventALink} from ${eventATime} - classes meant to be taught together are overlapping`)
                            override2A = true;
                        }
                        else if(!override1 && !override1A && checkitsConflict_offSet(itsA, itsB)) {
                            eventA.extendedProps.warnings.push(`<span style="color:${colorB}">"${eventB.title}"</span> in room ${eventBLink} from ${eventBTime} starts within 15 minutes of this event. These two courses are meant to be taught together during each quarter`)
                            eventB.extendedProps.warnings.push(`<span style="color:${colorA}">"${eventA.title}"</span> in room ${eventALink} from ${eventATime} starts within 15 minutes of this event. These two courses are meant to be taught together during each quarter`)
                            override2 = true;
                        }
                }

                //always check two events if the same instructor is teaching
                if(eventA.extendedProps.instructorHash === eventB.extendedProps.instructorHash){
                    //check for tangible and concrete time conflicts
                    //if event are potentially taught on the same days and if they overlap
                    if(!override2A && !override1A && checkitsConflict_offSet(itsA, itsB, 0)) {
                        eventA.extendedProps.errors.push(`<span style="color:${colorA}">${eventA.extendedProps.instructorName}</span> is already scheduled to teach <span style="color:${colorB}">"${eventB.title}"</span> in room ${eventBLink} from ${eventBTime} during this time`)
                        eventB.extendedProps.errors.push(`<span style="color:${colorB}">${eventB.extendedProps.instructorName}</span> is already scheduled to teach <span style="color:${colorA}">"${eventA.title}"</span> in room ${eventALink} from ${eventATime} during this time`)
                    }
                    else if((!override2 && !override1 && !override2A && !override1A) && checkitsConflict_offSet(itsA, itsB)) {
                        eventA.extendedProps.warnings.push(`This instructor is already teaching <span style="color:${colorB}">"${eventB.title}"</span> in room ${eventBLink} from ${eventBTime} starts/ends within 15 minutes of this event.`)
                        eventB.extendedProps.warnings.push(`This instructor is already teaching <span style="color:${colorA}">"${eventA.title}"</span> in room ${eventALink} from ${eventATime} starts/ends within 15 minutes of this event.`)
                    }
                }
            }
        }
    }
    setUserEventMap(event){
        if(event.extendedProps.ProgramId !== Number(elements.dpt.val())) return
        if(event.extendedProps.instructorHash === "STAFF" || event.extendedProps.instructorHash === "staff") event.extendedProps.instructorHash = "STAFF"
        if(!this.UsersEventsMap.get(event.extendedProps.instructorHash)){
            this.UsersEventsMap.set(event.extendedProps.instructorHash, [])
        }
        let thisUsersEvents = this.UsersEventsMap.get(event.extendedProps.instructorHash);
        thisUsersEvents.push(event);
        this.UsersEventsMap.set(event.extendedProps.instructorHash, thisUsersEvents)
    }
    addEvent(newEvent, callback){
        //check if calendar state is active. front end check. server wont accept event if bypassed for some reason
        if(_isActive === 0) return $("#s3").text("calendar is locked!");
        if(developerMode) console.log("addEventClassMethod");
        newEvent.color = this.usersColors.get(newEvent.extendedProps.userAccountID);
        if (this.checkPermissions(newEvent)) {
            newEvent.color = this.colorWheel.default;
            //if(0) returns false
            if (this.EventMap.get(newEvent.extendedProps.uuid) === 0 || this.EventMap.get(newEvent.extendedProps.uuid)) {
                if(developerMode) console.log("event changes detected..saving event...")
                this.saveEvent(newEvent, function(){
                    setTimeout(createCalender, 20);
                });
                this.data.events[this.EventMap.get(newEvent.extendedProps.uuid)] = newEvent;
                if(callback) callback();
                return;
            }
            if(developerMode) console.log("new event detected... adding event to calender...")
            this.EventMap.set(newEvent.extendedProps.uuid, this.data.events.length);
            this.data.events[this.data.events.length] = newEvent;
            this.saveEvent(newEvent, function(){
                setTimeout(createCalender, 20);
            });
        }else{
            $("#s3").text("not authorized to make changes to this event")
        }

        if(callback) callback();
        this.isActive = 0;
    }
    //an appendix
    // checkEventPermmisions(eventUID) {
    //     if(this.EventMap.get(eventUID) && this.data.events[this.EventMap.get(eventUID)].extendedProps.userAccountID === this.data.userAccountID ){
    //         return true;
    //     }
    //     return false;
    // }
    saveEvent(newEvent, callback) {
        if(_isActive === 0) return $("#s3").text("calendar is locked!");
        newEvent = checkEventSanity(newEvent);
        if(!this.checkPermissions(newEvent)){
            if(newEvent.extendedProps.ProgramId !== caldata.ProgramID) {
                $("#s3").text(`Error saving event : event not in currently selected program`)
            }else{
                $("#s3").text(`not authorized to make changes to this event!`)
            }
            return fetchData();
        } 
        $("#s3").text(`saving event ${newEvent.extendedProps.uuid}`);
        let newPost = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EventData: JSON.stringify(newEvent),
                EventUuid: newEvent.extendedProps.uuid,
                Year: Number(newEvent.extendedProps.Year),
                InstructorHash : newEvent.extendedProps.instructorHash,
                EventAuthorHash: newEvent.extendedProps.userAccountID || userAccountID,
                InstitutonId : caldata.institutionID,
                Quarter: Number(newEvent.extendedProps.Quarter),
                Building: newEvent.extendedProps.building + "",
                Room: newEvent.extendedProps.room + "",
                ProgramId: Number(newEvent.extendedProps.ProgramId),
                ClassQuarterNumber : Number(newEvent.extendedProps.ClassQuarterNumber),
                CoursePrefix: newEvent.extendedProps.coursePrefix + "",
                DeliveryType: newEvent.extendedProps.delivery + "",
                CourseNumber: newEvent.extendedProps.courseNumber + "",
                Section: newEvent.extendedProps.section + "",
                Component: newEvent.extendedProps.component + "",
                CourseId: Number(newEvent.extendedProps.courseID)
            }).replace(/_--__-/gm, "")
        }
        if(new RegExp(/ _--__- /gm).test(newPost.body)){
            $("#s3").text("Invalid token stream detected...");
            return;
        }
        fetch(`/home/SaveEventData`, newPost).then(response => response.json()).then((data) => {
           if(data === 1 || data === 2){
                if(data === 1) $("#s3").text(`${newEvent.title} added!`); 
                else $("#s3").text(`${newEvent.title} saved!`);
           }else{
                $("#s3").text(`error saving event, server responded with : ${data}`);
           }
           if (callback) callback();
        });
    }
    deleteEvent(uuid) {
        if(_isActive === 0) return $("#s3").text("calendar is locked!");
        if (this.data.events[this.EventMap.get(uuid)] && this.data.events[this.EventMap.get(uuid)].extendedProps.userAccountID === userAccountID) {
            $("#s3").text("deleting event...")
            fetch(`/home/deleteEvent?uuid=${uuid}`).then(response => response.json()).then((data) => {
                if (data === 1) {
                    let title = this.data.events[this.EventMap.get(uuid)].title;
                    this.data.events = this.data.events.splice(Number(this.EventMap.get(uuid)), 1);
                    fetchData(new Object, function(){
                        $("#s3").text(`${title} deleted...`);
                    });
                }
            });
        }else{
            $("#s3").text(`not authorized to delete this event ${this.data.events[this.EventMap.get(uuid)].title}`)
        }
    }
}