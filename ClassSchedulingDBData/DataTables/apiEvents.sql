CREATE TABLE [dbo].[apiEvents]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[eventData] varchar(max) not null,
	[eventUUID] varchar(256) unique not null,
	[eventAuthorHash] varchar(512) not null,
	[institutonID] varchar(64) not null,
	[year] int not null,
	[quarter] int not null,
	[building] varchar(64) not null,
	[room] varchar(64) not null,
	constraint [eventAuthorReference] foreign key (eventAuthorHash) references UserInformation(accountHash),
	constraint [eventInstitutionReference] foreign key (institutonID) references InstitutionsRegistry(InstitutionID)
)
