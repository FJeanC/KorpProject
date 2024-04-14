using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PulseAPI.Migrations
{
    /// <inheritdoc />
    public partial class PostLikeInfor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PostLikeInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    IsLiked = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostLikeInfo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostLikeInfo_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PostLikeInfo_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PostLikeInfo_PostId",
                table: "PostLikeInfo",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_PostLikeInfo_UserId_PostId",
                table: "PostLikeInfo",
                columns: new[] { "UserId", "PostId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PostLikeInfo");
        }
    }
}
