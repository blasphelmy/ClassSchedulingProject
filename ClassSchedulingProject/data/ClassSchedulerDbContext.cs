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
        public virtual DbSet<InstitutionEmailDomains> InstitutionEmailDomains { get; set; }
        public virtual DbSet<InstitutionsRegistry> InstitutionsRegistry { get; set; }
        public virtual DbSet<SessionTokens> SessionTokens { get; set; }
        public virtual DbSet<UserInformation> UserInformation { get; set; }

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
                    .HasName("UQ__apiEvent__5E26E5A1E8B001EC")
                    .IsUnique();

                entity.Property(e => e.Building).IsUnicode(false);

                entity.Property(e => e.EventAuthorHash).IsUnicode(false);

                entity.Property(e => e.EventData).IsUnicode(false);

                entity.Property(e => e.EventUuid).IsUnicode(false);

                entity.Property(e => e.InstitutonId).IsUnicode(false);

                entity.Property(e => e.Room).IsUnicode(false);

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

                entity.HasOne(d => d.PrimaryInstitution)
                    .WithMany(p => p.UserInformation)
                    .HasPrincipalKey(p => p.InstitutionId)
                    .HasForeignKey(d => d.PrimaryInstitutionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("referenceToInstitution");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
