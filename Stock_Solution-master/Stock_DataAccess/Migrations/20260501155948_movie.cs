using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Stock_DataAccess.Migrations
{
    public partial class movie : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanysFixedCosts_InsBranches_InsBranchId",
                table: "CompanysFixedCosts");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanysFixedCosts_Institutes_InstituteId",
                table: "CompanysFixedCosts");

            migrationBuilder.DropColumn(
                name: "CinemaName",
                table: "Movies");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanysFixedCosts_InsBranches_InsBranchId",
                table: "CompanysFixedCosts",
                column: "InsBranchId",
                principalTable: "InsBranches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanysFixedCosts_Institutes_InstituteId",
                table: "CompanysFixedCosts",
                column: "InstituteId",
                principalTable: "Institutes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanysFixedCosts_InsBranches_InsBranchId",
                table: "CompanysFixedCosts");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanysFixedCosts_Institutes_InstituteId",
                table: "CompanysFixedCosts");

            migrationBuilder.AddColumn<string>(
                name: "CinemaName",
                table: "Movies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanysFixedCosts_InsBranches_InsBranchId",
                table: "CompanysFixedCosts",
                column: "InsBranchId",
                principalTable: "InsBranches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanysFixedCosts_Institutes_InstituteId",
                table: "CompanysFixedCosts",
                column: "InstituteId",
                principalTable: "Institutes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
