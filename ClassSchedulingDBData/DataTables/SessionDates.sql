CREATE TABLE [dbo].[SessionDates]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[SessionName] varchar(24) not null, --ie spring, summer
	[sessionID] int unique not null,
	[sessionNumber] int not null, -- ie 1 for winter 2 for spring thus fourth
	[sessionYear] int not null,
	[startDate] date not null,
	[endDate] date not null,
	[institutonID] varchar(64) not null,
	constraint [InstitutionSessions] foreign key (institutonID) references InstitutionsRegistry(InstitutionID),
	constraint [uniqueSession] unique(sessionNumber, sessionYear, institutonID)
)
