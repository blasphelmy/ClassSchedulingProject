CREATE TABLE [dbo].[Buildings]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[institutionID] varchar(64) not null,
	[buildingName] varchar(64),
	[buildingCode] varchar(120) not null,
	constraint [buildingInstitutionReference] foreign key (institutionID) references InstitutionsRegistry(InstitutionID),
	constraint [uniqueBuilding] unique(buildingCode, institutionID)
)
