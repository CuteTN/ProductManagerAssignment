using Microsoft.EntityFrameworkCore.Migrations;

namespace ProductManager.Migrations
{
    public partial class EditRefreshTokenColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsRevoked",
                table: "RefreshTokens");

            migrationBuilder.RenameColumn(
                name: "IsUsed",
                table: "RefreshTokens",
                newName: "Invalidated");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Invalidated",
                table: "RefreshTokens",
                newName: "IsUsed");

            migrationBuilder.AddColumn<bool>(
                name: "IsRevoked",
                table: "RefreshTokens",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
