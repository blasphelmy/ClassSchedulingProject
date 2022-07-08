CREATE TABLE [dbo].[InstitutionEmailDomains]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[institutionID] varchar(64) not null,
	[emailSuffix] varchar(64) not null,
	constraint [EmailSuffixReferenceToInstitution] foreign key (institutionID) references InstitutionsRegistry(institutionID)
)
