
function ActivateEvent(element) {
    if (caldata.role > 2) return;
    closePopUp();
    let data = JSON.parse(element.attr("data"));
    if(developerMode) console.log(data);
    let info = {

    }
    let event = {
        title: data.Title,

        extendedProps: {
            coursePrefix: data.CoursePrefix,
            courseNumber: data.CourseNumber,
            component: data.Component,
            courseID: data.Id,
            institutionID: data.InstitutionID,
            ProgramId: data.ProgramId,
            ClassQuarterNumber: data.QuarterNumber
        }
    }
    generateFormData(undefined, event);
    createAnEventPopUp(info, event);
}
function editEvent(element) {
    closePopUp();
    let data = JSON.parse(element.attr("data"));
    //goToEvent(data.extendedProps.building, data.extendedProps.room);
    if(developerMode) console.log(data);
    let info = {

    }
    generateFormData({}, data);
    createAnEventPopUp(info, data, source = "eventList");
}

function createAnEventPopUp(info, event, source = "eventTemplates") {
    $(`
<div id="addEventPopUp" class="card popup">
    <span style="width:20px" id="pclose-UUID" class="close" popupid="addEventPopUp" onclick="closePopUp(this)">&times;</span>
    <div class="container" style="position:relative;top: 20px; left: 25px;">
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <label class="control-label"><b>Course Title</b></label><br />
                    <input style="width:100%" id="pufTitle" class="form-control-xs" value="${event?.title || ""}" disabled/>
                </div>
                <div class="form-group">
                    <label class="control-label"><b>Class Number</b></label><br />
                    <input style="width:100%" id="pufClassNumber" class="form-control-xs" value="${event?.extendedProps?.classNumber || ""}"/>
                </div>
                <div class="form-group">
                    <label class="control-label" ><b>Instructor</b></label><br />
                    <select style="width:100%" id="pufInstructor" class="custom-select-xs">
                    <option value="${event.extendedProps.instructorHash || "STAFF"}" selected>${event.extendedProps.instructorName || "STAFF"}</option >
                    ${userList.map(function (user) {
        return `<option value="${user.EventsAuthorId}">${user.FirstName} ${user.LastName}</option>`
    })}
                  <option value="staff">STAFF</option>
                  </select>
                </div>
                <div class="form-group">
                    <label class="control-label" ><b>Section</b></label><br />
                    <input style="width:100%" id="pufSection" class="form-control-xs" value="${event?.extendedProps?.section || ""}"/>
                </div>
                <div class="form-group">
                    <label class="control-label"><b>Course Number</b></label><br />
                        <select id="pufCourseNumberPrefix" class="custom-select-xs" disabled>
                          <option selected>${event?.extendedProps?.coursePrefix}</option >
                          <option value="CSI">CSI</option>
                          <option value="CNT">CNT</option>
                        </select>
                    <input id="pufCourseNumber" class="form-control-xs" value="${event?.extendedProps.courseNumber || ""}" disabled/>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <select id="pufDeliveryType" onchange="pufSelectBoxChange(this)" class="custom-select-xs">
                        <option selected>${event?.extendedProps.delivery || "Delivery"}</option>
                        <option value="Flex">Flex</option>
                        <option value="Online">Online</option>
                        <option value="InPerson">In Person</option>
                        <option value="IndStudy">Ind Study</option>
                    </select>
                    <select id="pufComponent" class="custom-select-xs">
                        <option selected>${event?.extendedProps.component || "Component"}</option>
                        <option value="Lecture">Lecture</option>
                        <option value="Lab">Lab</option>
                    </select>
                    <select id="pufSession" class="custom-select-xs">
                        <option selected>${event?.extendedProps.Session || "Reg"}</option>
                    </select>
                </div>
                <div style="margin-bottom: 20px;">
                    <span><b>Room:</b> <span>

                    <select id="pufBuilding" class="custom-select-xs">
                        <option value="${event.extendedProps.building || ""}" selected>${event.extendedProps.building || ""}</option>
                        <option value="${event.extendedProps.building || elements.building.val()}">${elements.building.val()}</option>
                    </select></span></span>
                    <select id="pufRoomNumber" class="custom-select-xs">
                        <option ${event.extendedProps.room || ""} selected>${event.extendedProps.room || ""}</option>
                        <option value="${elements.room.val()}">${elements.room.val()}</option>
                    </select>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label class="control-label">Start Date</label><br />
                            <input id="pufStartDate" type="date" class="form-control-xs" value="${event?.extendedProps.startDate ?? ""}" />
                        </div>
                        <div class="form-group">
                            <label class="control-label">End Date</label><br />
                            <input id="pufEndDate" type="date" class="form-control-xs" value="${event?.extendedProps.endDate ?? ""}" />
                        </div>

                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label class="control-label">Start Time</label><br />
                            <input id="pufStartTime"type="time" class="form-control-xs" value="${event.extendedProps.startTime ?? info?.startStr?.split("T")[1] ?? info.event?._def.extendedProps.startTime}"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">End Time</label><br />
                            <input id="pufEndTime" type="time" class="form-control-xs" value="${event.extendedProps.endTime ?? info?.endStr?.split("T")[1] ?? info?.event?._def.extendedProps.endTime}"/>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label"><b>Recurs:</b></label><br />
                    <label class="control-label">M</label>
                    <input type="checkbox" value="1" class="form-control-xs pufDaysOfWeek" />
                    <label class="control-label">T</label>
                    <input type="checkbox" value="2" class="form-control-xs pufDaysOfWeek" />
                    <label class="control-label">W</label>
                    <input type="checkbox" value="3" class="form-control-xs pufDaysOfWeek" />
                    <label class="control-label">Th</label>
                    <input type="checkbox" value="4" class="form-control-xs pufDaysOfWeek" />
                    <label class="control-label">F</label>
                    <input type="checkbox" value="5" class="form-control-xs pufDaysOfWeek" />
                </div>
            </div>
        </div>
            ${function () {
            if (source === "eventList") {
                return `<button onclick='finalizeFormDataAndAdd("class-${event.extendedProps.uuid}")' style="position:relative; float:left; margin-right: 10px;" class="btn btn-primary">Submit</button>
                        <button onclick='pufDeleteAction("${event.extendedProps.uuid}")' style="position:relative; float:left; margin-right: 10px;" class="btn btn-danger">Delete</button>`
            } else {
                return `<button onclick='finalizeFormDataAndAdd("course-${event.extendedProps.courseID}")' style="position:relative; float:left; margin-right: 30px;" class="btn btn-primary">Submit</button>`
            }

        }()}
    </div>
</div>
    `).appendTo("body");
    if (event?.daysOfWeek) {
        let checkboxes = document.getElementsByClassName("pufDaysOfWeek");
        for (let i = 0; i < event.daysOfWeek.length; i++) {
            checkboxes[Number(event.daysOfWeek[i]) - 1].checked = true
        }
    }
    centerWindow(document.getElementById("addEventPopUp"));
    if(!/^((?!chrome|android).)*safari/i.test(navigator.userAgent) && window.innerWidth > 699) createDraggableElement(document.getElementById("addEventPopUp"));
    // setPopUpPos(document.getElementById("addEventPopUp"), { x: info.jsEvent.clientX, y: info.jsEvent.clientY });
}
function renderPopUp(event, info) {
    $(`<div id="eventPopUP" class="card popup">
        <div id="ptitle">${event.title}<span id="pclose-UUID" class="close" onclick="closePopUp()">&times;</span></div>
        <div style="font-size:12px">Event Author : <b>${event.extendedProps.eventAuthor}</b></div>
        <div id="ptime">${formatTime(info)} <i>room ${event.extendedProps.building}-${event.extendedProps.room}</i></div>
            <div class="pauthor">
                <div>Recurs : <b>${function () {
            let eventDaysOfWeek = "";
            for (let i = 0; i < event.daysOfWeek.length; i++) {
                switch (event.daysOfWeek[i]) {
                    case "1": eventDaysOfWeek = eventDaysOfWeek + "Mon "; break;
                    case "2": eventDaysOfWeek = eventDaysOfWeek + "Tues "; break;
                    case "3": eventDaysOfWeek = eventDaysOfWeek + "Wed "; break;
                    case "4": eventDaysOfWeek = eventDaysOfWeek + "Thu "; break;
                    case "5": eventDaysOfWeek = eventDaysOfWeek + "Fri "; break;
                }
            }
            return eventDaysOfWeek;

        }()}</b></div>
                <div>Instructor : <b>${event.extendedProps.instructorName}</b></div>
                <div>Component : <b>${event.extendedProps.component}</b></div>
                <div>Delivery : <b>${event.extendedProps.delivery}</b></div>
                <div>From : <b>${event.extendedProps.startDate}</b></div >
                <div>To : <b>${event.extendedProps.endDate}</b></div >
            </div>
        <hr />
        <div  class="pauthor">
            <div>Course : <b>${event.extendedProps.coursePrefix + "-" + event.extendedProps.courseNumber} Section # ${event.extendedProps.section}, ${event.extendedProps.Session}</b> </div>
            <div>Class # <b>${event.extendedProps.classNumber}</b></div>
        </div>
    </div>`).appendTo("body");
     createDraggableElement(document.getElementById("eventPopUP"));
}
function createPopUp(info) {
    closePopUp();
    let event = newCalender.data.events[newCalender.EventMap.get(info.event._def.extendedProps.uuid)];
    renderPopUp(event, info);
    let popupElement = document.getElementById("eventPopUP");
    setPopUpPos(popupElement, { x: info.jsEvent.clientX, y: info.jsEvent.clientY });
}
function setPopUpPos(popupElement, mouseClickData) {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let popUpElementWidth = popupElement.offsetWidth;
    let popUpElementHeight = popupElement.offsetHeight;
    popupElement.style.setProperty("top", mouseClickData.y + "px");
    popupElement.style.setProperty("left", mouseClickData.x + "px");
    if (mouseClickData.x > (screenWidth - popUpElementWidth)) {
        popupElement.style.setProperty("left", (mouseClickData.x - popUpElementWidth) + "px");
    }
    if (screenHeight - mouseClickData.y < (popUpElementHeight)) {
        popupElement.style.setProperty("top", (mouseClickData.y - popUpElementHeight) + "px");
    }
}
var closePopUp = (e) => {
    try {
        $('.popup').map(function (i, e) {
            if(developerMode) console.log(e);
            e.remove();
        });
    } catch {

    }
}
function generateFormData(info, event) {
    newEvent = {
    title: function () {
        let e = $("#pufTitle");
        if (e.val()) {
            return e.val();
        } else {
            return null;
        }
    },
    start: info?.startStr,
    end: info?.endStr,
    overlap: true,
    color: "#cd3",
    daysOfWeek: function () {
        let elementCheckboxes = document.getElementsByClassName("pufDaysOfWeek");
        let daysofweek = [];
        for (e of elementCheckboxes) {
            if (e.checked) {
                daysofweek.push(e.value);
            }
        }
        return daysofweek;
    },
        extendedProps: {
            uuid: info?.event?._def?.extendedProps.uuid ?? event?.extendedProps?.uuid ?? create_UUID(),
            userAccountID: event?.extendedProps?.userAccountID || newCalender.data.userAccountID,
        instructorHash: function () {
            let e = $("#pufInstructor");
            if (e.val()) {
                return [e.val(), $("#pufInstructor option:selected").text()];
            }
            return ["", ""];
        },
        eventAuthor: newCalender.data.firstName + " " + newCalender.data.lastName,
        classNumber: function () {
            let e = $("#pufClassNumber");
            try {
                Number(e.val());
                return Number(e.val());
            } catch {
                return null;
            }
        },
        section: function () {
            let e = $("#pufSection");
            if (e.val()) {
                return e.val();
            } else {
                return null;
            }
        },
        coursePrefix: function(){
            return $("#pufCourseNumberPrefix").val();
        },
        courseNumber: function () {
            let e = $("#pufCourseNumber");
            try {
                Number(e.val());
                return Number(e.val());
            } catch {
                return null;
            }
        },
        building: function(){
            return $("#pufBuilding").val();
        },
        room: function(){
            return $("#pufRoomNumber").val();
        },
        component: function () {
            let e = $("#pufComponent");
            if (e.val() !== "Component") {
                return e.val();
            } else {
                return null;
            }
        },
        delivery: function () {
            let e = $("#pufDeliveryType");
            if (e.val() !== "Delivery") {
                return e.val();
            } else {
                return null;
            }
        },
        Session: function () {
            return $("#pufSession").val();
        },
        startDate: function () {
            return $("#pufStartDate").val();
        },
        endDate: function () {
            return $("#pufEndDate").val();
        },
        startTime: function () {
            return $("#pufStartTime").val();
        },
        endTime: function () {
            return $("#pufEndTime").val();
        }, 
        ProgramId : event.extendedProps.ProgramId,
        ClassQuarterNumber : event.extendedProps.ClassQuarterNumber
        
    }
}
}
function finalizeFormDataAndAdd(id) {
    let finalizedEvent = JSON.parse(JSON.stringify(newEvent));
    // if(developerMode) console.log(finalizedEvent);
    if (newEvent.title() &&
        newEvent.extendedProps.courseNumber() &&
        newEvent.extendedProps.coursePrefix() &&
        newEvent.extendedProps.component()) {

        finalizedEvent.title = newEvent.title();
        finalizedEvent.daysOfWeek = newEvent.daysOfWeek();
        finalizedEvent.extendedProps.instructorName = newEvent.extendedProps?.instructorHash()[1];
        finalizedEvent.extendedProps.userAccountID = newEvent.extendedProps.userAccountID;
        finalizedEvent.extendedProps.instructorHash = newEvent.extendedProps?.instructorHash()[0],
        finalizedEvent.extendedProps.classNumber = newEvent.extendedProps.classNumber();
        finalizedEvent.extendedProps.Session = newEvent.extendedProps.Session();
        finalizedEvent.extendedProps.section = newEvent.extendedProps.section();
        finalizedEvent.extendedProps.courseNumber = newEvent.extendedProps.courseNumber();
        finalizedEvent.extendedProps.coursePrefix = newEvent.extendedProps.coursePrefix();
        finalizedEvent.extendedProps.component = newEvent.extendedProps.component();
        finalizedEvent.extendedProps.delivery = newEvent.extendedProps.delivery();
        finalizedEvent.extendedProps.startTime = newEvent.extendedProps.startTime();
        finalizedEvent.extendedProps.endTime = newEvent.extendedProps.endTime();
        finalizedEvent.extendedProps.startDate = newEvent.extendedProps.startDate();
        finalizedEvent.extendedProps.endDate = newEvent.extendedProps.endDate();
        finalizedEvent.extendedProps.room = newEvent.extendedProps.room();
        finalizedEvent.extendedProps.building = newEvent.extendedProps.building();
        finalizedEvent.extendedProps.ClassQuarterNumber = newEvent.extendedProps.ClassQuarterNumber;
        finalizedEvent.extendedProps.ProgramId = newEvent.extendedProps.ProgramId,

        finalizedEvent.groupId = finalizedEvent.extendedProps.uuid;
        finalizedEvent.startTime = finalizedEvent.extendedProps.startTime;
        finalizedEvent.endTime = finalizedEvent.extendedProps.endTime;

        if (id) {
            let e = JSON.parse($(`#${id}`).attr("data"));
            if (e.extendedProps) {
                finalizedEvent.extendedProps.programVersion = e.extendedProps.programVersion;
                finalizedEvent.extendedProps.courseID = e.extendedProps.courseID;
                finalizedEvent.extendedProps.ClassQuarterNumber = e.extendedProps.ClassQuarterNumber;
                finalizedEvent.extendedProps.ProgramId = e.extendedProps.ProgramId;
            } else {
                finalizedEvent.extendedProps.ProgramId = e.ProgramId;
                finalizedEvent.extendedProps.courseID = e.Id;
            }
        };
        // if(developerMode) console.log("finalized", finalizedEvent);
        newCalender.addEvent(finalizedEvent, closePopUp);
    }
}