USE [ClassSchedulerAPIData]
GO
/****** Object:  Table [dbo].[apiEvents]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[apiEvents](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[eventData] [varchar](max) NOT NULL,
	[eventUUID] [varchar](256) NOT NULL,
	[eventAuthorHash] [varchar](512) NOT NULL,
	[InstructorHash] [varchar](64) NULL,
	[institutonID] [varchar](64) NOT NULL,
	[classQuarterNumber] [int] NULL,
	[year] [int] NOT NULL,
	[quarter] [int] NOT NULL,
	[building] [varchar](64) NULL,
	[room] [varchar](64) NULL,
	[programID] [int] NOT NULL,
	[courseID] [int] NOT NULL,
	[coursePrefix] [varchar](24) NULL,
	[courseNumber] [varchar](12) NULL,
	[Section] [varchar](12) NULL,
	[Component] [varchar](64) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[eventUUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BuildingRooms]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BuildingRooms](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[buildingID] [int] NOT NULL,
	[room] [varchar](12) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [uniqueRoom] UNIQUE NONCLUSTERED 
(
	[buildingID] ASC,
	[room] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Buildings]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Buildings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[institutionID] [varchar](64) NOT NULL,
	[buildingName] [varchar](64) NULL,
	[buildingCode] [varchar](120) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [uniqueBuilding] UNIQUE NONCLUSTERED 
(
	[buildingCode] ASC,
	[institutionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[calendarBookBackUps]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[calendarBookBackUps](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[institutonID] [varchar](64) NOT NULL,
	[completeBooking] [varchar](max) NOT NULL,
	[backupNumber] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [uniqueBackUp] UNIQUE NONCLUSTERED 
(
	[institutonID] ASC,
	[backupNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CourseOfferings]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CourseOfferings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[courseOfferedID] [int] NOT NULL,
	[ClassNumber] [int] NULL,
	[quarter] [int] NULL,
	[year] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[ClassNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CourseOfferingsTemplates]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CourseOfferingsTemplates](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProgramID] [int] NOT NULL,
	[InstitutionID] [varchar](64) NOT NULL,
	[Title] [varchar](128) NOT NULL,
	[CoursePrefix] [varchar](24) NOT NULL,
	[CourseNumber] [varchar](24) NOT NULL,
	[Component] [varchar](64) NOT NULL,
	[quarterNumber] [int] NOT NULL,
	[credits] [decimal](3, 1) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UniqueCourseOffering] UNIQUE NONCLUSTERED 
(
	[InstitutionID] ASC,
	[CoursePrefix] ASC,
	[CourseNumber] ASC,
	[quarterNumber] ASC,
	[Component] ASC,
	[ProgramID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departments]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[departmentName] [varchar](64) NOT NULL,
	[departmentID] [int] NOT NULL,
	[departmentType] [varchar](12) NOT NULL,
	[institutionID] [varchar](64) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[departmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FinalizedCalendar]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FinalizedCalendar](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[year] [int] NOT NULL,
	[quarter] [int] NOT NULL,
	[department] [int] NOT NULL,
	[programID] [int] NOT NULL,
	[isActive] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [y] UNIQUE NONCLUSTERED 
(
	[year] ASC,
	[quarter] ASC,
	[department] ASC,
	[programID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InstitutionEmailDomains]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InstitutionEmailDomains](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[institutionID] [varchar](64) NOT NULL,
	[emailSuffix] [varchar](64) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InstitutionsRegistry]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InstitutionsRegistry](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InstitutionID] [varchar](64) NOT NULL,
	[InstitutionName] [varchar](128) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[InstitutionName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[InstitutionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProgramOfferings]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProgramOfferings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InstitutionID] [varchar](64) NOT NULL,
	[AssociatedDepartmentID] [int] NOT NULL,
	[ProgramName] [varchar](256) NOT NULL,
	[ProgramType] [varchar](12) NOT NULL,
	[ProgramVersion] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UniqueProgramOffering] UNIQUE NONCLUSTERED 
(
	[InstitutionID] ASC,
	[ProgramType] ASC,
	[ProgramName] ASC,
	[ProgramVersion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SessionDates]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SessionDates](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SessionName] [varchar](24) NOT NULL,
	[sessionID] [int] NOT NULL,
	[sessionNumber] [int] NOT NULL,
	[sessionYear] [int] NOT NULL,
	[startDate] [date] NOT NULL,
	[endDate] [date] NOT NULL,
	[institutonID] [varchar](64) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [uniqueSession] UNIQUE NONCLUSTERED 
(
	[sessionNumber] ASC,
	[sessionYear] ASC,
	[institutonID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[sessionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SessionTokens]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SessionTokens](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SessionID] [varchar](256) NOT NULL,
	[accountHash] [varchar](512) NOT NULL,
	[ip] [varchar](512) NULL,
	[device] [varchar](128) NULL,
	[created] [datetime] NULL,
	[lastUsed] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[SessionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserInformation]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserInformation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[accountHash] [varchar](512) NOT NULL,
	[eventsAuthorID] [varchar](512) NOT NULL,
	[firstName] [varchar](64) NOT NULL,
	[lastName] [varchar](64) NOT NULL,
	[primaryEmail] [varchar](64) NOT NULL,
	[primaryInstitutionID] [varchar](64) NOT NULL,
	[accountFlag] [int] NOT NULL,
	[departmentID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[accountHash] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[eventsAuthorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[primaryEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ValidPrefixes]    Script Date: 9/9/2022 6:14:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ValidPrefixes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Prefix] [varchar](12) NOT NULL,
	[departmentID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [uniqueDepartmentPrefix] UNIQUE NONCLUSTERED 
(
	[Prefix] ASC,
	[departmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Prefix] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[apiEvents]  WITH CHECK ADD  CONSTRAINT [apiEventCourseReferece] FOREIGN KEY([courseID])
REFERENCES [dbo].[CourseOfferingsTemplates] ([Id])
GO
ALTER TABLE [dbo].[apiEvents] CHECK CONSTRAINT [apiEventCourseReferece]
GO
ALTER TABLE [dbo].[apiEvents]  WITH CHECK ADD  CONSTRAINT [eventAuthorReference] FOREIGN KEY([eventAuthorHash])
REFERENCES [dbo].[UserInformation] ([eventsAuthorID])
GO
ALTER TABLE [dbo].[apiEvents] CHECK CONSTRAINT [eventAuthorReference]
GO
ALTER TABLE [dbo].[apiEvents]  WITH CHECK ADD  CONSTRAINT [eventInstitutionReference] FOREIGN KEY([institutonID])
REFERENCES [dbo].[InstitutionsRegistry] ([InstitutionID])
GO
ALTER TABLE [dbo].[apiEvents] CHECK CONSTRAINT [eventInstitutionReference]
GO
ALTER TABLE [dbo].[apiEvents]  WITH CHECK ADD  CONSTRAINT [eventProgramReference] FOREIGN KEY([programID])
REFERENCES [dbo].[ProgramOfferings] ([Id])
GO
ALTER TABLE [dbo].[apiEvents] CHECK CONSTRAINT [eventProgramReference]
GO
ALTER TABLE [dbo].[BuildingRooms]  WITH CHECK ADD  CONSTRAINT [buildingReference] FOREIGN KEY([buildingID])
REFERENCES [dbo].[Buildings] ([Id])
GO
ALTER TABLE [dbo].[BuildingRooms] CHECK CONSTRAINT [buildingReference]
GO
ALTER TABLE [dbo].[Buildings]  WITH CHECK ADD  CONSTRAINT [buildingInstitutionReference] FOREIGN KEY([institutionID])
REFERENCES [dbo].[InstitutionsRegistry] ([InstitutionID])
GO
ALTER TABLE [dbo].[Buildings] CHECK CONSTRAINT [buildingInstitutionReference]
GO
ALTER TABLE [dbo].[calendarBookBackUps]  WITH CHECK ADD  CONSTRAINT [backupInstitutionReference] FOREIGN KEY([institutonID])
REFERENCES [dbo].[InstitutionsRegistry] ([InstitutionID])
GO
ALTER TABLE [dbo].[calendarBookBackUps] CHECK CONSTRAINT [backupInstitutionReference]
GO
ALTER TABLE [dbo].[CourseOfferings]  WITH CHECK ADD  CONSTRAINT [CourseOfferedTemplate] FOREIGN KEY([courseOfferedID])
REFERENCES [dbo].[CourseOfferingsTemplates] ([Id])
GO
ALTER TABLE [dbo].[CourseOfferings] CHECK CONSTRAINT [CourseOfferedTemplate]
GO
ALTER TABLE [dbo].[CourseOfferingsTemplates]  WITH CHECK ADD  CONSTRAINT [CourseProgramReference] FOREIGN KEY([ProgramID])
REFERENCES [dbo].[ProgramOfferings] ([Id])
GO
ALTER TABLE [dbo].[CourseOfferingsTemplates] CHECK CONSTRAINT [CourseProgramReference]
GO
ALTER TABLE [dbo].[CourseOfferingsTemplates]  WITH CHECK ADD  CONSTRAINT [InstitutionCourseOfferings] FOREIGN KEY([InstitutionID])
REFERENCES [dbo].[InstitutionsRegistry] ([InstitutionID])
GO
ALTER TABLE [dbo].[CourseOfferingsTemplates] CHECK CONSTRAINT [InstitutionCourseOfferings]
GO
ALTER TABLE [dbo].[Departments]  WITH CHECK ADD  CONSTRAINT [InstitutionDepartments] FOREIGN KEY([institutionID])
REFERENCES [dbo].[InstitutionsRegistry] ([InstitutionID])
GO
ALTER TABLE [dbo].[Departments] CHECK CONSTRAINT [InstitutionDepartments]
GO
ALTER TABLE [dbo].[InstitutionEmailDomains]  WITH CHECK ADD  CONSTRAINT [EmailSuffixReferenceToInstitution] FOREIGN KEY([institutionID])
REFERENCES [dbo].[InstitutionsRegistry] ([InstitutionID])
GO
ALTER TABLE [dbo].[InstitutionEmailDomains] CHECK CONSTRAINT [EmailSuffixReferenceToInstitution]
GO
ALTER TABLE [dbo].[ProgramOfferings]  WITH CHECK ADD  CONSTRAINT [InstitutionProgramOfferings] FOREIGN KEY([InstitutionID])
REFERENCES [dbo].[InstitutionsRegistry] ([InstitutionID])
GO
ALTER TABLE [dbo].[ProgramOfferings] CHECK CONSTRAINT [InstitutionProgramOfferings]
GO
ALTER TABLE [dbo].[ProgramOfferings]  WITH CHECK ADD  CONSTRAINT [ProgramsDepartment] FOREIGN KEY([AssociatedDepartmentID])
REFERENCES [dbo].[Departments] ([departmentID])
GO
ALTER TABLE [dbo].[ProgramOfferings] CHECK CONSTRAINT [ProgramsDepartment]
GO
ALTER TABLE [dbo].[SessionDates]  WITH CHECK ADD  CONSTRAINT [InstitutionSessions] FOREIGN KEY([institutonID])
REFERENCES [dbo].[InstitutionsRegistry] ([InstitutionID])
GO
ALTER TABLE [dbo].[SessionDates] CHECK CONSTRAINT [InstitutionSessions]
GO
ALTER TABLE [dbo].[SessionTokens]  WITH CHECK ADD  CONSTRAINT [referenceToRealUser] FOREIGN KEY([accountHash])
REFERENCES [dbo].[UserInformation] ([accountHash])
GO
ALTER TABLE [dbo].[SessionTokens] CHECK CONSTRAINT [referenceToRealUser]
GO
ALTER TABLE [dbo].[UserInformation]  WITH CHECK ADD  CONSTRAINT [UserAssociatedDepartment] FOREIGN KEY([departmentID])
REFERENCES [dbo].[Departments] ([departmentID])
GO
ALTER TABLE [dbo].[UserInformation] CHECK CONSTRAINT [UserAssociatedDepartment]
GO
ALTER TABLE [dbo].[UserInformation]  WITH CHECK ADD  CONSTRAINT [userAssociatedInstitution] FOREIGN KEY([primaryInstitutionID])
REFERENCES [dbo].[InstitutionsRegistry] ([InstitutionID])
GO
ALTER TABLE [dbo].[UserInformation] CHECK CONSTRAINT [userAssociatedInstitution]
GO
ALTER TABLE [dbo].[ValidPrefixes]  WITH CHECK ADD  CONSTRAINT [DepartmentCoursePrefixes] FOREIGN KEY([departmentID])
REFERENCES [dbo].[Departments] ([departmentID])
GO
ALTER TABLE [dbo].[ValidPrefixes] CHECK CONSTRAINT [DepartmentCoursePrefixes]
GO
