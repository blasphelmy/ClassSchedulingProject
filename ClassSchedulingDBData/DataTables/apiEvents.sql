CREATE TABLE [dbo].[apiEvents]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[eventData] varchar(max) not null,
	[eventUUID] varchar(256) unique not null,
	[eventAuthorHash] varchar(512) not null,
	[institutonID] varchar(64) not null,
	--[sessionID] int not null,
	[year] int not null,
	[quarter] int not null,
	[building] varchar(64) not null,
	[room] varchar(64) not null,
	[coursePrefix] varchar(24) not null,
	[deliveryType] varchar(24),
	[startDate] date,
	[endDate] date,
	[courseNumber] varchar(12),
	[Section] varchar(12),
	[Component] varchar(64), --lecture in study w.e
	--constraint [EventSession] foreign key (sessionID) references SessionDates(sessionID),
	constraint [eventAuthorReference] foreign key (eventAuthorHash) references UserInformation(accountHash),
	constraint [eventInstitutionReference] foreign key (institutonID) references InstitutionsRegistry(InstitutionID)
)
