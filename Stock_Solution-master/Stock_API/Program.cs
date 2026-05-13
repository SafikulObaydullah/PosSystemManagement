using Microsoft.AspNetCore.Mvc.Formatters;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Stock_DataAccess.Repositories;
using Stock_DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Stock_API.Utility;
using Stock_API.Auth.Interface;
using Microsoft.Extensions.FileProviders;
using System;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddControllers();
builder.Services.AddControllers(options =>
{
    options.OutputFormatters.RemoveType<SystemTextJsonOutputFormatter>();
    options.OutputFormatters.Add(new SystemTextJsonOutputFormatter
            (new JsonSerializerOptions(JsonSerializerDefaults.Web)
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                //ContractResolver=new CamelCasePropertyNamesContractResolver()
                PropertyNameCaseInsensitive = false,
                PropertyNamingPolicy = null,
                WriteIndented = true,
            }));
});

builder.Services.AddDbContextPool<StockModel>(op => {
    op.UseSqlServer(builder.Configuration.GetConnectionString("DbStockModel"),
        m => m.MigrationsAssembly("Stock_Lib"));
    op.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<StockModel>();
//For Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(op =>
{
    op.Password.RequiredLength = 7;
    op.Password.RequireDigit = false;
    op.User.RequireUniqueEmail = true;
})
                .AddEntityFrameworkStores<StockModel>()
                .AddDefaultTokenProviders();
//Adding Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
                .AddJwtBearer(op =>
                {
                    op.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = "https://localhost:7039",
                        ValidAudience = "https://localhost:7039",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
                    };

                });
var conStr = builder.Configuration.GetConnectionString("DbStockModel");
Services.RegisterDependencies(builder.Services, conStr);

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(o => o.LoginPath = new PathString("/Auth/Login"));
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie(options =>
        {
            options.LoginPath = "/Auth/Login";
            options.LogoutPath = "/Auth/Logout";
        });
builder.Services.AddScoped<ITokenService, TokenManager>();
builder.Services.AddTransient<IUnitofWork, UnitofWork>();
builder.Services.AddTransient<IModelMessage, ModelsMessage>();
builder.Services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>, CustomClaimsPrincipalFactory>();

//builder.Services.AddTransient<IClassInfosRepository, ClassInfoRepository>();

builder.Services.AddCors(m =>
{
    m.AddPolicy("Powersoft", b =>
     b.AllowAnyHeader()
     .AllowAnyMethod()
     .AllowAnyOrigin()
    );
});
//to avoid MultiPartBodyLength 
builder.Services.Configure<FormOptions>(o =>
{
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
//AppDbInitializer.Seed(app);
//AppDbInitializer.SeedUsersAndRolesAsync(app).Wait();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(op => {
    op.AllowAnyOrigin();
    op.AllowAnyHeader();
    op.AllowAnyMethod();
});
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
