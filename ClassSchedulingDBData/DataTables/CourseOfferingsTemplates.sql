CREATE TABLE [dbo].[CourseOfferingsTemplates]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[ProgramID] int not null,
	[InstitutionID] varchar(64) not null,
	[Title] varchar(128) not null,
	[CoursePrefix] varchar(24) not null,
	[CourseNumber] varchar(24) not null,
	[Component] varchar(64) not null,
	[quarterNumber] int not null, -- 1-6 
	constraint [InstitutionCourseOfferings] foreign key (institutionID) references InstitutionsRegistry(institutionID),
	constraint [CourseProgramReference] foreign key (ProgramID) references ProgramOfferings(Id),
	constraint [UniqueCourseOffering] unique(institutionID, CoursePrefix, CourseNumber, quarterNumber, Component, ProgramID)
)
