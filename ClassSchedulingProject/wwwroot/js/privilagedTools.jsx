
function createEventMigrationWindow(){
    const _root = document.getElementById("eventMigrationContainer")
    const _eventMigration = ReactDOM.createRoot(_root)
    var _sourceEvents = []
    var _targetEvents = []
    function _closeRenderEventMigrationWindow(){
        $("#eventMigration").remove()
    }
    function _parseEvents(dataString){
        let newCalender = new CalenderApp(caldata);
        newCalender.parseEvents(dataString);
        return newCalender.data.events;
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
    function _migrateEvents(){
        let option_a = $("#eventMigration_deleteExisting").prop('checked');
        let option_b = $("#eventMigration_clearInstructors").prop('checked');
        let option_c = $("#eventMigration_clearEventRoomNumbers").prop('checked');
        let option_d = $("#eventMigration_clearClassSection").prop('checked');
        console.log(option_a === "on")
        let options = []

        if(option_a){
            options.push("1")           
        }
        if(option_b){
            options.push("2")           
        }
        if(option_c){
            options.push("3")           
        }
        if(option_d){
            options.push("4")           
        }
        options = options.join("")
        let sourceYear = Number($("#eventMigration_Source_Year").val())
        let sourceQuarter = Number($("#eventMigration_Source_Quarter").val())
        let targetYear = Number($("#eventMigration_Source_Year").val())
        let targetQuarter = Number($("#eventMigration_Source_Quarter").val())
        let fetch = $`/home/migrateEvents?year=${sourceYear}&quarter=${sourceQuarter}&targetYear=${targetYear}&targetQuarter=${targetQuarter}`

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
                        <button style={{marginBottom : "15px"}} type="button" class="btn btn-primary btn-sm" onClick={() => _migrateEvents()}>Migrate Events</button>
                    </div>
                </div> 
            </div>
        )
    }
    _eventMigration.render(_renderEventMigrationWindow())
}