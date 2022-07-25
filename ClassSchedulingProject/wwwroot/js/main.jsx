'use strict'

const AllEvents = ReactDOM.createRoot(document.getElementById("allEvents"));
AllEvents.render(<EventListComponent i={newCalender.data}  type={"EventList"} />);

const FilteredEventsList = ReactDOM.createRoot(document.getElementById("filteredEvents"))
FilteredEventsList.render(<EventListComponent i={newCalender.data} type={"FilteredEvents"} />);
