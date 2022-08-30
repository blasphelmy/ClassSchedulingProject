class ListViewComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      newCalData: props.i
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      newCalData: newCalender.data
    });
  }
  render() {
    if(jQuery.isEmptyObject(this.state.newCalData)) return;
    let events = this.state.newCalData.events.map(function(o){
      if(o.extendedProps.ProgramId === caldata.ProgramID) return o;
    })
    if(events.length === 0 || events === undefined || events === null){
      return;
    }
    return (
          <div>
            <button className="btn" onClick={() => downloadFile()}><svg style={{position: "relative", top : "-2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
  </svg> Download as csv</button>
            <table id="tableListView" className="table table-bordered listViewTable">
              <thead>
                <tr>
                  <th>Class #</th>
                  <th>Course</th>
                  <th>Number</th>
                  <th>Title</th>
                  <th>Session</th>
                  <th>Section</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Component</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Room-Loc</th>
                  <th>Days</th>
                  <th>Delivery</th>
                  <th>Instructor</th>
                  <th>{"  "}</th>
                </tr>
              </thead>
              <tbody>
                  {events.map(function(o){
                    if(!o) return;
                    let iTs = [o.extendedProps.startTime, o.extendedProps.endTime];
                    return (
                      <tr style={{color: `rgb(${HEXtoRGB(o.color2, colorFilterBrightness, _colorBrightnessVal).join(",")})`}}>
                        <td>{o.extendedProps.classNumber || "not set"}{"\t"}</td>
                        <td>{o.extendedProps.coursePrefix}{"\t"}</td>
                        <td>{o.extendedProps.courseNumber}{"\t"}</td>
                        <td>{o.title}{"\t"}</td>
                        <td>{o.extendedProps.Session}{"\t"}</td>
                        <td>{o.extendedProps.section || "not set"}{"\t"}</td>
                        <td>{o.extendedProps.startDate || "not set"}{"\t"}</td>
                        <td>{o.extendedProps.endDate || "not set"}{"\t"}</td>
                        <td>{o.extendedProps.component || "not set"}{"\t"}</td>
                        <td>{formatTimeString(iTs).split(" - ")[0] || "not set"}{"\t"}</td>
                        <td>{formatTimeString(iTs).split(" - ")[1] || "not set"}{"\t"}</td>
                        <td>{function(){
                            if(o.extendedProps.room && o.extendedProps.building) return (<a href="#" onClick={() => changeBackToCalendarThenGoToEvent(o.extendedProps.building, o.extendedProps.room)}>
                              {o.extendedProps.building + "-" + o.extendedProps.room}
                            </a>)
                            return "Online/Not set"
                        }()}{"\t"}</td>
                        <td>{formatdaysOfWeek(o.daysOfWeek, "M T W TH F".split(" "))}{"\t"}</td>
                        <td>{o.extendedProps.delivery || "null"}{"\t"}</td>
                        <td><span className="underlineText" onClick={() => createUserEventListPopUp(o.extendedProps.instructorHash)}>{o.extendedProps.instructorName || "Staff"}{"\t"}</span></td>
                        <td><a id={`table-${o.extendedProps.uuid}`} href="#" data={JSON.stringify(o)} onClick={() => editEvent($(`#table-${o.extendedProps.uuid}`))}>Edit{"\t"}</a></td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        );
  }
}
class UserEventsComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEvents: props.events,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 300);
    if(!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) createDraggableElement(document.getElementById("EventsByUserPopUp"))
    centerWindow(document.getElementById("EventsByUserPopUp"))
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({});
  }
  render() {
    return (
      <div id="EventsByUserPopUp" className="popup card">
       <div style={{width : "20px" }} id="pclose-UUID" className="close" popupid="addEventPopUp" onClick={() => { userEvents.unmount(); }}>&times;</div>
        <br />
        <h4>Courses assigned to {this.state.userEvents[0].extendedProps.instructorName} for {elements.year.val() - 1}-{elements.year.val()}</h4> 
        <table className="table table-responsive" style={{marginTop : "10px"}}>
          <thead>
            <td>Quarter</td>
            <th>Course Number</th>
            <th>Course</th>
            <th>Delivery</th>
            <th>Location</th>
            <th>Days</th>
            <th>Time</th>
            <th>Credits</th>
            <th>{"  "}</th>
          </thead>
          <tbody>
            {checkEventsForQuarter(this.state.userEvents, 1)}
            {this.state.userEvents.map(function(o){
              if(o.extendedProps.Quarter !== 1) return;
              return returnUserListTableRow(o);
            })}
            {checkEventsForQuarter(this.state.userEvents, 2)}
            {this.state.userEvents.map(function(o){
              if(o.extendedProps.Quarter !== 2) return;
              return returnUserListTableRow(o);
            })}
            {checkEventsForQuarter(this.state.userEvents, 3)}
            {this.state.userEvents.map(function(o){
              if(o.extendedProps.Quarter !== 3) return;
              return returnUserListTableRow(o);
            })}
            {checkEventsForQuarter(this.state.userEvents, 4)}
            {this.state.userEvents.map(function(o){
              if(o.extendedProps.Quarter !== 4) return;
              return returnUserListTableRow(o);
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
function checkEventsForQuarter(eventList, QuarterNumber){
    for(let i of eventList){
      if(i.extendedProps.Quarter === QuarterNumber){
        switch(QuarterNumber){
          case 1: return <tr><td colSpan="8">Courses assigned for Fall: {sumcredits(eventList, QuarterNumber)} credits total</td></tr>
          case 2: return <tr><td colSpan="8">Courses assigned for Winter: {sumcredits(eventList, QuarterNumber)} credits total</td></tr>
          case 3: return <tr><td colSpan="8">Courses assigned for Spring: {sumcredits(eventList, QuarterNumber)} credits total</td></tr>
          case 4: return <tr><td colSpan="8">Courses assigned for Summer: {sumcredits(eventList, QuarterNumber)} credits total</td></tr>
        }
      }
    }
}
function sumcredits(eventList, QuarterNumber){
  let credits = 0.0;
  for(let i of eventList){
    if(i.extendedProps.Quarter === QuarterNumber){
      credits = credits + i.extendedProps.credits;
    }
  }
  return credits;
}
function returnUserListTableRow(o){
  let iTs = [o.extendedProps.startTime, o.extendedProps.endTime];
  return (
    <tr>
      <td>ProgramID : {o.extendedProps.ProgramId}</td>
      <td>{o.extendedProps.coursePrefix} {o.extendedProps.courseNumber}</td>
      <td>#{o.extendedProps.classNumber} {o.title}</td>
      <td>{o.extendedProps.delivery || "Not set"}</td>
      <td>{function(){
          if(o.extendedProps.room && o.extendedProps.building) return (
              <a href="#" onClick={() => goToEvent(o.extendedProps.building, o.extendedProps.room, function(){userEvents.unmount()})}>
              {o.extendedProps.building + "-" + o.extendedProps.room}
              </a>
          )
          return "Online/Not set"
      }()}{"\t"}</td>
      <td>{formatdaysOfWeek(o.daysOfWeek, "M T W TH F".split(" "))}{"\t"}</td>
      <td>{formatTimeString(iTs) || "not set"}{"\t"}</td>
      <td>{o.extendedProps.credits}</td>
      <td><a id={`tableUserEventListPopUp-${o.extendedProps.uuid}`} href="#" data={JSON.stringify(o)} onClick={() => editEvent($(`#tableUserEventListPopUp-${o.extendedProps.uuid}`))}>Edit{"\t"}</a></td>
    </tr>
  )
}
class EventListComponent extends React.Component {
  type;
  constructor(props) {
    super(props);
    this.state = {
      newCalData: props.i
    };
    this.type = props.type;
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      newCalData: newCalender.data
    });
  }
  render() {
    if(jQuery.isEmptyObject(this.state.newCalData)) return;
    let events = this.state.newCalData.events;
    events = events.map(function(o){
      if(o.extendedProps.ProgramId === caldata.ProgramID) return o;
    }).filter(e => e != undefined || e != null);
    if(developerMode) console.log("events after room filter", events)
    if(events.length === 0 || events === undefined || events === null){
      return;
    }
    if(this.type === "FilteredEvents") events = events.map(eventBuilder);

   try{

   }catch{
    // console.log("error sorting events")
   }

    return (
      <div className="card">
        <div className="card-header">
        <AccordianHeader type={this.type} />
        </div>
        <div id={`collaspe${this.type}`} className="collapse show" data-parent={`#accordion${this.type}`}>
          <div id={`${this.type}_accordian_body`} className="card-body">
            {
              events.map(function (o, key) {
                  let warningDisplay = "none";
                  let errorFill = "orange";
                  if (Object.keys(o).length === 0) return "";
                  if (o.extendedProps.ProgramId !== caldata.ProgramID) EventTemplatesColorMap.set(o.title, "#666")
                  if(o.extendedProps.warnings?.length > 0 || o.extendedProps.errors?.length > 0) warningDisplay = "block"
                  if(o.extendedProps.errors?.length > 0) errorFill = "red";

                  return (
                  <div className="row listItemComponent">
                    <div className="col-10">
                      <div key={`class-${o.extendedProps.uuid}`} id={`class-${o.extendedProps.uuid}`} data={JSON.stringify(o)}>
                        <p style={{ borderColor: `rgba(${HEXtoRGB(EventTemplatesColorMap.get(o.extendedProps.courseID), colorFilterBrightness, _colorBrightnessVal).join(",")})` }} key={`${key}-p`} className="ActiveEventsListItem">
                          <span style={{ color: `rgb(${HEXtoRGB(o.color2, colorFilterBrightness, _colorBrightnessVal).join(",")})` }}>
                            "<span className="underlineText" onClick={() => editEvent($(`#class-${o.extendedProps.uuid}`))}>{o.title}</span>"</span>
                          <div style={{ padding: "0" }}>
                          {formatdaysOfWeek(o.daysOfWeek)}; {formatTimeString([o.startTime, o.endTime])}   {function(){
                              if(o.extendedProps.building && o.extendedProps.room ) return (<span onClick={() => goToEvent(o.extendedProps.building, o.extendedProps.room)} className="underlineText"><b>view -&gt; {o.extendedProps.building + "-" + o.extendedProps.room}</b></span>)
                              return ""
                            }()}
                            {function(){
                              if(o.extendedProps.classNumber || o.extendedProps.section || o.extendedProps.delivery) return <br />
                            }()}
                            {function(){
                              if(o.extendedProps.delivery) return <span>{o.extendedProps.delivery + " "}</span>
                            }()}
                            {function(){
                              if(o.extendedProps.classNumber && o.extendedProps.section) return <span>Class #{o.extendedProps.classNumber}, Section {o.extendedProps.section} </span>
                              if(o.extendedProps.classNumber) return <span>Class #{o.extendedProps.classNumber}</span>
                              if(o.extendedProps.section) return <span>Section {o.extendedProps.section} </span>
                            }()}
                            <br />
                            <a href="#" style={{color:"#4090f2"}} onClick={() => createUserEventListPopUp(o.extendedProps.instructorHash)}><span>View all events assigned to {o.extendedProps.instructorName}</span></a>
                          </div>
                        </p>
                      </div>
                    </div>
                    <div className="col-2">
                      <div style={{display : warningDisplay, cursor : "pointer"}} onClick={()=> {warningPopUps(JSON.stringify(o.extendedProps.warnings), JSON.stringify(o.extendedProps.errors), o)}}>
                        <center><svg className="bi bi-exclamation-triangle" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={errorFill} viewBox="0 0 16 16">
                          <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                          <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                        </svg></center>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
class AccordianHeader extends React.Component {
  type;
  constructor(props){
    super(props);
    this.type = props.type;
  }
  render(){
    if(this.type === "FilteredEvents"){
      return <a className="collapsed card-link" data-toggle="collapse" href={`#collaspe${this.type}`}>
        Courses planned in this room: {`${elements.building.val()}-${elements.room.val()}`}
      </a>
    }
    return (
        <a className="collapsed card-link" data-toggle="collapse" href={`#collaspe${this.type}`}>
            Active Courses for
            {elements.quarter.map(function (o, element) {
              switch (element.value) {
                case "1": return " Fall"; break;
                case "2": return " Winter"; break;
                case "3": return " Spring"; break;
                case "4": return " Summer"; break;
              }
              return "Error";
            })[0] + " " + elements.year.val()}
          </a>
    );
  }
}
class EventTemplateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CourseOfferings: props.CourseOfferings
    }
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(function (state) {
      for (let o of caldata.EventTemplates) o.activeEvents = [];

      newCalender.data.events.map(function (e) {
        caldata.EventTemplates.map(function (o) {
          // console.log(e, o)
          if (e.extendedProps.courseID === o.Id) {
            o.activeEvents.push(e);
            o.Active = true;
          }
        });
      });
      return {
        CourseOfferings: caldata.EventTemplates
      }
    })
  }
  render() {
    if(!elements.checkNull()) {
      return;
    }
    return (
      <div className="card">
        <div className="card-header">
          <a className="collapsed card-link" data-toggle="collapse" href="#collapseTwo">
            Course Offered for {caldata.ProgramName + " " + caldata.ProgramType}
          </a>
        </div>
        <div id="collapseTwo" className="collapse show" data-parent="#accordionEventemplates">
          <div className="card-body">
            {/* <div>
            <p>Add a course</p>
          </div> */}
            {
              this.state.CourseOfferings.map(function (o, id) {
                if (o.Active) {
                  return (
                    <div style={{marginBottom : "8px"}}>
                    <span id={`course-${o.Id}`} data={JSON.stringify(o)} onClick={() => ActivateEvent($(`#course-${o.Id}`))} key={id + "div"}>
                      <p key={id} style={{ cursor : "pointer" ,marginBottom: '0', color: `rgba(${HEXtoRGB(EventTemplatesColorMap.get(o.Id), colorFilterBrightness, _colorBrightnessVal).join(",")})`}}>
                        <svg key={id + "svg"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                          <path key={id + "path"} d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                        </svg>{"  "}
                        Q{o.QuarterNumber} {o.Title}</p>
                        </span>
                      {o.activeEvents.map(function (o, i) {
                        return (
                          <div style={{margin: "0"}}>
                            <p key={i + "-course"} style={{ fontSize: "12px", marginLeft: "15px", color: `rgba(${HEXtoRGB(EventTemplatesColorMap.get(o.extendedProps.courseID), colorFilterBrightness, _colorBrightnessVal).join(",")})`, marginBottom: "0" }}>
                            {function(){
                              if(o.extendedProps.building && o.extendedProps.room ) return (<span onClick={() => goToEvent(o.extendedProps.building, o.extendedProps.room)} className="underlineText"><b>{o.extendedProps.building + "-" + o.extendedProps.room}</b></span>)
                              return ""
                            }()} {" " + o.extendedProps.instructorName + ", " + formatTimeString([o.startTime, o.endTime])}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  )
                } else {
                  return (
                    <div id={`course-${o.Id}`} data={JSON.stringify(o)} onClick={() => ActivateEvent($(`#course-${o.Id}`))} key={id + "div"}>
                      <p key={id} style={{ cursor : "pointer", marginBottom: "8px"}}>
                      Q{o.QuarterNumber} {o.Title}</p>
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    );
  }
}