
function createEventMigrationWindow(){
    const _root = document.getElementById("eventMigrationContainer")
    const _eventMigration = ReactDOM.createRoot(_root)
    var _sourceEvents = [];
    var _targetEvents = [];
    function _closeRenderEventMigrationWindow(){
        $("#eventMigration").remove()
    }
    function _returnPrograms(){
        let programs = []
        $("#dptSel > option").each(function(){
            programs.push({
                programName: this.text,
                programID : this.value
            })
        })
        return programs
    }
    function _parseEvents(dataString){
        let newEventList = dataString.split(" _--__- ").filter(e => e !== "")
        let returnEventList = []
        let programID = Number($("#eventMigration_Program").val())
        let defaultColor = function(){
            if(_theme === 1) return "#ffffff"
            return "#000000"
        }()
        for (let i in newEventList) {
            newEventList[i] = JSON.parse(newEventList[i])
            newEventList[i].color = defaultColor
            newEventList[i].color2 = defaultColor
            if (newCalender.usersColors.get(newEventList[i].extendedProps.instructorHash) === undefined) {
                newCalender.usersColors.set(newEventList[i].extendedProps.instructorHash, newCalender.colorWheel.colors[newCalender.colorWheel.index++]);
                if (newCalender.colorWheel.index >= newCalender.colorWheel.colors.length) {
                    newCalender.colorWheel.index = 0;
                }
            }
            if (newEventList[i].extendedProps.instructorHash === userAccountID) {
                newEventList[i].color = newCalender.colorWheel.default;
                newEventList[i].color2 = newCalender.colorWheel.default;
            } else {
                newEventList[i].color = newCalender.usersColors.get(newEventList[i].extendedProps.instructorHash);
                newEventList[i].color2 = newCalender.usersColors.get(newEventList[i].extendedProps.instructorHash);
            }
            console.log(newEventList[i])
            if(newEventList[i].extendedProps.ProgramId === programID) returnEventList.push(newEventList[i])
        }
        return returnEventList
    }
    function _fetchData(panel = "target"){
        let year
        let quarter
        let programID = $("#eventMigration_Program").val()
        if(panel === "source"){
            year = $("#eventMigration_Source_Year").val()
            quarter = $("#eventMigration_Source_Quarter").val()
        }else{
            year = $("#eventMigration_Target_Year").val()
            quarter = $("#eventMigration_Target_Quarter").val()
        }
        console.log(year, quarter, programID);
        if(year === "Select Year" || quarter === "Select Quarter" || !programID) return;

        let filterterms = `${Number(year)},${Number(quarter)}`
        fetch(`/home/fetchEvents?filterterms=${filterterms}`).then(response => response.json()).then((data) => {
            if (data !== "error") {
                let events = _parseEvents(data)
                if(panel === "source"){
                    _sourceEvents = events
                }else{
                    _targetEvents = events
                }
            }
        });
    }
    function _updateSources(){
        _fetchData()
        _fetchData("source")
    }
    let _years = function(){
        let years = [];
        $("#yearSel > option").each(function(){
            years.push(this.value)
        })
        return years;
    }
    function _renderEventMigrationWindow(){
        let programs = _returnPrograms()
        return (
            <div id="eventMigration" class="popup">
                <br></br>
                <div className="row c1" style={{marginBottom: "15px"}}>
                    <div className="col">
                    <div style={{width : "20px" }} className="close" onClick={() => { _closeRenderEventMigrationWindow() }}>x</div>
                        <h3>Migrate Events</h3>
                        <br></br>
                        <select id="eventMigration_Program" onChange={() => _updateSources()}>
                            {programs.map(function(o, i){
                                console.log(o)
                                return (<option value={o.programID}>{o.programName}</option>)
                            })}
                        </select>
                        <br></br>
                        <br></br>
                    </div>
                </div>
                <div className="row c1" style={{marginBottom: "15px"}}>
                    <div className="col-lg-6">
                        <h4>Source Calendar</h4>
                        <select id="eventMigration_Source_Year" style={{marginRight: "5px"}} onChange={() => _fetchData("source")}>
                            {_years().map(function(o, i){
                                console.log(o);
                                return <option>{o}</option>
                            })}
                        </select>
                        <select id="eventMigration_Source_Quarter" onChange={() => _fetchData("source")}>
                            <option selected>Select Quarter</option>
                            <option value="1">Fall</option>
                            <option value="2">Winter</option>
                            <option value="3">Spring</option>
                            <option value="4">Summer</option>
                        </select>
                        <div style={{marginTop: "14px"}}>
                            <ListViewComponent i={_sourceEvents} type="migration" cb={function(){
                                return {
                                        events: _sourceEvents
                                    }
                            }}/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h4>Target Calendar</h4>
                        <select id="eventMigration_Target_Year" style={{marginRight: "5px"}} onChange={() => _fetchData()}>
                            {_years().map(function(o, i){
                                console.log(o);
                                return <option>{o}</option>
                            })}
                        </select>
                        <select id="eventMigration_Target_Quarter" onChange={() => _fetchData()}>
                            <option selected>Select Quarter</option>
                            <option value="1">Fall</option>
                            <option value="2">Winter</option>
                            <option value="3">Spring</option>
                            <option value="4">Summer</option>
                        </select>
                        <div style={{marginTop: "14px"}}>
                            <ListViewComponent style={{marginTop: "10px"}} i={_targetEvents} type="migration" cb={function(){
                                return {
                                        events: _targetEvents
                                    }
                            }}/>
                        </div>
                    </div>
                </div>
                <div className="row c1">
                    <div className="col">
                        <p>Options : </p>
                        <div>
                            <input id="eventMigration_deleteExisting" type={"checkbox"} onChange={() => alert("Selecting this option will delete all events from the targeted calendar")}></input> <label style={{top: "-2px", position: "relative"}}>{" Delete existing events from destination"}</label>
                        </div>    
                        <div>
                            <input id="eventMigration_clearInstructors" type={"checkbox"}></input> <label style={{top: "-2px", position: "relative"}}>{" Clear Instructor Data"}</label>
                        </div>  
                        <div>
                            <input id="eventMigration_clearEventRoomNumbers" type={"checkbox"}></input> <label style={{top: "-2px", position: "relative"}}>{" Clear Events Location/Time Data"}</label>
                        </div> 
                        <div>
                            <input id="eventMigration_clearClassSection" type={"checkbox"}></input> <label style={{top: "-2px", position: "relative"}}>{" Clear Class and Section Numbers"}</label>
                        </div> 
                    </div>
                </div> 
            </div>
        )
    }
    _eventMigration.render(_renderEventMigrationWindow())
}