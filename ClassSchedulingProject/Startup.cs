using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClassSchedulingProject.Models;
using Microsoft.EntityFrameworkCore;
using ClassSchedulingProject.data;

namespace ClassSchedulingProject
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddDbContext<ClassSchedulerDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("ClassSchedulerAPIData")).EnableSensitiveDataLogging().UseLazyLoadingProxies();
            });
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            //configure if using api end points for more than website
            // services.AddCors(options => {
            //     options.AddPolicy("_myAllowSpecificOrigins", policy => {
            //         policy.WithOrigins("*");
            //     });
            // });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();
            app.UseCors("_myAllowSpecificOrigins");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{institution?}");
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{institution?}",
                    defaults: new { controller = "Home", action = "Index" });
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "/{action=Register}/",
                    defaults: new { controller = "Home", action = "Register" });
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "/{action=Login}/",
                    defaults: new { controller = "Home", action = "Login" });
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "/{action=myAccount}/",
                    defaults: new { controller = "Home", action = "myAccount" });
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "/{action=manageProgram}/",
                    defaults: new { controller = "Home", action = "manageProgram" });
            });
        }
    }
}
