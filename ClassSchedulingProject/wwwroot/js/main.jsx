'use strict'

const AllEvents = ReactDOM.createRoot(document.getElementById("allEvents"));
AllEvents.render(<App options={ {
    type: "AllEvents"
} }/>);

function App(data) {
    console.log(data);
    let options = data.options;
    if(options.type === "AllEvents"){
        return (
            <EventListComponent i={newCalender.data}/>
        );  
    }
}
