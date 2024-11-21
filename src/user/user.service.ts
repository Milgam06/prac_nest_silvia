import { Injectable } from "@nestjs/common";
import { Users } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsersData() {
    const allUsersData = await this.prismaService.users.findMany();
    if (allUsersData.length === 0) {
      throw new Error("There is no user data");
    }
    return this.prismaService.users.findMany(); // users 테이블의 모든 데이터를 가져옴
  }

  async createNewUser(data: Users) {
    return this.prismaService.users.create({ data });
  }

  async getUserDataById(id: number) {
    const searchedUsers = await this.prismaService.users.findMany({
      where: { ["id"]: id },
    });
    if (searchedUsers.length === 0) {
      throw new Error("There is no user included this id");
    }
    return searchedUsers;
  }

  async fetchUserData(selectedDataId: number, fetchDateDto: Partial<Users>) {
    const updatedUserData = await this.prismaService.users.update({
      where: { id: selectedDataId },
      data: fetchDateDto,
    });
    return updatedUserData;
  }

  async deleteUserData(deletedId: number) {
    return this.prismaService.users.delete({
      where: { id: deletedId },
    });
  }
}
