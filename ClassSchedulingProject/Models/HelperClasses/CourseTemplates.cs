using ClassSchedulingProject.Models;
namespace ClassSchedulingProject.Structs
{
public struct CourseOfferedTemplates
    {
        public int Id { get; set; }
        public int ProgramVersion { get; set; }
        public string InstitutionId { get; set; }
        public string Title { get; set; }
        public string CoursePrefix { get; set; }
        public string CourseNumber { get; set; }
        public string Component { get; set; }
        public int QuarterNumber { get; set; }

        public CourseOfferedTemplates(CourseOfferingsTemplates course){
            this.Id = course.Id;
            this.ProgramVersion = course.Program.ProgramVersion;
            this.InstitutionId = course.InstitutionId;
            this.Title = course.Title;
            this.CoursePrefix = course.CoursePrefix;
            this.CourseNumber = course.CourseNumber;
            this.QuarterNumber = course.QuarterNumber;
            this.Component = course.Component;
        }
    }
}
