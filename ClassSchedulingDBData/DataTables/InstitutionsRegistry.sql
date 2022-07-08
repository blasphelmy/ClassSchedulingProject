CREATE TABLE [dbo].[InstitutionsRegistry]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[InstitutionID] varchar(64) not null unique,
	[InstitutionName] varchar(128) unique,

)
