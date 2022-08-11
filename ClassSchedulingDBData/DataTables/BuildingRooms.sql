CREATE TABLE [dbo].[BuildingRooms]
(
	[Id] INT NOT NULL PRIMARY KEY identity,
	[buildingID] int not null,
	[room] varchar(12) not null,
	constraint [buildingReference] foreign key (buildingID) references [Buildings](Id),
	constraint [uniqueRoom] unique(buildingID, room)
)
