using Microsoft.Extensions.FileProviders;
using NuGet.Protocol.Core.Types;
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllersWithViews();

var app = builder.Build();


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
//builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
app.UseHttpsRedirection();
app.UseStaticFiles();
var resourcesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "/Upload/Files");
if (!Directory.Exists(resourcesDirectory))
{
    Directory.CreateDirectory(resourcesDirectory);
}

app.UseStaticFiles(new StaticFileOptions()
{
    FileProvider = new PhysicalFileProvider(resourcesDirectory),
    RequestPath = new PathString("/Upload/Files")
});

app.UseRouting(); 
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=DashboardDetail}/{id?}");
   // pattern: "{controller=Report}/{action=Index}/{id?}");

app.Run();
