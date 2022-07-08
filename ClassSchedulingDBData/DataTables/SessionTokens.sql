CREATE TABLE [dbo].[SessionTokens]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[SessionID] varchar(256) unique not null,
	[accountHash] varchar(512) not null,
	constraint [referenceToRealUser] foreign key (accountHash) references UserInformation(accountHash)
)
