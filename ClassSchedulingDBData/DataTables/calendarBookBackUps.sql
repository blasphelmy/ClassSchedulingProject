CREATE TABLE [dbo].[calendarBookBackUps]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[institutonID] varchar(64) not null,
	[completeBooking] varchar(max) not null,
	[backupNumber] int,
	constraint [backupInstitutionReference] foreign key (institutonID) references InstitutionsRegistry(InstitutionID),
	constraint [uniqueBackUp] unique([institutonID], backupNumber)
)
