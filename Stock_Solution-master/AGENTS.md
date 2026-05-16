# Agent guidance for Stock_Solution-master

## Overview
This repository is a mixed .NET + Angular inventory/point-of-sale solution.

Key projects:
- `Stock_Solution.sln` — root Visual Studio solution
- `Stock_API` — ASP.NET Core Web API backend with EF Core, JWT bearer auth, cookie auth, custom JSON formatting, CORS policy, and Swagger in development
- `Stock_Client` — ASP.NET Core MVC web application with static file upload paths and standard controller/view routing
- `Stock_DataAccess` — data access layer with `DbContext`, repository classes, models, and EF Core settings
- `ClientApp` — Angular 18 frontend application with SSR support
- `Database script/ss.sql` — database schema / script for initializing data

## Build and run
### .NET
- `dotnet restore Stock_Solution.sln`
- `dotnet build Stock_Solution.sln`
- `dotnet run --project Stock_API/Stock_API.csproj`
- `dotnet run --project Stock_Client/Stock_Client.csproj`

### Angular
- `cd ClientApp`
- `npm install`
- `npm start`
- `npm run serve:ssr:ClientApp`

## What agents should know
- `Stock_API` is the primary backend API. Most API logic lives under `Stock_API/Controllers`, `Stock_API/Utility`, and `Stock_API/ViewModels`.
- `Stock_DataAccess` contains the shared data model, repositories, and EF Core `DbContext` used by the API and client.
- `Stock_Client` is a separate ASP.NET Core MVC web app that serves server-rendered pages.
- `ClientApp` is an independent Angular app; use the Angular CLI scripts in `ClientApp/package.json`.
- The backend configures `JsonSerializerOptions` with `ReferenceHandler.IgnoreCycles`, non-camel-case property names, and indented output.
- Authentication is configured in `Stock_API/Program.cs` using JWT bearer tokens and cookie login redirection.
- CORS is configured with an open policy named `Powersoft`.
- The EF Core migrations assembly is currently set to `Stock_Lib`; validate this before creating or updating migrations.

## Documentation links
- `ClientApp/README.md` — Angular project-specific notes

## Recommended agent behavior
- Prefer working in the relevant project for the requested change: backend bugfixes belong in `Stock_API`, data-layer changes in `Stock_DataAccess`, and UI changes in `Stock_Client` or `ClientApp`.
- Do not assume a single unified deployment; the frontend and backend are separate projects.
- For database-related changes, inspect `Database script/ss.sql` and `Stock_DataAccess` models/repositories.
