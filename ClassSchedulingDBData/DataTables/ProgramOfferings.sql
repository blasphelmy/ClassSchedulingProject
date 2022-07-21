CREATE TABLE [dbo].[ProgramOfferings]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[InstitutionID] varchar(64) not null,
	[AssociatedDepartmentID] int not null,
	[ProgramName] varchar(256) not null,
	[ProgramType] varchar(12) not null,
	[ProgramVersion] int not null,
	constraint [UniqueProgramOffering] unique(InstitutionID, ProgramType, ProgramName, ProgramVersion),
	constraint [InstitutionProgramOfferings] foreign key (InstitutionID) references InstitutionsRegistry(institutionID),
	constraint [ProgramsDepartment] foreign key (AssociatedDepartmentID) references Departments(departmentID),
)
