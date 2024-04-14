using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PulseAPI.Migrations
{
    /// <inheritdoc />
    public partial class testeCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostLikeInfo_Posts_PostId",
                table: "PostLikeInfo");

            migrationBuilder.AddForeignKey(
                name: "FK_PostLikeInfo_Posts_PostId",
                table: "PostLikeInfo",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostLikeInfo_Posts_PostId",
                table: "PostLikeInfo");

            migrationBuilder.AddForeignKey(
                name: "FK_PostLikeInfo_Posts_PostId",
                table: "PostLikeInfo",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");
        }
    }
}
