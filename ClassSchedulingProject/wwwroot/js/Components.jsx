class EventListComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date(),
                    y : props.i};
    }
  
    componentDidMount() {
      this.timerID = setInterval(() => this.tick(), 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
    render() {
      console.log(this.state.y)
      return (
        <div>
          <p>{this.state.y.events[1]?.title}</p>
          <p>{this.state.y.events[0]?.title}</p>
        </div>
      );
    }
  }

  