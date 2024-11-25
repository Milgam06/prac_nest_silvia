import { Body, Controller, Get, Post, Param, Delete } from "@nestjs/common";
import { UserService } from "./user_rest.service";
import { Users } from "@prisma/client";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const allUsersData = await this.userService.getAllUsersData();
    return {
      message: "All users data fetched successfully",
      STATUS_CODES: 200,
      allUsersData,
    };
  }

  @Post()
  async createUser(@Body() createUserDto: Users) {
    const newUserData = await this.userService.createNewUser(createUserDto);
    return {
      message: "New user created successfully",
      STATUS_CODES: 200,
      newUserData,
    };
  }

  @Post("/:id")
  async fetchUser(
    @Param("id") id: string,
    @Body()
    fetchDataDto: Partial<Users>
  ) {
    const updatedUserData = await this.userService.fetchUserData(
      Number(id),
      fetchDataDto
    );
    return {
      message: "User data updated successfully",
      STATUS_CODES: 200,
      updatedUserData,
    };
  }

  @Delete("/:id")
  async deleteUser(@Param("id") id: string) {
    const deletedUserData = await this.userService.deleteUserData(Number(id));
    return {
      message: "User data deleted successfully",
      STATUS_CODES: 200,
      deletedUserData,
    };
  }
}
