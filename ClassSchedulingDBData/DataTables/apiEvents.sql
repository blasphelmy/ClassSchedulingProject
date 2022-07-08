CREATE TABLE [dbo].[apiEvents]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[eventData] varchar(max) not null,
	[eventAuthorHash] varchar(512) not null,
	[institutonID] varchar(64) not null,
	constraint [eventAuthorReference] foreign key (eventAuthorHash) references UserInformation(accountHash),
	constraint [eventInstitutionReference] foreign key (institutonID) references InstitutionsRegistry(InstitutionID)
)
