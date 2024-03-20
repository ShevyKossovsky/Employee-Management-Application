using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class _000 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePositionsList_EmployeesList_EmployeeId",
                table: "EmployeePositionsList");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeePositionsList",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePositionsList_EmployeesList_EmployeeId",
                table: "EmployeePositionsList",
                column: "EmployeeId",
                principalTable: "EmployeesList",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePositionsList_EmployeesList_EmployeeId",
                table: "EmployeePositionsList");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeePositionsList",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePositionsList_EmployeesList_EmployeeId",
                table: "EmployeePositionsList",
                column: "EmployeeId",
                principalTable: "EmployeesList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
