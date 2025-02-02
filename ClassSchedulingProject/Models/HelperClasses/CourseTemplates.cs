using ClassSchedulingProject.Models;
namespace ClassSchedulingProject.Structs
{
public struct CourseOfferedTemplates
    {
        public int Id { get; set; }
        public int ProgramId { get; set; }
        public string InstitutionId { get; set; }
        public string Title { get; set; }
        public string CoursePrefix { get; set; }
        public string CourseNumber { get; set; }
        public string Component { get; set; }
        public int QuarterNumber { get; set; }
        public decimal? Credits {get; set;}

        public CourseOfferedTemplates(CourseOfferingsTemplates course){
            this.Id = course.Id;
            this.ProgramId = course.Program.Id;
            this.InstitutionId = course.InstitutionId;
            this.Title = course.Title;
            this.CoursePrefix = course.CoursePrefix;
            this.CourseNumber = course.CourseNumber;
            this.QuarterNumber = course.QuarterNumber;
            this.Component = course.Component;
            this.Credits = course.Credits;
        }
    }
}
