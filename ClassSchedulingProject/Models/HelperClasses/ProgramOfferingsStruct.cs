using ClassSchedulingProject.Models;
namespace ClassSchedulingProject.Structs
{
public struct ProgramOfferingStuct
    {
        public int ProgramId { get; set; }
        public string ProgramName {get; set;}
        public string ProgrameType {get; set;}

        public ProgramOfferingStuct(ProgramOfferings program){
            this.ProgramId = program.Id;
            this.ProgramName = program.ProgramName;
            this.ProgrameType = program.ProgramType;
        }
    }
}
