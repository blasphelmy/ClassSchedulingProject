
function createAnEventPopUp(info, event) {
    $(`
<div id="addEventPopUp" class="card popup">
    <span style="width:20px" id="pclose-UUID" class="close" popupid="addEventPopUp" onclick="closePopUp(this)">&times;</span>
    <div class="container" style="position:relative;top: 20px; left: 25px;">
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label class="control-label"><b>Course Title</b></label><br />
                    <input id="pufTitle" class="form-control-xs" placeholder="Database Design" value="${event?.title||""}"/>
                </div>
                <div class="form-group">
                    <label class="control-label"><b>Class Number (If unknown, leave blank)</b></label><br />
                    <input id="pufClassNumber" class="form-control-xs" placeholder="28964" value="${event?.extendedProps.classNumber || ""}"/>
                </div>
                <div class="form-group">
                    <label class="control-label" ><b>Instructor</b></label><br />
                    <input id="pufInstructor" class="form-control-xs" placeholder="${caldata.lastName}" value="${event?.extendedProps.instructorName || ""}"/>
                </div>
                <div class="form-group">
                    <label class="control-label" ><b>Section</b></label><br />
                    <input id="pufSection" class="form-control-xs" placeholder="1" value="${event?.extendedProps.section || ""}"/>
                </div>
                <div class="form-group">
                    <label class="control-label"><b>Course Number</b></label><br />
                        <select id="pufCourseNumberPrefix" class="custom-select-xs">
                          <option selected>${event?.extendedProps.coursePrefix || elements.dpt.val()}</option >
                        </select>
                    <input id="pufCourseNumber" class="form-control-xs" value="${event?.extendedProps.courseNumber || ""}"/>
                </div>
            </div>
            <div class="col">

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
                        <option selected>${elements.building.val()}</option>
                    </select></span></span>
                    <select id="pufRoomNumber" class="custom-select-xs">
                        <option selected>${elements.room.val()}</option>
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
                            <input id="pufStartTime"type="time" class="form-control-xs" value="${info.startStr?.split("T")[1] ?? info.event._def.extendedProps.startTime}"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">End Time</label><br />
                            <input id="pufEndTime" type="time" class="form-control-xs" value="${info.endStr?.split("T")[1] ?? info.event._def.extendedProps.endTime}"/>
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
        <br />
            <button onclick="finalizeFormDataAndAdd()" style="position:relative; float:right; margin-right: 30px;" class="btn btn-primary">Submit</button>
    </div>
</div>
    `).appendTo("body");
    if (event) {
        let checkboxes = document.getElementsByClassName("pufDaysOfWeek");
        for (let i = 0; i < event.daysOfWeek.length; i++) {
            checkboxes[Number(event.daysOfWeek[i])-1].checked = true
        }
    }
    createDraggableElement(document.getElementById("addEventPopUp"));
    setPopUpPos(document.getElementById("addEventPopUp"), { x: info.jsEvent.clientX, y: info.jsEvent.clientY });
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
        $('.popup')[0].remove();
    } catch {

    }
}