using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Stock_DataAccess.Migrations
{
    public partial class prd1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CatId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_CatId",
                table: "Products");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Products_CatId",
                table: "Products",
                column: "CatId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CatId",
                table: "Products",
                column: "CatId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
