using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Stock_DataAccess.Static;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Models
{
    public class AppDbInitializer
    {
        //public static void Seed(IApplicationBuilder applicationBuilder)
        //{
        //    using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
        //    {
        //        var context = serviceScope.ServiceProvider.GetRequiredService<StockModel>();

        //        context.Database.EnsureCreated();

        //        // ---------------- CINEMAS ----------------
        //        if (!context.Cinemas.Any())
        //        {
        //            var cinemas = new List<Cinema>
        //    {
        //        new Cinema { Name = "Cinema 1", Logo = "...", Description = "Cinema 1 description" },
        //        new Cinema { Name = "Cinema 2", Logo = "...", Description = "Cinema 2 description" },
        //        new Cinema { Name = "Cinema 3", Logo = "...", Description = "Cinema 3 description" },
        //        new Cinema { Name = "Cinema 4", Logo = "...", Description = "Cinema 4 description" },
        //        new Cinema { Name = "Cinema 5", Logo = "...", Description = "Cinema 5 description" }
        //    };

        //            context.Cinemas.AddRange(cinemas);
        //            context.SaveChanges();
        //        }

        //        // ---------------- ACTORS ----------------
        //        if (!context.Actors.Any())
        //        {
        //            var actors = new List<Actor>
        //    {
        //        new Actor { FullName = "Actor 1", Bio = "Bio 1", ProfilePictureURL = "..." },
        //        new Actor { FullName = "Actor 2", Bio = "Bio 2", ProfilePictureURL = "..." },
        //        new Actor { FullName = "Actor 3", Bio = "Bio 3", ProfilePictureURL = "..." },
        //        new Actor { FullName = "Actor 4", Bio = "Bio 4", ProfilePictureURL = "..." },
        //        new Actor { FullName = "Actor 5", Bio = "Bio 5", ProfilePictureURL = "..." }
        //    };

        //            context.Actors.AddRange(actors);
        //            context.SaveChanges();
        //        }

        //        // ---------------- PRODUCERS ----------------
        //        if (!context.Producers.Any())
        //        {
        //            var producers = new List<Producer>
        //    {
        //        new Producer { FullName = "Producer 1", Bio = "Bio 1", ProfilePictureURL = "..." },
        //        new Producer { FullName = "Producer 2", Bio = "Bio 2", ProfilePictureURL = "..." },
        //        new Producer { FullName = "Producer 3", Bio = "Bio 3", ProfilePictureURL = "..." },
        //        new Producer { FullName = "Producer 4", Bio = "Bio 4", ProfilePictureURL = "..." },
        //        new Producer { FullName = "Producer 5", Bio = "Bio 5", ProfilePictureURL = "..." }
        //    };

        //            context.Producers.AddRange(producers);
        //            context.SaveChanges();
        //        }

        //        // ---------------- MOVIES ----------------
        //        if (!context.Movies.Any())
        //        {
        //            var cinemas = context.Cinemas.ToList();
        //            var producers = context.Producers.ToList();

        //            var movies = new List<Movie>
        //    {
        //        new Movie
        //        {
        //            Name = "Life",
        //            Description = "Life movie",
        //            Price = 39.5,
        //            ImageURL = "...",
        //            StartDate = DateTime.Now.AddDays(-10),
        //            EndDate = DateTime.Now.AddDays(10),
        //            Cinema = cinemas[2],
        //            Producer = producers[2],
        //            MovieCategory = MovieCategory.Documentary
        //        },
        //        new Movie
        //        {
        //            Name = "The Shawshank Redemption",
        //            Description = "Movie description",
        //            Price = 29.5,
        //            ImageURL = "...",
        //            StartDate = DateTime.Now,
        //            EndDate = DateTime.Now.AddDays(3),
        //            Cinema = cinemas[0],
        //            Producer = producers[0],
        //            MovieCategory = MovieCategory.Action
        //        },
        //        new Movie
        //        {
        //            Name = "Ghost",
        //            Description = "Ghost movie",
        //            Price = 39.5,
        //            ImageURL = "...",
        //            StartDate = DateTime.Now,
        //            EndDate = DateTime.Now.AddDays(7),
        //            Cinema = cinemas[3],
        //            Producer = producers[3],
        //            MovieCategory = MovieCategory.Horror
        //        }
        //    };

        //            context.Movies.AddRange(movies);
        //            context.SaveChanges();
        //        }

        //        // ---------------- ACTOR-MOVIE (FIXED RELATIONSHIP) ----------------
        //        if (!context.Actors_Movies.Any())
        //        {
        //            var actors = context.Actors.ToList();
        //            var movies = context.Movies.ToList();

        //            var actorMovies = new List<Actor_Movie>
        //    {
        //        new Actor_Movie { Actor = actors[0], Movie = movies[0] },
        //        new Actor_Movie { Actor = actors[1], Movie = movies[0] },

        //        new Actor_Movie { Actor = actors[0], Movie = movies[1] },
        //        new Actor_Movie { Actor = actors[2], Movie = movies[1] },

        //        new Actor_Movie { Actor = actors[1], Movie = movies[2] },
        //        new Actor_Movie { Actor = actors[3], Movie = movies[2] }
        //    };

        //            context.Actors_Movies.AddRange(actorMovies);
        //            context.SaveChanges();
        //        }
        //    }
        //}

        //public static async Task SeedUsersAndRolesAsync(IApplicationBuilder applicationBuilder)
        //{
        //    using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
        //    {

        //        //Roles
        //        var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        //        if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
        //            await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
        //        if (!await roleManager.RoleExistsAsync(UserRoles.User))
        //            await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

        //        //Users
        //        var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        //        string adminUserEmail = "admin@etickets.com";

        //        var adminUser = await userManager.FindByEmailAsync(adminUserEmail);
        //        if (adminUser == null)
        //        {
        //            var newAdminUser = new ApplicationUser()
        //            {
        //                Fullname = "Admin User",
        //                UserName = "admin-user",
        //                Email = adminUserEmail,
        //                EmailConfirmed = true
        //            };
        //            await userManager.CreateAsync(newAdminUser, "Coding@1234?");
        //            await userManager.AddToRoleAsync(newAdminUser, UserRoles.Admin);
        //        }


        //        string appUserEmail = "user@etickets.com";

        //        var appUser = await userManager.FindByEmailAsync(appUserEmail);
        //        if (appUser == null)
        //        {
        //            var newAppUser = new ApplicationUser()
        //            {
        //                Fullname = "Application User",
        //                UserName = "app-user",
        //                Email = appUserEmail,
        //                EmailConfirmed = true
        //            };
        //            await userManager.CreateAsync(newAppUser, "Coding@1234?");
        //            await userManager.AddToRoleAsync(newAppUser, UserRoles.User);
        //        }
        //    }
        //}
    }
}
