CREATE TABLE [dbo].[UserInformation]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[accountHash] varchar(512) unique not null,
	[eventsAuthorID] varchar(512) unique not null,
	[firstName] varchar(64) not null,
	[lastName] varchar(64) not null,
	[primaryEmail] varchar(64) not null,
	[primaryInstitutionID] varchar(64) not null,
	[accountFlag] int not null, -- 0 = admin 1 = admin assistant 2 - user
	[departmentID] int,
	constraint [userAssociatedInstitution] foreign key (primaryInstitutionID) references InstitutionsRegistry(InstitutionID),
	constraint [UserAssociatedDepartment] foreign key (departmentID) references Departments(departmentID)
)
