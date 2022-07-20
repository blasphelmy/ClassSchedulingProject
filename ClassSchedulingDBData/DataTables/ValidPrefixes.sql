CREATE TABLE [dbo].[ValidPrefixes]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[Prefix] varchar(12) not null unique,
	[departmentID] int not null,
	constraint [DepartmentCoursePrefixes] foreign key (departmentID) references Departments(departmentID),
	constraint [uniqueDepartmentPrefix] unique (Prefix, departmentID)
)
