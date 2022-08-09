CREATE TABLE [dbo].[FinalizedCalendar]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[year] int not null,
	[quarter] int not null,
	[department] int not null,
	[programID] int not null,
	[isActive] int not null,
	constraint [y] unique ([year], [quarter], [department], [programID])
)
