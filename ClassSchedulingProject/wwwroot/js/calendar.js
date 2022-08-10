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
            colors: ("#6a7b12 #29949b #8d77f3 #883bac #5f24f6 #ee8a29 #007acf".split(" ")),
            default: "#ab4e68",
            locked: "",
            index: 0
        }
        this.data = {};
        this.data.firstName = data.firstName;
        this.data.lastName = data.lastName;
        this.data.userAccountID = data.userAccountID;
        this.data.userAccountLevel = data.userAccountLevel;
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
        if (event.extendedProps.ProgramId === caldata.ProgramID && (event.extendedProps.userAccountID === this.data.userAccountID
            || event.extendedProps.instructorHash === this.data.userAccountID)) {
            return true;
        }
        return false;
    }
    parseEvents(eventString) {
        if(developerMode) console.log(eventString);
        let newEventList = eventString.split(" _--__- ").filter(e => e !== "");
        this.data.events = [];
        this.UsersEventsMap = new Map();
        for (let i in newEventList) {
            newEventList[i] = JSON.parse(newEventList[i]);
            newEventList[i] = checkEventSanity(newEventList[i]);
            newEventList[i].overlap = true;
            if (this.usersColors.get(newEventList[i].extendedProps.instructorHash) === undefined) {
                this.usersColors.set(newEventList[i].extendedProps.instructorHash, this.colorWheel.colors[this.colorWheel.index++]);
                if (this.colorWheel.index >= this.colorWheel.colors.length) {
                    this.colorWheel.index = 0;
                }
            }
            if (this.checkPermissions(newEventList[i])) {
                newEventList[i].color = this.colorWheel.default;
            } else {
                newEventList[i].color = this.usersColors.get(newEventList[i].extendedProps.instructorHash);
            }
            if(newEventList[i].extendedProps.ProgramId !== caldata.ProgramID) newEventList[i].color = "#444"
            if(_isActive === 0 && newEventList[i].extendedProps.ProgramId === caldata.ProgramID) newEventList[i].color = "#a36475"
            this.data.events.push(newEventList[i]);
            this.EventMap.set(this.data.events[i].extendedProps.uuid, i);
            this.setUserEventMap(this.data.events[i]);
        }
        this.checkForConflicts();
        this.init = 1;
    }
    updateEvents(eventString) {
        let newEventList = eventString.split(" _--__- ").filter(e => e !== "");
        //if(developerMode) console.log(newEventList);
        this.colorWheel.index = 0;
        this.UsersEventsMap = new Map();
        this.data.events = [];
        for (let i in newEventList) {
            newEventList[i] = JSON.parse(newEventList[i]);
            newEventList[i] = checkEventSanity(newEventList[i]);
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

            if (this.checkPermissions(newEventList[i])) {
                this.data.events[i].color = this.colorWheel.default;
            } else {
                this.data.events[i].color = this.usersColors.get(this.data.events[i].extendedProps.instructorHash);
            }
            if(newEventList[i].extendedProps.ProgramId !== caldata.ProgramID) newEventList[i].color = "#444";
            if(_isActive === 0 && newEventList[i].extendedProps.ProgramId === caldata.ProgramID) newEventList[i].color = "#a36475"
            //this.addEvent(newEventList[i], 1);
            this.setUserEventMap(this.data.events[i]);
        }
        this.checkForConflicts();
        setTimeout(createCalender, 20);
    }
    checkForConflicts(){
        var checkedCombo = new Map();

        for(let eventA of this.data.events){
            for(let eventB of this.data.events){
                eventA.extendedProps.errors = new Array();
                eventB.extendedProps.errors = new Array();
            }
        }

        for(let eventA of this.data.events){
            for(let eventB of this.data.events){
                //prevent same event from checking each other
                if(eventA.extendedProps.uuid === eventB.extendedProps.uuid) continue;

                //prevent previously seen combos from rechecking 
                if(checkedCombo.get(eventA.extendedProps.uuid+eventB.extendedProps.uuid) || checkedCombo.get(eventB.extendedProps.uuid+eventA.extendedProps.uuid)) continue;
                checkedCombo.set(eventA.extendedProps.uuid + eventB.extendedProps.uuid, true); //probably wont need this
                // checkedCombo.set(eventB.extendedProps.uuid + eventA.extendedProps.uuid, true);

                //flush out unscheduled/unfinished event pairs
                if(eventA.extendedProps.room === "" 
                || eventA.extendedProps.building === ""
                || eventB.extendedProps.room === ""
                || eventB.extendedProps.building === ""
                || eventA.extendedProps.startTime === ""
                || eventA.extendedProps.endTime === ""
                || eventB.extendedProps.startTime === ""
                || eventB.extendedProps.endTime === ""
                || eventA.daysOfWeek.length === 0
                || eventB.daysOfWeek.length === 0) continue;

                let checkDayOverlay = function(eventA, eventB){
                    for(let dayA of eventA.daysOfWeek){
                        for(let dayB of eventB.daysOfWeek){
                            if(dayA === dayB) return true;
                        }
                    }
                    return false;
                }
                let checkitsConflict = function(itsA, itsB){
                    if((itsA.start < itsB.start && itsB.start < itsA.end)
                    || (itsB.start < itsA.start && itsA.start < itsB.end)) return true;
                    return false;
                }
                let itsA = {
                    start : new Date("01 Jan 1970 " + eventA.extendedProps.startTime),
                    end : new Date("01 Jan 1970 " + eventA.extendedProps.endTime)
                }
                let itsB = {
                    start : new Date("01 Jan 1970 " + eventB.extendedProps.startTime),
                    end : new Date("01 Jan 1970 " + eventB.extendedProps.endTime)
                }
                //if events fall in the same room, check for time conflicts
                if(eventA.extendedProps.room === eventB.extendedProps.room && eventA.extendedProps.building === eventB.extendedProps.building){
                        let thisRoom = eventA.extendedProps.building + "-" + eventB.extendedProps.room;
                        //check for tangible and concrete time conflicts
                        //if event are potentially taught on the same days and if they overlap
                        if(checkDayOverlay(eventA, eventB) && checkitsConflict(itsA, itsB)) {
                                 eventA.extendedProps.errors.push(`Time conflict with ${eventB.title} in room ${thisRoom}`)
                                 eventB.extendedProps.errors.push(`Time conflict with ${eventA.title} in room ${thisRoom}`)
                        }
                //if events belong to the same program and have the same quarter number, check for time conflicts
                }
                // console.log(eventA.title + " |  " + eventB.title)
                // console.log(eventA.extendedProps.ProgramId == eventB.extendedProps.ProgramId)
                if(eventA.extendedProps.ClassQuarterNumber === eventB.extendedProps.ClassQuarterNumber 
                    && eventA.extendedProps.ProgramId == eventB.extendedProps.ProgramId){
                        let roomA = eventA.extendedProps.building + "-" + eventA.extendedProps.room;
                        let roomB = eventB.extendedProps.building + "-" + eventB.extendedProps.room;
                        //check for tangible and concrete time conflicts
                        //if event are potentially taught on the same days and if they overlap
                        if(checkDayOverlay(eventA, eventB) && checkitsConflict(itsA, itsB)) {
                                    eventA.extendedProps.errors.push(`Conflict with ${eventB.title} in room ${roomB} - classes meant to be taught together are overlapping`)
                                    eventB.extendedProps.errors.push(`Conflict with ${eventA.title} in room ${roomA} - classes meant to be taught together are overlapping`)
                        }
                }

                //always check two events if the same instructor is teaching
                if(eventA.extendedProps.instructorHash === eventB.extendedProps.instructorHash){
                    let roomA = eventA.extendedProps.building + "-" + eventA.extendedProps.room;
                    let roomB = eventB.extendedProps.building + "-" + eventB.extendedProps.room;
                    //check for tangible and concrete time conflicts
                    //if event are potentially taught on the same days and if they overlap
                    if(checkDayOverlay(eventA, eventB) && checkitsConflict(itsA, itsB)) {
                                eventA.extendedProps.errors.push(`This instructor is already scheduled to teach a course in room ${roomB} during this time`)
                                eventB.extendedProps.errors.push(`This instructor is already scheduled to teach a course in room  ${roomA} during this time`)
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
           this.checkForConflicts();
        });
    }
    deleteEvent(uuid) {
        if(_isActive === 0) return $("#s3").text("calendar is locked!");
        if (this.data.events[this.EventMap.get(uuid)] && this.data.events[this.EventMap.get(uuid)].extendedProps.userAccountID === this.data.userAccountID) {
            $("#s3").text("deleting event...")
            fetch(`/home/deleteEvent?uuid=${uuid}`).then(response => response.json()).then((data) => {
                if (data === 1) {
                    let title = this.data.events[this.EventMap.get(uuid)].title;
                    this.data.events = this.data.events.splice(Number(this.EventMap.get(uuid)), 1);
                    fetchData(new Object, function(){
                        $("#s3").text(`${title} deleted...`)
                        this.checkForConflicts();
                    });
                }
            });
        }else{
            $("#s3").text(`not authorized to delete this event ${this.data.events[this.EventMap.get(uuid)].title}`)
        }
    }
}