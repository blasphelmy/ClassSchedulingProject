CREATE TABLE [dbo].[Departments]
(
	[Id] INT NOT NULL primary key identity,
	[departmentName] varchar(24) not null, -- Computer Science
	[departmentID] int not null, -- 1, 2, 3, 4
	[departmentType] varchar(12) not null, -- IT, AUTO, 
	[departmentClassPrefix] varchar(12) not null, -- CSI, MATH, ENGL
	[institutionID] varchar(64) not null,
	constraint [DepartmentInstitutionReference] foreign key (departmentClassPrefix) references ValidPrefixes(Prefix),
	constraint [PrefixReference] foreign key (institutionID) references InstitutionsRegistry(InstitutionID)
)
