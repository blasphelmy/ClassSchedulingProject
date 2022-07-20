using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ClassSchedulingProject.Models;

namespace ClassSchedulingProject.data
{
    public partial class ClassSchedulerDbContext : DbContext
    {
        public ClassSchedulerDbContext()
        {
        }

        public ClassSchedulerDbContext(DbContextOptions<ClassSchedulerDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ApiEvents> ApiEvents { get; set; }
        public virtual DbSet<CalendarBookBackUps> CalendarBookBackUps { get; set; }
        public virtual DbSet<CourseOfferings> CourseOfferings { get; set; }
        public virtual DbSet<CourseOfferingsTemplates> CourseOfferingsTemplates { get; set; }
        public virtual DbSet<Departments> Departments { get; set; }
        public virtual DbSet<InstitutionEmailDomains> InstitutionEmailDomains { get; set; }
        public virtual DbSet<InstitutionsRegistry> InstitutionsRegistry { get; set; }
        public virtual DbSet<SessionDates> SessionDates { get; set; }
        public virtual DbSet<SessionTokens> SessionTokens { get; set; }
        public virtual DbSet<UserInformation> UserInformation { get; set; }
        public virtual DbSet<ValidPrefixes> ValidPrefixes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=ClassSchedulerAPIData;Integrated Security=True;Connect Timeout=60;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApiEvents>(entity =>
            {
                entity.HasIndex(e => e.EventUuid)
                    .HasName("UQ__tmp_ms_x__5E26E5A168AC7C4E")
                    .IsUnique();

                entity.Property(e => e.Building).IsUnicode(false);

                entity.Property(e => e.Component).IsUnicode(false);

                entity.Property(e => e.CourseNumber).IsUnicode(false);

                entity.Property(e => e.CoursePrefix).IsUnicode(false);

                entity.Property(e => e.DeliveryType).IsUnicode(false);

                entity.Property(e => e.EventAuthorHash).IsUnicode(false);

                entity.Property(e => e.EventData).IsUnicode(false);

                entity.Property(e => e.EventUuid).IsUnicode(false);

                entity.Property(e => e.InstitutonId).IsUnicode(false);

                entity.Property(e => e.Room).IsUnicode(false);

                entity.Property(e => e.Section).IsUnicode(false);

                entity.HasOne(d => d.EventAuthorHashNavigation)
                    .WithMany(p => p.ApiEvents)
                    .HasPrincipalKey(p => p.AccountHash)
                    .HasForeignKey(d => d.EventAuthorHash)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("eventAuthorReference");

                entity.HasOne(d => d.Instituton)
                    .WithMany(p => p.ApiEvents)
                    .HasPrincipalKey(p => p.InstitutionId)
                    .HasForeignKey(d => d.InstitutonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("eventInstitutionReference");
            });

            modelBuilder.Entity<CalendarBookBackUps>(entity =>
            {
                entity.HasIndex(e => new { e.InstitutonId, e.BackupNumber })
                    .HasName("uniqueBackUp")
                    .IsUnique();

                entity.Property(e => e.CompleteBooking).IsUnicode(false);

                entity.Property(e => e.InstitutonId).IsUnicode(false);

                entity.HasOne(d => d.Instituton)
                    .WithMany(p => p.CalendarBookBackUps)
                    .HasPrincipalKey(p => p.InstitutionId)
                    .HasForeignKey(d => d.InstitutonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("backupInstitutionReference");
            });

            modelBuilder.Entity<CourseOfferings>(entity =>
            {
                entity.HasIndex(e => e.ClassNumber)
                    .HasName("UQ__tmp_ms_x__E881B91FCF182157")
                    .IsUnique();

                entity.HasOne(d => d.CourseOffered)
                    .WithMany(p => p.CourseOfferings)
                    .HasForeignKey(d => d.CourseOfferedId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("CourseOfferedTemplate");
            });

            modelBuilder.Entity<CourseOfferingsTemplates>(entity =>
            {
                entity.HasIndex(e => new { e.InstitutionId, e.CoursePrefix, e.CourseNumber, e.QuarterNumber, e.ProgramVersion, e.Component })
                    .HasName("UniqueCourseOffering")
                    .IsUnique();

                entity.Property(e => e.Component).IsUnicode(false);

                entity.Property(e => e.CourseNumber).IsUnicode(false);

                entity.Property(e => e.CoursePrefix).IsUnicode(false);

                entity.Property(e => e.InstitutionId).IsUnicode(false);

                entity.Property(e => e.Title).IsUnicode(false);

                entity.HasOne(d => d.Institution)
                    .WithMany(p => p.CourseOfferingsTemplates)
                    .HasPrincipalKey(p => p.InstitutionId)
                    .HasForeignKey(d => d.InstitutionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("InstitutionCourseOfferings");
            });

            modelBuilder.Entity<Departments>(entity =>
            {
                entity.HasIndex(e => e.DepartmentId)
                    .HasName("UQ__Departme__F9B8344C7F25B8FD")
                    .IsUnique();

                entity.Property(e => e.DepartmentName).IsUnicode(false);

                entity.Property(e => e.DepartmentType).IsUnicode(false);

                entity.Property(e => e.InstitutionId).IsUnicode(false);

                entity.HasOne(d => d.Institution)
                    .WithMany(p => p.Departments)
                    .HasPrincipalKey(p => p.InstitutionId)
                    .HasForeignKey(d => d.InstitutionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("InstitutionDepartments");
            });

            modelBuilder.Entity<InstitutionEmailDomains>(entity =>
            {
                entity.Property(e => e.EmailSuffix).IsUnicode(false);

                entity.Property(e => e.InstitutionId).IsUnicode(false);

                entity.HasOne(d => d.Institution)
                    .WithMany(p => p.InstitutionEmailDomains)
                    .HasPrincipalKey(p => p.InstitutionId)
                    .HasForeignKey(d => d.InstitutionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("EmailSuffixReferenceToInstitution");
            });

            modelBuilder.Entity<InstitutionsRegistry>(entity =>
            {
                entity.HasIndex(e => e.InstitutionId)
                    .HasName("UQ__Institut__8DF6B94C97789101")
                    .IsUnique();

                entity.HasIndex(e => e.InstitutionName)
                    .HasName("UQ__Institut__22547BF48576136F")
                    .IsUnique();

                entity.Property(e => e.InstitutionId).IsUnicode(false);

                entity.Property(e => e.InstitutionName).IsUnicode(false);
            });

            modelBuilder.Entity<SessionDates>(entity =>
            {
                entity.HasIndex(e => e.SessionId)
                    .HasName("UQ__SessionD__23DB12CA881502CD")
                    .IsUnique();

                entity.HasIndex(e => new { e.SessionNumber, e.SessionYear, e.InstitutonId })
                    .HasName("uniqueSession")
                    .IsUnique();

                entity.Property(e => e.InstitutonId).IsUnicode(false);

                entity.Property(e => e.SessionName).IsUnicode(false);

                entity.HasOne(d => d.Instituton)
                    .WithMany(p => p.SessionDates)
                    .HasPrincipalKey(p => p.InstitutionId)
                    .HasForeignKey(d => d.InstitutonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("InstitutionSessions");
            });

            modelBuilder.Entity<SessionTokens>(entity =>
            {
                entity.HasIndex(e => e.SessionId)
                    .HasName("UQ__SessionT__C9F4927133ECF631")
                    .IsUnique();

                entity.Property(e => e.AccountHash).IsUnicode(false);

                entity.Property(e => e.SessionId).IsUnicode(false);

                entity.HasOne(d => d.AccountHashNavigation)
                    .WithMany(p => p.SessionTokens)
                    .HasPrincipalKey(p => p.AccountHash)
                    .HasForeignKey(d => d.AccountHash)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("referenceToRealUser");
            });

            modelBuilder.Entity<UserInformation>(entity =>
            {
                entity.HasIndex(e => e.AccountHash)
                    .HasName("UQ__UserInfo__2EEAD09C1B87A8F2")
                    .IsUnique();

                entity.Property(e => e.AccountHash).IsUnicode(false);

                entity.Property(e => e.FirstName).IsUnicode(false);

                entity.Property(e => e.LastName).IsUnicode(false);

                entity.Property(e => e.PrimaryEmail).IsUnicode(false);

                entity.Property(e => e.PrimaryInstitutionId).IsUnicode(false);

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.UserInformation)
                    .HasPrincipalKey(p => p.DepartmentId)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("UserAssociatedDepartment");

                entity.HasOne(d => d.PrimaryInstitution)
                    .WithMany(p => p.UserInformation)
                    .HasPrincipalKey(p => p.InstitutionId)
                    .HasForeignKey(d => d.PrimaryInstitutionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("userAssociatedInstitution");
            });

            modelBuilder.Entity<ValidPrefixes>(entity =>
            {
                entity.HasIndex(e => e.Prefix)
                    .HasName("UQ__ValidPre__1FB4799D31851954")
                    .IsUnique();

                entity.HasIndex(e => new { e.Prefix, e.DepartmentId })
                    .HasName("uniqueDepartmentPrefix")
                    .IsUnique();

                entity.Property(e => e.Prefix).IsUnicode(false);

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.ValidPrefixes)
                    .HasPrincipalKey(p => p.DepartmentId)
                    .HasForeignKey(d => d.DepartmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("DepartmentCoursePrefixes");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
