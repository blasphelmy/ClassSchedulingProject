CREATE TABLE [dbo].[CourseOfferings]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[courseOfferedID] int not null,
	[ClassNumber] int unique,
	[quarter] int, -- represents actual quarter of the year
	[year] int, --would probably be unused
	constraint [CourseOfferedTemplate] foreign key (courseOfferedID) references CourseOfferingsTemplates(id)
)
