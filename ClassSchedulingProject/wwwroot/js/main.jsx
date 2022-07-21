'use strict'

const AllEvents = ReactDOM.createRoot(document.getElementById("allEvents"));
AllEvents.render(<EventListComponent i={newCalender.data} />);

// const EventTemplates = ReactDOM.createRoot(document.getElementById("EventTemplates"));
// EventTemplates.render(<EventTemplateComponent CourseOfferings={caldata.EventTemplates} />);

const FilteredEventsList = ReactDOM.createRoot(document.getElementById("filteredEvents"))
FilteredEventsList.render(<FilteredEvents i={newCalender.data} />);
