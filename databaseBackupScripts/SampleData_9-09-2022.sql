USE [ClassSchedulerAPIData]
GO
SET IDENTITY_INSERT [dbo].[InstitutionsRegistry] ON 
GO
INSERT [dbo].[InstitutionsRegistry] ([Id], [InstitutionID], [InstitutionName]) VALUES (1, N'RTC', N'Renton Technical College')
GO
SET IDENTITY_INSERT [dbo].[InstitutionsRegistry] OFF
GO
SET IDENTITY_INSERT [dbo].[Departments] ON 
GO
INSERT [dbo].[Departments] ([Id], [departmentName], [departmentID], [departmentType], [institutionID]) VALUES (1, N'Computer Science/Computer Networking', 37, N'IT', N'RTC')
GO
SET IDENTITY_INSERT [dbo].[Departments] OFF
GO
SET IDENTITY_INSERT [dbo].[ProgramOfferings] ON 
GO
INSERT [dbo].[ProgramOfferings] ([Id], [InstitutionID], [AssociatedDepartmentID], [ProgramName], [ProgramType], [ProgramVersion]) VALUES (1, N'RTC', 37, N'Computer Application Development', N'AAS/T', 1)
GO
INSERT [dbo].[ProgramOfferings] ([Id], [InstitutionID], [AssociatedDepartmentID], [ProgramName], [ProgramType], [ProgramVersion]) VALUES (2, N'RTC', 37, N'Computer Application Development Revision2', N'AAS/T', 2)
GO
SET IDENTITY_INSERT [dbo].[ProgramOfferings] OFF
GO
SET IDENTITY_INSERT [dbo].[CourseOfferingsTemplates] ON 
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1, 1, N'RTC', N'Computer Programming II', N'CSI', N'122', N'Lecture', 2, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (2, 1, N'RTC', N'Computer Programming III', N'CSI', N'124', N'Lecture', 3, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (3, 1, N'RTC', N'Database Design', N'CSI', N'130', N'Lecture', 2, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (4, 1, N'RTC', N'Front-End Web Development', N'CSI', N'140', N'Lecture', 3, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (5, 1, N'RTC', N'Computer Programming IV', N'CSI', N'226', N'Lecture', 4, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (6, 1, N'RTC', N'Applied Database Development', N'CSI', N'234', N'Lecture', 4, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (7, 1, N'RTC', N'Client-Side Scripting', N'CSI', N'242', N'Lecture', 5, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (8, 1, N'RTC', N'Rich Internet Applications1', N'CSI', N'250', N'Lecture', 6, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (9, 1, N'RTC', N'Introduction to Data Structures and Algorithms', N'CSI', N'260', N'Lecture', 5, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (10, 1, N'RTC', N'Capstone Design and Development Project', N'CSI', N'293', N'Lecture', 6, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (11, 1, N'RTC', N'Co-op Education/Internship (can replace CSI 250 and CSI 293)', N'CSI', N'294', N'Ind Study', 6, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (13, 1, N'RTC', N'Bits and Bytes of Cloud Computing', N'CNT', N'156', N'Lecture', 1, CAST(2.5 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (15, 1, N'RTC', N'Computer Programmings I', N'CSI', N'120', N'Lecture', 2, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1018, 2, N'RTC', N'Computer Programming II', N'CSI', N'122', N'Lecture', 2, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1019, 2, N'RTC', N'Computer Programming III', N'CSI', N'124', N'Lecture', 3, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1020, 2, N'RTC', N'Database Design', N'CSI', N'130', N'Lecture', 2, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1021, 2, N'RTC', N'Front-End Web Development', N'CSI', N'140', N'Lecture', 3, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1022, 2, N'RTC', N'Computer Programming IV', N'CSI', N'226', N'Lecture', 4, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1023, 2, N'RTC', N'Applied Database Development', N'CSI', N'234', N'Lecture', 4, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1024, 2, N'RTC', N'Client-Side Scripting', N'CSI', N'242', N'Lecture', 5, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1025, 2, N'RTC', N'Rich Internet Applications', N'CSI', N'250', N'Lecture', 6, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1026, 2, N'RTC', N'Introduction to Data Structures and Algorithms', N'CSI', N'260', N'Lecture', 5, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1027, 2, N'RTC', N'Capstone Design and Development Project', N'CSI', N'293', N'Lecture', 6, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1028, 2, N'RTC', N'Co-op Education/Internship (can replace CSI 250 and CSI 293)', N'CSI', N'294', N'Ind Study', 6, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1029, 2, N'RTC', N'College Success', N'COL', N'101', N'Lecture', 1, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1031, 2, N'RTC', N'Bits and Bytes of Cloud Computing', N'CNT', N'156', N'Lab', 1, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1032, 2, N'RTC', N'Computer Programming I', N'CSI', N'120', N'Lecture', 1, CAST(5.0 AS Decimal(3, 1)))
GO
INSERT [dbo].[CourseOfferingsTemplates] ([Id], [ProgramID], [InstitutionID], [Title], [CoursePrefix], [CourseNumber], [Component], [quarterNumber], [credits]) VALUES (1034, 1, N'RTC', N'Bits and Bytes of Cloud Computing', N'CSI', N'156', N'Lab', 2, CAST(5.0 AS Decimal(3, 1)))
GO
SET IDENTITY_INSERT [dbo].[CourseOfferingsTemplates] OFF
GO
SET IDENTITY_INSERT [dbo].[UserInformation] ON 
GO
INSERT [dbo].[UserInformation] ([Id], [accountHash], [eventsAuthorID], [firstName], [lastName], [primaryEmail], [primaryInstitutionID], [accountFlag], [departmentID]) VALUES (1, N'a446f7c4314828ab7b4c72dab8e71870ef33e88a57372a513efd9cf2c76df917', N'3767e0c042c084cddf3005373bdbc794799e07d77a63b42f015040aae08148f5', N'David', N'Nguyen', N'dhnguyen08@rtc.edu', N'RTC', 1, 37)
GO
INSERT [dbo].[UserInformation] ([Id], [accountHash], [eventsAuthorID], [firstName], [lastName], [primaryEmail], [primaryInstitutionID], [accountFlag], [departmentID]) VALUES (2, N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'david', N'nguyen', N'david@rtc.edu', N'RTC', 0, 37)
GO
INSERT [dbo].[UserInformation] ([Id], [accountHash], [eventsAuthorID], [firstName], [lastName], [primaryEmail], [primaryInstitutionID], [accountFlag], [departmentID]) VALUES (3, N'03e3a334a8ed835250769697922a68267e0e58d4dfc587650451c47e90a654f6', N'86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64', N'Johny', N'Appleseed', N'testuser@rtc.edu', N'RTC', 3, 37)
GO
INSERT [dbo].[UserInformation] ([Id], [accountHash], [eventsAuthorID], [firstName], [lastName], [primaryEmail], [primaryInstitutionID], [accountFlag], [departmentID]) VALUES (4, N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'8c2370020312cf6457dde464598c177efc6ff6b9cb20e61c7b8c31bde8e5dc7b', N'Moose', N'Frager', N'moose@rtc.edu', N'RTC', 3, 37)
GO
INSERT [dbo].[UserInformation] ([Id], [accountHash], [eventsAuthorID], [firstName], [lastName], [primaryEmail], [primaryInstitutionID], [accountFlag], [departmentID]) VALUES (1004, N'ff1f95fedda6b6a90c4abda2b71f87f2b246754281e1dba581aac19659bf16e7', N'd5aa4a39ff4aebe023dead7ce3b7607f886f9341927748abbd95f6a7b7011616', N'Stefanie', N'McIrvin', N'smcirvin@rtc.edu', N'RTC', 1, 37)
GO
INSERT [dbo].[UserInformation] ([Id], [accountHash], [eventsAuthorID], [firstName], [lastName], [primaryEmail], [primaryInstitutionID], [accountFlag], [departmentID]) VALUES (1005, N'5d84e27f6291c4b1f5e17e99af96ff7ace58cdbe387d8e331afd9ba6ccc15ccf', N'8deb034ad2b4ad8c45dd50130d6abfaf5c41ed1e666f6ad9d8a747fe16635d0a', N'Mango', N'Steen', N'mango@rtc.edu', N'RTC', 3, 37)
GO
INSERT [dbo].[UserInformation] ([Id], [accountHash], [eventsAuthorID], [firstName], [lastName], [primaryEmail], [primaryInstitutionID], [accountFlag], [departmentID]) VALUES (1006, N'ad6ebbf4bbef8234b53bbed7d3c36e9af5412b0591c869616711f0e9452dfcef', N'd7998839f2e3092d594a50383ac7e8ad6eb5848d02c586e4f5634682d6c750a9', N'Duck', N'Ling', N'duck@rtc.edu', N'RTC', 3, 37)
GO
INSERT [dbo].[UserInformation] ([Id], [accountHash], [eventsAuthorID], [firstName], [lastName], [primaryEmail], [primaryInstitutionID], [accountFlag], [departmentID]) VALUES (2006, N'b23731ee0127637a62ee02c03522f74c32c4c013a31099b3e3c7f04761e078d6', N'116ac9bd020f100aa1f2d62e691f020fbb2e31f866485bb3c96ba785848196e8', N'Blake', N'Mitchel', N'blake@rtc.edu', N'RTC', 4, NULL)
GO
SET IDENTITY_INSERT [dbo].[UserInformation] OFF
GO
SET IDENTITY_INSERT [dbo].[apiEvents] ON 
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (20930, N'{"overlap":true,"color":"#ab4e68","extendedProps":{"courseID":1034,"uuid":"ee230846-a1d2-478b-9642-430657af0a46","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":2,"Quarter":1,"Year":2023,"dateCreated":"2022-08-23T20:45:34.084Z","instructorName":"STAFF","instructorHash":"STAFF","classNumber":0,"Session":"Reg","section":null,"courseNumber":"156","coursePrefix":"CSI","component":"Lab","delivery":null,"startTime":"","endTime":"","startDate":"","endDate":"","room":"","building":"","lastModName":"david nguyen","lastModDate":"2022-08-23T20:45:35.322Z","credits":5,"insanityLevel":0,"warnings":["Event days of week not set","Location not set","Times not set","Start and end date not set","Class number not set","Section number not set"]},"title":"Bits and Bytes of Cloud Computing","daysOfWeek":[],"groupId":"ee230846-a1d2-478b-9642-430657af0a46","startTime":"","endTime":""}', N'ee230846-a1d2-478b-9642-430657af0a46', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'STAFF', N'RTC', 2, 2023, 1, N'', N'', 1, 1034, N'CSI', N'156', N'null', N'Lab')
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (20931, N'{"overlap":true,"color":"#ab4e68","extendedProps":{"courseID":3,"uuid":"efb55564-7a10-471d-8d16-8814a61c0832","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":2,"Quarter":1,"Year":2023,"dateCreated":"2022-08-23T20:45:36.874Z","instructorName":"Duck Ling","instructorHash":"d7998839f2e3092d594a50383ac7e8ad6eb5848d02c586e4f5634682d6c750a9","classNumber":0,"Session":"Reg","section":null,"courseNumber":"130","coursePrefix":"CSI","component":"Lecture","delivery":null,"startTime":"","endTime":"","startDate":"","endDate":"","room":"","building":"","lastModName":"david nguyen","lastModDate":"2022-08-23T20:45:38.954Z","credits":5,"insanityLevel":0,"warnings":["Event days of week not set","Location not set","Times not set","Start and end date not set","Class number not set","Section number not set"]},"title":"Database Design","daysOfWeek":[],"groupId":"efb55564-7a10-471d-8d16-8814a61c0832","startTime":"","endTime":""}', N'efb55564-7a10-471d-8d16-8814a61c0832', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'd7998839f2e3092d594a50383ac7e8ad6eb5848d02c586e4f5634682d6c750a9', N'RTC', 2, 2023, 1, N'', N'', 1, 3, N'CSI', N'130', N'null', N'Lecture')
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (20934, N'{"overlap":true,"color":"#ab4e68","extendedProps":{"courseID":3,"uuid":"MIGRATED-EVENT-68906532d82b757eaaf729cde83377b0e012ae3169ccdbba77cb8b2f8592dce1","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":2,"Quarter":1,"Year":2023,"dateCreated":"2022-08-23T20:45:36.874Z","instructorName":"Duck Ling","instructorHash":"d7998839f2e3092d594a50383ac7e8ad6eb5848d02c586e4f5634682d6c750a9","classNumber":0,"Session":"Reg","section":null,"courseNumber":"130","coursePrefix":"CSI","component":"Lecture","delivery":null,"startTime":"","endTime":"","startDate":"","endDate":"","room":"","building":"","lastModName":"david nguyen","lastModDate":"2022-08-23T20:45:38.954Z","credits":5,"insanityLevel":0,"warnings":["Event days of week not set","Location not set","Times not set","Start and end date not set","Class number not set","Section number not set"]},"title":"Database Design","daysOfWeek":[],"groupId":"MIGRATED-EVENT-68906532d82b757eaaf729cde83377b0e012ae3169ccdbba77cb8b2f8592dce1","startTime":"","endTime":""}', N'MIGRATED-EVENT-68906532d82b757eaaf729cde83377b0e012ae3169ccdbba77cb8b2f8592dce1', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'd7998839f2e3092d594a50383ac7e8ad6eb5848d02c586e4f5634682d6c750a9', N'RTC', 2, 2024, 1, N'', N'', 1, 3, N'CSI', N'130', N'null', N'Lecture')
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (20960, N'{"overlap":true,"color":"#5c95ac","extendedProps":{"courseID":13,"uuid":"ab5d71f4-5ed0-452e-b03f-a6bc26a19c7a","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":1,"Quarter":1,"Year":2022,"dateCreated":"2022-08-23T20:38:18.032Z","instructorName":"Johny Appleseed","instructorHash":"86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64","classNumber":0,"Session":"Reg","section":null,"courseNumber":"156","coursePrefix":"CNT","component":"Lecture","delivery":null,"startTime":"07:42:00","endTime":"08:42:00","startDate":"2022-08-03","endDate":"2022-08-21","room":"108","building":"J","lastModName":"david nguyen","lastModDate":"2022-08-23T20:39:59.038Z","credits":2.5,"insanityLevel":0,"warnings":["Class number not set","Section number not set"],"errors":[]},"title":"Bits and Bytes of Cloud Computing","daysOfWeek":["1","3"],"groupId":"ab5d71f4-5ed0-452e-b03f-a6bc26a19c7a","startTime":"07:42:00","endTime":"08:42:00","color2":"#5c95ac"}', N'ab5d71f4-5ed0-452e-b03f-a6bc26a19c7a', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64', N'RTC', 1, 2022, 1, N'J', N'108', 1, 13, N'CNT', N'156', N'null', N'Lecture')
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (20993, N'{"overlap":true,"color":"#5c95ac","extendedProps":{"courseID":13,"uuid":"MIGRATED-EVENT-925086629fe4db141b9717138adac2a3189eca2cc2e28f57fdd6986bc4702c96","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":1,"Quarter":1,"Year":2024,"dateCreated":"2022-08-23T20:38:18.032Z","instructorName":"Mango Steen","instructorHash":"8deb034ad2b4ad8c45dd50130d6abfaf5c41ed1e666f6ad9d8a747fe16635d0a","classNumber":2323,"Session":"Reg","section":"12L","courseNumber":"156","coursePrefix":"CNT","component":"Lecture","delivery":null,"startTime":"10:26:00","endTime":"11:26:00","startDate":"2022-08-03","endDate":"2022-08-21","room":"108","building":"J","lastModName":"david nguyen","lastModDate":"2022-08-30T04:56:58.942Z","credits":2.5,"insanityLevel":0,"warnings":[],"errors":[]},"title":"Bits and Bytes of Cloud Computing","daysOfWeek":["1","3"],"groupId":"MIGRATED-EVENT-925086629fe4db141b9717138adac2a3189eca2cc2e28f57fdd6986bc4702c96","startTime":"10:26:00","endTime":"11:26:00","color2":"#5c95ac"}', N'MIGRATED-EVENT-925086629fe4db141b9717138adac2a3189eca2cc2e28f57fdd6986bc4702c96', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'8deb034ad2b4ad8c45dd50130d6abfaf5c41ed1e666f6ad9d8a747fe16635d0a', N'RTC', 1, 2024, 1, N'J', N'108', 1, 13, N'CNT', N'156', N'12L', N'Lecture')
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (20994, N'{"overlap":true,"color":"#ab4e68","extendedProps":{"courseID":1034,"uuid":"MIGRATED-EVENT-7702d3f647d888752b52a5fa7562d5b4ba22289ddbc9e79951e768213e192a09","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":2,"Quarter":1,"Year":2024,"dateCreated":"2022-08-23T20:45:34.084Z","instructorName":"Moose Frager","instructorHash":"8c2370020312cf6457dde464598c177efc6ff6b9cb20e61c7b8c31bde8e5dc7b","classNumber":0,"Session":"Reg","section":null,"courseNumber":"156","coursePrefix":"CSI","component":"Lab","delivery":null,"startTime":"","endTime":"","startDate":"","endDate":"","room":"","building":"","lastModName":"david nguyen","lastModDate":"2022-09-01T08:34:12.199Z","credits":5,"insanityLevel":0,"warnings":["Event days of week not set","Location not set","Times not set","Start and end date not set","Class number not set","Section number not set"]},"title":"Bits and Bytes of Cloud Computing","daysOfWeek":[],"groupId":"MIGRATED-EVENT-7702d3f647d888752b52a5fa7562d5b4ba22289ddbc9e79951e768213e192a09","startTime":"","endTime":""}', N'MIGRATED-EVENT-7702d3f647d888752b52a5fa7562d5b4ba22289ddbc9e79951e768213e192a09', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'8c2370020312cf6457dde464598c177efc6ff6b9cb20e61c7b8c31bde8e5dc7b', N'RTC', 2, 2024, 1, N'', N'', 1, 1034, N'CSI', N'156', N'null', N'Lab')
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (20997, N'{"overlap":true,"color":"#007736","extendedProps":{"courseID":13,"uuid":"MIGRATED-EVENT-5ecc961c16b45a9bec7459df146ab5d46c357742ebf237ed29801a73edb38ae1","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":1,"Quarter":1,"Year":2023,"dateCreated":"2022-08-23T20:38:18.032Z","instructorName":"Moose Frager","instructorHash":"8c2370020312cf6457dde464598c177efc6ff6b9cb20e61c7b8c31bde8e5dc7b","classNumber":232323,"Session":"Reg","section":"12L","courseNumber":"156","coursePrefix":"CNT","component":"Lecture","delivery":null,"startTime":"08:42:00","endTime":"11:14:00","startDate":"2022-08-03","endDate":"2022-08-21","room":"108","building":"J","lastModName":"david nguyen","lastModDate":"2022-08-25T04:05:55.308Z","credits":2.5,"insanityLevel":0,"warnings":[],"errors":[]},"title":"Bits and Bytes of Cloud Computing","daysOfWeek":["1","3"],"groupId":"MIGRATED-EVENT-5ecc961c16b45a9bec7459df146ab5d46c357742ebf237ed29801a73edb38ae1","startTime":"08:42:00","endTime":"11:14:00","color2":"#007736"}', N'MIGRATED-EVENT-5ecc961c16b45a9bec7459df146ab5d46c357742ebf237ed29801a73edb38ae1', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'8c2370020312cf6457dde464598c177efc6ff6b9cb20e61c7b8c31bde8e5dc7b', N'RTC', 1, 2023, 1, N'J', N'108', 1, 13, N'CNT', N'156', N'12L', N'Lecture')
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (20998, N'{"overlap":true,"color":"#5c95ac","extendedProps":{"courseID":13,"uuid":"MIGRATED-EVENT-6167f8b5444b4ea5cdeea596f88cba56186fa050200704e11270fe427795e08c","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":1,"Quarter":1,"Year":2022,"dateCreated":"2022-08-23T20:38:18.032Z","instructorName":"Johny Appleseed","instructorHash":"86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64","classNumber":0,"Session":"Reg","section":null,"courseNumber":"156","coursePrefix":"CNT","component":"Lecture","delivery":null,"startTime":"07:42:00","endTime":"08:42:00","startDate":"2022-08-03","endDate":"2022-08-21","room":"108","building":"J","lastModName":"david nguyen","lastModDate":"2022-08-23T20:39:59.038Z","credits":2.5,"insanityLevel":0,"warnings":["Class number not set","Section number not set"],"errors":[]},"title":"Bits and Bytes of Cloud Computing","daysOfWeek":["1","3"],"groupId":"MIGRATED-EVENT-6167f8b5444b4ea5cdeea596f88cba56186fa050200704e11270fe427795e08c","startTime":"07:42:00","endTime":"08:42:00","color2":"#5c95ac"}', N'MIGRATED-EVENT-6167f8b5444b4ea5cdeea596f88cba56186fa050200704e11270fe427795e08c', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64', N'RTC', 1, 2023, 2, N'J', N'108', 1, 13, N'CNT', N'156', N'null', N'Lecture')
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (20999, N'{"overlap":true,"color":"#5c95ac","extendedProps":{"courseID":13,"uuid":"MIGRATED-EVENT-1f032d9aa7ab1c2f9c923efea0ccfe86c6a6daf553a985c5026cced290b4378c","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":1,"Quarter":1,"Year":2022,"dateCreated":"2022-08-23T20:38:18.032Z","instructorName":"Johny Appleseed","instructorHash":"86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64","classNumber":0,"Session":"Reg","section":null,"courseNumber":"156","coursePrefix":"CNT","component":"Lecture","delivery":null,"startTime":"07:42:00","endTime":"08:42:00","startDate":"2022-08-03","endDate":"2022-08-21","room":"108","building":"J","lastModName":"david nguyen","lastModDate":"2022-08-23T20:39:59.038Z","credits":2.5,"insanityLevel":0,"warnings":["Class number not set","Section number not set"],"errors":[]},"title":"Bits and Bytes of Cloud Computing","daysOfWeek":["1","3"],"groupId":"MIGRATED-EVENT-1f032d9aa7ab1c2f9c923efea0ccfe86c6a6daf553a985c5026cced290b4378c","startTime":"07:42:00","endTime":"08:42:00","color2":"#5c95ac"}', N'MIGRATED-EVENT-1f032d9aa7ab1c2f9c923efea0ccfe86c6a6daf553a985c5026cced290b4378c', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64', N'RTC', 1, 2023, 2, N'J', N'108', 1, 13, N'CNT', N'156', N'null', N'Lecture')
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (21000, N'{"overlap":true,"color":"#5c95ac","extendedProps":{"courseID":13,"uuid":"MIGRATED-EVENT-6732ac1c1d836a680a8bc45723475f0972ba5216173ee0bb094bbe3a373c8420","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":1,"Quarter":1,"Year":2022,"dateCreated":"2022-08-23T20:38:18.032Z","instructorName":"Johny Appleseed","instructorHash":"86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64","classNumber":0,"Session":"Reg","section":null,"courseNumber":"156","coursePrefix":"CNT","component":"Lecture","delivery":null,"startTime":"07:42:00","endTime":"08:42:00","startDate":"2022-08-03","endDate":"2022-08-21","room":"108","building":"J","lastModName":"david nguyen","lastModDate":"2022-08-23T20:39:59.038Z","credits":2.5,"insanityLevel":0,"warnings":["Class number not set","Section number not set"],"errors":[]},"title":"Bits and Bytes of Cloud Computing","daysOfWeek":["1","3"],"groupId":"MIGRATED-EVENT-6732ac1c1d836a680a8bc45723475f0972ba5216173ee0bb094bbe3a373c8420","startTime":"07:42:00","endTime":"08:42:00","color2":"#5c95ac"}', N'MIGRATED-EVENT-6732ac1c1d836a680a8bc45723475f0972ba5216173ee0bb094bbe3a373c8420', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64', N'RTC', 1, 2023, 2, N'J', N'108', 1, 13, N'CNT', N'156', N'null', N'Lecture')
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (21001, N'{"overlap":true,"color":"#5c95ac","extendedProps":{"courseID":13,"uuid":"MIGRATED-EVENT-d67a9bb1d4df6d8d829e1adf53482ee3e18366f608e6fe4aa60f4b425c1840a1","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":1,"Quarter":1,"Year":2022,"dateCreated":"2022-08-23T20:38:18.032Z","instructorName":"Johny Appleseed","instructorHash":"86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64","classNumber":0,"Session":"Reg","section":null,"courseNumber":"156","coursePrefix":"CNT","component":"Lecture","delivery":null,"startTime":"07:42:00","endTime":"08:42:00","startDate":"2022-08-03","endDate":"2022-08-21","room":"108","building":"J","lastModName":"david nguyen","lastModDate":"2022-08-23T20:39:59.038Z","credits":2.5,"insanityLevel":0,"warnings":["Class number not set","Section number not set"],"errors":[]},"title":"Bits and Bytes of Cloud Computing","daysOfWeek":["1","3"],"groupId":"MIGRATED-EVENT-d67a9bb1d4df6d8d829e1adf53482ee3e18366f608e6fe4aa60f4b425c1840a1","startTime":"07:42:00","endTime":"08:42:00","color2":"#5c95ac"}', N'MIGRATED-EVENT-d67a9bb1d4df6d8d829e1adf53482ee3e18366f608e6fe4aa60f4b425c1840a1', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64', N'RTC', 1, 2023, 2, N'J', N'108', 1, 13, N'CNT', N'156', N'null', N'Lecture')
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (21002, N'{"overlap":true,"color":"#5c95ac","extendedProps":{"courseID":13,"uuid":"MIGRATED-EVENT-83c097da1dfd85250f39c0bc90e697ad8c9dbf4154c7a6a957821f65d491934d","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":1,"Quarter":1,"Year":2022,"dateCreated":"2022-08-23T20:38:18.032Z","instructorName":"Johny Appleseed","instructorHash":"86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64","classNumber":0,"Session":"Reg","section":null,"courseNumber":"156","coursePrefix":"CNT","component":"Lecture","delivery":null,"startTime":"07:42:00","endTime":"08:42:00","startDate":"2022-08-03","endDate":"2022-08-21","room":"108","building":"J","lastModName":"david nguyen","lastModDate":"2022-08-23T20:39:59.038Z","credits":2.5,"insanityLevel":0,"warnings":["Class number not set","Section number not set"],"errors":[]},"title":"Bits and Bytes of Cloud Computing","daysOfWeek":["1","3"],"groupId":"MIGRATED-EVENT-83c097da1dfd85250f39c0bc90e697ad8c9dbf4154c7a6a957821f65d491934d","startTime":"07:42:00","endTime":"08:42:00","color2":"#5c95ac"}', N'MIGRATED-EVENT-83c097da1dfd85250f39c0bc90e697ad8c9dbf4154c7a6a957821f65d491934d', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64', N'RTC', 1, 2023, 2, N'J', N'108', 1, 13, N'CNT', N'156', N'null', N'Lecture')
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (21003, N'{"overlap":true,"color":"#5c95ac","extendedProps":{"courseID":13,"uuid":"MIGRATED-EVENT-5b8a0966caa0254348734dc0fce1be9bfc497d205dcbcabc65326fb79f2acc9d","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":1,"Quarter":1,"Year":2022,"dateCreated":"2022-08-23T20:38:18.032Z","instructorName":"Johny Appleseed","instructorHash":"86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64","classNumber":0,"Session":"Reg","section":null,"courseNumber":"156","coursePrefix":"CNT","component":"Lecture","delivery":null,"startTime":"07:42:00","endTime":"08:42:00","startDate":"2022-08-03","endDate":"2022-08-21","room":"108","building":"J","lastModName":"david nguyen","lastModDate":"2022-08-23T20:39:59.038Z","credits":2.5,"insanityLevel":0,"warnings":["Class number not set","Section number not set"],"errors":[]},"title":"Bits and Bytes of Cloud Computing","daysOfWeek":["1","3"],"groupId":"MIGRATED-EVENT-5b8a0966caa0254348734dc0fce1be9bfc497d205dcbcabc65326fb79f2acc9d","startTime":"07:42:00","endTime":"08:42:00","color2":"#5c95ac"}', N'MIGRATED-EVENT-5b8a0966caa0254348734dc0fce1be9bfc497d205dcbcabc65326fb79f2acc9d', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64', N'RTC', 1, 2023, 2, N'J', N'108', 1, 13, N'CNT', N'156', N'null', N'Lecture')
GO
INSERT [dbo].[apiEvents] ([Id], [eventData], [eventUUID], [eventAuthorHash], [InstructorHash], [institutonID], [classQuarterNumber], [year], [quarter], [building], [room], [programID], [courseID], [coursePrefix], [courseNumber], [Section], [Component]) VALUES (21004, N'{"overlap":true,"color":"#5c95ac","extendedProps":{"courseID":13,"uuid":"MIGRATED-EVENT-b08f760295054fe5adf678319c80fc5b79c33e6a56ae06b29958f97e3a31af51","userAccountID":"036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3","eventAuthor":"david nguyen","ProgramId":1,"ClassQuarterNumber":1,"Quarter":1,"Year":2022,"dateCreated":"2022-08-23T20:38:18.032Z","instructorName":"Johny Appleseed","instructorHash":"86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64","classNumber":0,"Session":"Reg","section":null,"courseNumber":"156","coursePrefix":"CNT","component":"Lecture","delivery":null,"startTime":"07:42:00","endTime":"08:42:00","startDate":"2022-08-03","endDate":"2022-08-21","room":"108","building":"J","lastModName":"david nguyen","lastModDate":"2022-08-23T20:39:59.038Z","credits":2.5,"insanityLevel":0,"warnings":["Class number not set","Section number not set"],"errors":[]},"title":"Bits and Bytes of Cloud Computing","daysOfWeek":["1","3"],"groupId":"MIGRATED-EVENT-b08f760295054fe5adf678319c80fc5b79c33e6a56ae06b29958f97e3a31af51","startTime":"07:42:00","endTime":"08:42:00","color2":"#5c95ac"}', N'MIGRATED-EVENT-b08f760295054fe5adf678319c80fc5b79c33e6a56ae06b29958f97e3a31af51', N'036936757cd336c5a073c851a66e6dfa37f43bc15e639742db01bdb8d70bcdb3', N'86f983fed2400998b0784993232c0031ee9bc4281985acae40494c9b9da9de64', N'RTC', 1, 2023, 2, N'J', N'108', 1, 13, N'CNT', N'156', N'null', N'Lecture')
GO
SET IDENTITY_INSERT [dbo].[apiEvents] OFF
GO
SET IDENTITY_INSERT [dbo].[ValidPrefixes] ON 
GO
INSERT [dbo].[ValidPrefixes] ([Id], [Prefix], [departmentID]) VALUES (1, N'CNT', 37)
GO
INSERT [dbo].[ValidPrefixes] ([Id], [Prefix], [departmentID]) VALUES (2, N'CSI', 37)
GO
SET IDENTITY_INSERT [dbo].[ValidPrefixes] OFF
GO
SET IDENTITY_INSERT [dbo].[InstitutionEmailDomains] ON 
GO
INSERT [dbo].[InstitutionEmailDomains] ([Id], [institutionID], [emailSuffix]) VALUES (1, N'RTC', N'@rtc.edu')
GO
SET IDENTITY_INSERT [dbo].[InstitutionEmailDomains] OFF
GO
SET IDENTITY_INSERT [dbo].[Buildings] ON 
GO
INSERT [dbo].[Buildings] ([Id], [institutionID], [buildingName], [buildingCode]) VALUES (2, N'RTC', NULL, N'J')
GO
INSERT [dbo].[Buildings] ([Id], [institutionID], [buildingName], [buildingCode]) VALUES (4, N'RTC', NULL, N'K')
GO
SET IDENTITY_INSERT [dbo].[Buildings] OFF
GO
SET IDENTITY_INSERT [dbo].[SessionTokens] ON 
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (7, N'8158313ad1cd180994219bfc28abfe45e40a942e55941f58abc5a78a2a5b71e6', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'::1', N'Home Desktop', CAST(N'2022-07-29T12:24:21.630' AS DateTime), CAST(N'2022-07-29T12:24:21.630' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (8, N'ab6d0b5fc63b60e73abf402ab4b2b5b1f15ba740a0b2aaa8754cc3ab5ed05379', N'03e3a334a8ed835250769697922a68267e0e58d4dfc587650451c47e90a654f6', N'::1', N'Windows PC', CAST(N'2022-07-29T21:34:48.360' AS DateTime), CAST(N'2022-08-01T17:43:04.417' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (10, N'd7894e4021334fcd5adbffad07ff9b682bd207a98ed9311bf48eb30aa6e01138', N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'127.0.0.1', N'Windows PC', CAST(N'2022-08-01T17:41:16.273' AS DateTime), CAST(N'2022-08-01T17:41:16.273' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (11, N'5887838ff8bf531bdb0a8f44e6000dcf74fd2505704d37d79b6f36868fb91294', N'ff1f95fedda6b6a90c4abda2b71f87f2b246754281e1dba581aac19659bf16e7', NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (12, N'f40a45f503a57024f07539aa56db4e0adb6228914398433c1a0626a78329ab63', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'127.0.0.1', N'Home Desktop', CAST(N'2022-08-01T20:26:13.547' AS DateTime), CAST(N'2022-08-08T20:24:34.747' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (13, N'bd43df4937823c6dc372fcce6a38999ea83ceb3cf2f3925b598bda346c3c3bef', N'03e3a334a8ed835250769697922a68267e0e58d4dfc587650451c47e90a654f6', N'10.0.0.118', N'iphone', CAST(N'2022-08-01T20:26:57.023' AS DateTime), CAST(N'2022-08-01T20:26:57.023' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (14, N'c7b290ea854db4cf14e1b509d907fa440c64382e79db8d5388bca02d1f75a5d9', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'10.0.0.49', N'iphone xs', CAST(N'2022-08-01T20:39:15.520' AS DateTime), CAST(N'2022-08-01T20:39:15.520' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (1007, N'5130ffffeec14e3bb0505524fca84b2fc7773a333d0f62e18e59f69f810b6cd8', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'10.0.0.130', N'safari macbook', CAST(N'2022-08-07T12:31:08.270' AS DateTime), CAST(N'2022-08-10T22:57:13.173' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (1008, N'9333153416d74f96a1ff413c62eae418e314d0edea976153a1a3a94a31c3c3b5', N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'127.0.0.1', N'Windows PC', CAST(N'2022-08-08T13:24:18.497' AS DateTime), CAST(N'2022-08-12T21:06:00.250' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (1009, N'0e85f40a682faea60f4b3d073284d3f678a00faf41e4c662cf5425f7d652ba22', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'127.0.0.1', N'Home Desktop', CAST(N'2022-08-08T20:31:05.470' AS DateTime), CAST(N'2022-08-09T02:20:05.687' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (1010, N'8eeeb126beed683c68d879208578025877a9e24e0ffb9c2b2e50067ced23efa7', N'5d84e27f6291c4b1f5e17e99af96ff7ace58cdbe387d8e331afd9ba6ccc15ccf', NULL, NULL, NULL, CAST(N'2022-08-09T02:00:02.727' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (1011, N'f8486118489866ba78b36f80f9d4de88e852b9422375c97760d6a49f3585229a', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'127.0.0.1', N'Home Desktop', CAST(N'2022-08-09T10:24:11.557' AS DateTime), CAST(N'2022-08-12T21:05:39.097' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (1012, N'07078b005952a8d1285fb030206e69291c8d3d1c5b7cc9b674e768be288fc030', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'10.0.0.118', N'iphone', CAST(N'2022-08-09T19:21:49.217' AS DateTime), CAST(N'2022-08-10T18:54:36.793' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (1013, N'583cffaac64af7142ec71cfd8966852ec3f218849209f16b56cb954b547fc760', N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'10.0.0.49', N'iphone xs', CAST(N'2022-08-09T19:31:04.940' AS DateTime), CAST(N'2022-08-10T16:46:55.030' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (1014, N'03a186442240149700aaa6fb215c8aaf7e8912d791c8263d85b50633ce2fdf90', N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'10.0.0.86', N'window', CAST(N'2022-08-10T01:53:15.820' AS DateTime), CAST(N'2022-08-12T20:29:13.550' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (2014, N'550cac60fb645fa5a10867a820e72c9415997b93d0ad2c68d28e7f8e1f9d2abd', N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'10.0.0.118', N'iphone xs', CAST(N'2022-08-10T18:52:09.823' AS DateTime), CAST(N'2022-08-10T19:18:52.820' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (2015, N'bb5b2f6dd06065e6786acd8abbb4ecf872eb3bafc9fe87b3777765ff70d01307', N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'10.0.0.130', N'macbook chrome', CAST(N'2022-08-10T19:00:41.013' AS DateTime), CAST(N'2022-08-11T02:47:20.960' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (2016, N'2c35639b458073ba95ecf5a34f5b1a102f025f2b5fe136504daa41742a6f731b', N'ad6ebbf4bbef8234b53bbed7d3c36e9af5412b0591c869616711f0e9452dfcef', NULL, NULL, NULL, CAST(N'2022-08-10T19:04:02.493' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (3014, N'dc2019b851b27257e4a13de10f4bade7d81ef22c2f207196eb651a49a8b78b81', N'ff1f95fedda6b6a90c4abda2b71f87f2b246754281e1dba581aac19659bf16e7', N'127.0.0.1', N'Test private session', CAST(N'2022-08-11T14:30:58.713' AS DateTime), CAST(N'2022-08-11T14:46:02.053' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (3015, N'c8d063ddb294e5b1049b2d5dd89cffe4ddbaadeaa772cfe79571b20680960f52', N'b23731ee0127637a62ee02c03522f74c32c4c013a31099b3e3c7f04761e078d6', NULL, NULL, NULL, CAST(N'2022-08-12T15:37:24.443' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (4015, N'1285bf9a4f55f1c34c65623bee175357af4739ba91402c1c401e3331de5c04bc', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'127.0.0.1', N'Home Desktop', CAST(N'2022-08-15T12:19:28.877' AS DateTime), CAST(N'2022-08-21T12:49:13.473' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (6015, N'30abdee55d446580b6377d8c4aacaa86406ba9d333805a716af7c4f1cc22611c', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'127.0.0.1', N'', CAST(N'2022-08-22T17:11:42.727' AS DateTime), CAST(N'2022-08-25T22:48:18.187' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (6016, N'07aee88086b0ca646a0b25d1065626824c13c3129a1e732320916979f30ae17c', N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'127.0.0.1', N'', CAST(N'2022-08-22T17:30:26.357' AS DateTime), CAST(N'2022-08-25T22:48:18.087' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (6017, N'98300c5403bf249857144c87e8aaa7ddc513e91308e78d0d2ac95cd9d43a003e', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'10.0.0.86', N'', CAST(N'2022-08-22T21:51:46.017' AS DateTime), CAST(N'2022-08-22T23:26:35.653' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (6018, N'b18cc41cf214c5b05e55f5a644422cb7f8dc8ad88fb3823495717e03f5978bb3', N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'127.0.0.1', N'Windows PC', CAST(N'2022-08-22T22:45:01.337' AS DateTime), CAST(N'2022-08-22T22:45:14.153' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (7018, N'61795fe71e4badb6461d0b42452a7630f6fea8ba68b3c95458f3ae859413afbf', N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'127.0.0.1', N'', CAST(N'2022-08-22T22:45:37.007' AS DateTime), CAST(N'2022-08-22T22:49:42.013' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (7019, N'8eb13fdffc4fcb8dd844ee1a76a0614afcea84cf60a9e68a0d2b8d7fff0e666a', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'10.0.0.118', N'', CAST(N'2022-08-22T22:50:58.343' AS DateTime), CAST(N'2022-08-22T22:54:03.787' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (8018, N'0463591aed1926dbe1dc9168629fbe487c725fc5bdca6908636fe6b9bfd24b47', N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'127.0.0.1', N'', CAST(N'2022-08-22T22:54:35.223' AS DateTime), CAST(N'2022-08-22T22:56:20.140' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (9018, N'34f21ed311ad37ddbc63c883649e9d8fcba0ec53e17ac28f76c22b8b79e4478e', N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'127.0.0.1', N'', CAST(N'2022-08-22T22:56:40.170' AS DateTime), CAST(N'2022-08-22T22:56:40.890' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (10018, N'e183e23d260738d0a9839d571f96791b0f7828853c5ace66e3b582b72b9f9568', N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'127.0.0.1', N'', CAST(N'2022-08-22T22:59:54.297' AS DateTime), CAST(N'2022-08-22T23:04:10.273' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (10019, N'96097ebf5cc03f21f15c09ea1becaf163a941c26a4022eba4d6b9f79da50f81b', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'127.0.0.1', N'', CAST(N'2022-08-22T23:04:34.473' AS DateTime), CAST(N'2022-08-22T23:04:48.740' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (10020, N'4cf549ac418ccf72f7732f9b755587b55cb32a2f6dd6cb8c3e9d715d44840112', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'10.0.0.118', N'', CAST(N'2022-08-23T10:43:16.140' AS DateTime), CAST(N'2022-08-23T10:53:48.857' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (10021, N'b7831b65a0ca9c6cd646b6f971e78843ae7abec4165263fc8095c96027ae2759', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'127.0.0.1', N'', CAST(N'2022-08-29T20:56:41.190' AS DateTime), CAST(N'2022-09-05T11:39:46.390' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (10022, N'25b9f44328063fb0a7b57a23603bee277559dec77d21a294d6447edfa2f4a2d6', N'8187057b2e3d953a89b30ea2996bb112331fd95867e355efcf2a6fccc45671ff', N'127.0.0.1', N'', CAST(N'2022-08-29T20:56:53.507' AS DateTime), CAST(N'2022-09-01T15:54:40.297' AS DateTime))
GO
INSERT [dbo].[SessionTokens] ([Id], [SessionID], [accountHash], [ip], [device], [created], [lastUsed]) VALUES (10023, N'2e25da08cce1443da408745c0253339f3820cf0ef61208e17233f20ccc2f6f6d', N'a91cfa392243fd1de112a768fe4e930ecdec1c40b312d4b14171de8cf43a5fec', N'127.0.0.1', N'', CAST(N'2022-09-09T12:15:51.607' AS DateTime), CAST(N'2022-09-09T17:56:55.030' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[SessionTokens] OFF
GO
SET IDENTITY_INSERT [dbo].[BuildingRooms] ON 
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (3, 2, N'108')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (4, 2, N'109')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (5, 2, N'110')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (2, 2, N'111')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (6, 2, N'112')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (7, 2, N'113')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (8, 2, N'114')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (9, 2, N'115')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (11, 4, N'108')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (12, 4, N'109')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (13, 4, N'110')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (10, 4, N'111')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (14, 4, N'112')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (15, 4, N'113')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (16, 4, N'114')
GO
INSERT [dbo].[BuildingRooms] ([Id], [buildingID], [room]) VALUES (17, 4, N'115')
GO
SET IDENTITY_INSERT [dbo].[BuildingRooms] OFF
GO
SET IDENTITY_INSERT [dbo].[FinalizedCalendar] ON 
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (1, 2022, 2, 37, 1, 1)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (2, 2023, 2, 37, 1, 1)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (3, 2024, 2, 37, 1, 1)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (4, 2022, 1, 37, 1, 1)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (5, 0, 1, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (6, 2022, 3, 37, 1, 1)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (7, 2025, 2, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (8, 2025, 3, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (9, 2025, 1, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (10, 2024, 1, 37, 1, 1)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (11, 2022, 0, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (12, 2024, 3, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (13, 2023, 3, 37, 1, 1)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (14, 2022, 4, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (15, 2024, 4, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (16, 2022, 2, 37, 2, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (17, 2022, 3, 37, 2, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (18, 2022, 1, 37, 2, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (19, 2023, 2, 37, 2, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (20, 2022, 4, 37, 2, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (21, 2022, 0, 37, 2, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (22, 0, 0, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (23, 0, 0, 37, 2, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (24, 2023, 0, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (25, 2024, 0, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (26, 0, 2, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (27, 0, 2, 37, 2, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (28, 2023, 1, 37, 1, 1)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (29, 2022, 2, 0, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (1029, 2023, 1, 37, 2, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (1030, 2024, 1, 37, 2, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (1031, 2012, 1, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (1032, 2014, 1, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (1033, 2020, 1, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (1034, 2018, 1, 37, 1, 0)
GO
INSERT [dbo].[FinalizedCalendar] ([Id], [year], [quarter], [department], [programID], [isActive]) VALUES (1035, 2016, 1, 37, 1, 0)
GO
SET IDENTITY_INSERT [dbo].[FinalizedCalendar] OFF
GO
