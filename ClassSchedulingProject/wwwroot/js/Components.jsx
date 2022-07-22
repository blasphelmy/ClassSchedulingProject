class FilteredEvents extends React.Component {
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
      newCalData : newCalender.data
    });
  }
  render() {
    let events = this.state.newCalData.events.map(eventBuilder);
    return (
      <div className="card">
        <div className="card-header">
          <a className="collapsed card-link" data-toggle="collapse" href="#collaspeRoomEvents">
            Courses in this room: {`${elements.building.val()}-${elements.room.val()}`}
          </a>
        </div>
        <div id="collaspeRoomEvents" className="collapse show" data-parent="#accordionFilteredEvents">
          <div className="card-body">
              {
                events.map(function(o, key){
                  return (
                    <div key={`${key}-div`} data={JSON.stringify(o)}>
                      <p key={`${key}-p`}>{o.title}</p>
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

class EventListComponent extends React.Component {
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
      newCalData : newCalender.data
    });
  }
  render() {
    let events = this.state.newCalData.events;
    return (
      <div className="card">
        <div className="card-header">
          <a className="collapsed card-link" data-toggle="collapse" href="#collaspeAllEvents">
            Active Courses for 
            {elements.quarter.map(function(o, element){
                switch(element.value){
                    case "1" : return " Winter"; break;
                    case "2" : return " Spring"; break;
                    case "3" : return " Summer"; break;
                    case "4" : return " Fall"; break;
                }
                return "Error";
            })[0] + " " + elements.year.val()}
          </a>
        </div>
        <div id="collaspeAllEvents" className="collapse show" data-parent="#accordionAllEvents">
          <div className="card-body">
              {
                events.map(function(o, key){
                  return (
                    <div key={`${key}-div`} data={JSON.stringify(o)}>
                      <p key={`${key}-p`}>{o.title}</p>
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
    // console.log(this.state);
    this.setState({
      CourseOfferings: caldata.EventTemplates
    });
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
              this.state.CourseOfferings.map(function(o, id){
                if(o.Active){
                  return (
                    <div key={id+"div"}>
                      <p key={id}>
                      <svg key={id+"svg"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23FCB" className="bi bi-check" viewBox="0 0 16 16">
                        <path key={id+"path"} d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                      </svg> 
                      
                      {o.Title}</p>
                    </div>

                    )
                }else{
                  return (
                    <div id={`course-${o.Id}`} data={JSON.stringify(o)} onClick={ () => ActivateEvent($(`#course-${o.Id}`))} key={id+"div"}>
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