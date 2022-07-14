CREATE TABLE [dbo].[ValidPrefixes]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[Prefix] varchar(12) not null unique,
)
