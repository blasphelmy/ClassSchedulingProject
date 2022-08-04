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
    let events = this.state.newCalData.events.map(function(o){
      if(o.extendedProps.ProgramId === caldata.ProgramID) return o;
    })
    if(events.length === 0 || events === undefined || events === null){
      return;
    }
    return (
          <div>
            <button className="btn" onClick={() => downloadFile()}><svg style={{position: "relative", top : "-2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
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
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                  {events.map(function(o){
                    if(!o) return;
                    let iTs = [o.extendedProps.startTime, o.extendedProps.endTime];
                    return (
                      <tr style={{color : o.color}}>
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
                        <td>{o.extendedProps.instructorName || "Staff"}{"\t"}</td>
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
       <div style={{width : "20px" }}id="pclose-UUID" className="close" popupid="addEventPopUp" onClick={() => { userEvents.unmount(); }}>&times;</div>
        <br />
        <h4>{this.state.userEvents[0].extendedProps.instructorName} events :</h4> 
        <table className="table table-bordered" style={{marginTop : "10px"}}>
          <thead>
            <th>Course Number</th>
            <th>Course</th>
            <th>Delivery</th>
            <th>Location</th>
            <th>Days</th>
            <th>Time</th>
            <th>Edit</th>
          </thead>
          <tbody>
            {this.state.userEvents.map(function(o){
              let iTs = [o.extendedProps.startTime, o.extendedProps.endTime];
              return (
                <tr>
                  <td>{o.extendedProps.coursePrefix} {o.extendedProps.courseNumber}</td>
                  <td>#{o.extendedProps.classNumber} {o.title}</td>
                  <td>{o.extendedProps.delivery || "Not set"}</td>
                  <td>{function(){
                      if(o.extendedProps.room && o.extendedProps.building) return (<a href="#" onClick={() => goToEvent(o.extendedProps.building, o.extendedProps.room, function(){userEvents.unmount()})}>
                        {o.extendedProps.building + "-" + o.extendedProps.room}
                      </a>)
                      return "Online/Not set"
                  }()}{"\t"}</td>
                  <td>{formatdaysOfWeek(o.daysOfWeek, "M T W TH F".split(" "))}{"\t"}</td>
                  <td>{formatTimeString(iTs) || "not set"}{"\t"}</td>
                  <td>Edit</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
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
    let events = this.state.newCalData.events;
    events = events.map(function(o){
      if(o.extendedProps.ProgramId === caldata.ProgramID) return o;
    }).filter(e => e != undefined || e != null);
    if(developerMode) console.log("events after room filter", events)
    if(events.length === 0 || events === undefined || events === null){
      return;
    }
    if(this.type === "FilteredEvents") events = events.map(eventBuilder);

    return (
      <div className="card">
        <div className="card-header">
        <AccordianHeader type={this.type} />
        </div>
        <div id={`collaspe${this.type}`} className="collapse show" data-parent={`#accordion${this.type}`}>
          <div className="card-body">
            {
              events.map(function (o, key) {
                  if (Object.keys(o).length === 0) return "";
                  if (o.extendedProps.ProgramId !== caldata.ProgramID) EventTemplatesColorMap.set(o.title, "#666")

                return (
                  <div key={`class-${o.extendedProps.uuid}`} id={`class-${o.extendedProps.uuid}`} data={JSON.stringify(o)}>
                    <p style={{ borderColor: `rgba(${HEXtoRGB(EventTemplatesColorMap.get(o.title), colorFilterBrightness, _colorBrightnessVal).join(",")})` }} key={`${key}-p`} className="ActiveEventsListItem">
                      <span style={{ color: `rgb(${HEXtoRGB(o.color, colorFilterBrightness, _colorBrightnessVal).join(",")})` }}>
                        <span className="underlineText" onClick={() => editEvent($(`#class-${o.extendedProps.uuid}`))}>Q{o.extendedProps.ClassQuarterNumber} {"Class "}#{o.extendedProps.classNumber} {o.title}</span></span>
                      <div style={{ color: `rgb(${HEXtoRGB(o.color, colorFilterBrightness, _colorBrightnessVal).join(",")})`, background: `rgba(${HEXtoRGB(o.color).join(",")}, 0)`, fontSize: "12px", padding: "0" }}>
                        {formatdaysOfWeek(o.daysOfWeek)}, {formatTimeString([o.startTime, o.endTime])} <span onClick={() => goToEvent(o.extendedProps.building, o.extendedProps.room)} className="underlineText"><b>view -&gt; {o.extendedProps.building + "-" + o.extendedProps.room}</b></span>
                        <br /> 
                        <a href="#" onClick={() => createUserEventListPopUp(o.extendedProps.instructorHash)}>View all events assigned to {o.extendedProps.instructorName}</a>
                      </div>
                    </p>
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
        Courses in this room: {`${elements.building.val()}-${elements.room.val()}`}
      </a>
    }
    return (
        <a className="collapsed card-link" data-toggle="collapse" href={`#collaspe${this.type}`}>
            Active Courses for
            {elements.quarter.map(function (o, element) {
              switch (element.value) {
                case "1": return " Winter"; break;
                case "2": return " Spring"; break;
                case "3": return " Summer"; break;
                case "4": return " Fall"; break;
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
          if (o.CoursePrefix === e.extendedProps.coursePrefix &&
              o.CourseNumber === e.extendedProps.courseNumber.toString() &&
              o.ProgramId === e.extendedProps.ProgramId) {
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
    return (
      <div className="card">
        <div className="card-header">
          <a className="collapsed card-link" data-toggle="collapse" href="#collapseTwo">
            Course Offered for {caldata.ProgramName + " " + caldata.ProgramType}
          </a>
        </div>
        <div id="collapseTwo" className="collapse" data-parent="#accordionEventemplates">
          <div className="card-body">
            {/* <div>
            <p>Add a course</p>
          </div> */}
            {
              this.state.CourseOfferings.map(function (o, id) {
                if (o.Active) {
                  return (
                    <div id={`course-${o.Id}`} data={JSON.stringify(o)} onClick={() => ActivateEvent($(`#course-${o.Id}`))} key={id + "div"}>
                      <p key={id} style={{ marginBottom: '0', color: `rgba(${HEXtoRGB(EventTemplatesColorMap.get(o.Title), colorFilterBrightness, _colorBrightnessVal).join(",")})`}}>
                        <svg key={id + "svg"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                          <path key={id + "path"} d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                        </svg>
                        <span style={{  }}>{o.Title}</span></p>
                      {o.activeEvents.map(function (o, i) {
                        return (
                          <p key={i + "-course"} style={{ fontSize: "10px", marginLeft: "15px", color: `rgba(${HEXtoRGB(EventTemplatesColorMap.get(o.title), colorFilterBrightness, _colorBrightnessVal).join(",")})`, marginBottom: "0" }}>
                            {o.extendedProps.building + "-" + o.extendedProps.room + " " + o.extendedProps.instructorName + ", " + formatTimeString([o.startTime, o.endTime])}
                          </p>
                        )
                      })}
                    </div>
                  )
                } else {
                  return (
                    <div id={`course-${o.Id}`} data={JSON.stringify(o)} onClick={() => ActivateEvent($(`#course-${o.Id}`))} key={id + "div"}>
                      <p key={id}>
                        {o.Title}</p>
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

{/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg> */}