CREATE TABLE [dbo].[Departments]
(
	[Id] INT NOT NULL primary key identity,
	[departmentName] varchar(64) not null, -- Computer Science
	[departmentID] int unique not null, -- 1, 2, 3, 4
	[departmentType] varchar(12) not null, -- IT, AUTO, 
	[institutionID] varchar(64) not null,
	constraint [InstitutionDepartments] foreign key (institutionID) references InstitutionsRegistry(InstitutionID)
)
