CREATE TABLE [dbo].[apiEvents]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[eventData] varchar(max) not null,
	[eventUUID] varchar(256) unique not null,
	[eventAuthorHash] varchar(512) not null, --original event author
	[InstructorHash] varchar(64), --instructor teaching this event
	[institutonID] varchar(64) not null,
	[classQuarterNumber] int not null, --class quarter number
	[year] int not null,
	[quarter] int not null,
	[building] varchar(64),
	[room] varchar(64),
	[programID] int not null,
	[coursePrefix] varchar(24) not null,
	[courseNumber] varchar(12) not null,
	[Section] varchar(12),
	[Component] varchar(64), --lecture in study w.e
	--constraint [EventSession] foreign key (sessionID) references SessionDates(sessionID),
	constraint [eventAuthorReference] foreign key (eventAuthorHash) references UserInformation(eventsAuthorID),
	constraint [eventInstitutionReference] foreign key (institutonID) references InstitutionsRegistry(InstitutionID),
	constraint [eventProgramReference] foreign key (programID) references ProgramOfferings(Id),
)
