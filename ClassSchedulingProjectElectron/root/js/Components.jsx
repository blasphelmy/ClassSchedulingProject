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
                if(Object.keys(o).length === 0) return "";

                return (
                  <div key={`class-${o.extendedProps.uuid}`} id={`class-${o.extendedProps.uuid}`} data={JSON.stringify(o)}>
                    <p style={{ borderColor: `rgba(${HEXtoRGB(EventTemplatesColorMap.get(o.title), colorFilterBrightness, .8).join(",")})` }} key={`${key}-p`} className="ActiveEventsListItem">
                      <span style={{ color: `rgb(${HEXtoRGB(o.color, colorFilterBrightness, .9).join(",")})` }}>
                        <span className="underlineText" onClick={() => editEvent($(`#class-${o.extendedProps.uuid}`))}>Q{o.extendedProps.ClassQuarterNumber} {o.title} {" "}#{o.extendedProps.classNumber}</span></span>
                      <div style={{ color: `rgb(${HEXtoRGB(o.color, colorFilterBrightness, .9).join(",")})`, background: `rgba(${HEXtoRGB(o.color).join(",")}, 0)`, fontSize: "10px", padding: "0" }}>
                        {formatdaysOfWeek(o.daysOfWeek)}, {formatTimeString([o.startTime, o.endTime])} <span onClick={() => goToEvent(o.extendedProps.building, o.extendedProps.room)} className="underlineText">@{o.extendedProps.building + "-" + o.extendedProps.room}</span>
                        <br /> 
                        {o.extendedProps.instructorName}
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
            o.CourseNumber === e.extendedProps.courseNumber.toString()) {
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
                      <p key={id} style={{ marginBottom: '0', color: `rgba(${HEXtoRGB(EventTemplatesColorMap.get(o.Title), colorFilterBrightness, .7).join(",")})`}}>
                        <svg key={id + "svg"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23FCB" className="bi bi-check" viewBox="0 0 16 16">
                          <path key={id + "path"} d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                        </svg>
                        <span style={{  }}>{o.Title}</span></p>
                      {o.activeEvents.map(function (o, i) {
                        return (
                          <p key={i + "-course"} style={{ fontSize: "10px", marginLeft: "15px", color: `rgba(${HEXtoRGB(EventTemplatesColorMap.get(o.title), colorFilterBrightness, .7).join(",")})`, marginBottom: "0" }}>
                            {o.extendedProps.building + "-" + o.extendedProps.room + " " + o.extendedProps.instructorName + ", " + formatTimeString([o.startTime + ":00", o.endTime + ":00"])}
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