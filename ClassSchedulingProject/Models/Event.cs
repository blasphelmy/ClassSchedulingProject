namespace ClassSchedulingProject.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string EventData { get; set; }
        public string EventAuthorHash { get; set; }
        public string InstitutonId { get; set; }
        public Event(ApiEvents anEvent)
        {
            Id = anEvent.Id;
            EventData = anEvent.EventData;
            EventAuthorHash = anEvent.EventAuthorHash;
            InstitutonId = anEvent.InstitutonId;
        }
    }
}
