CREATE TABLE [dbo].[UserInformation]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[accountHash] varchar(512) unique not null,
	[firstName] varchar(64) not null,
	[lastName] varchar(64) not null,
	[primaryEmail] varchar(64) not null,
	[primaryInstitutionID] varchar(64) not null,
	[accountFlag] int not null,
	constraint [referenceToInstitution] foreign key (primaryInstitutionID) references InstitutionsRegistry(InstitutionID)
)
