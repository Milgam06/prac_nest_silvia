import { Injectable } from "@nestjs/common";
import { v1 as uuid } from "uuid";

import { PrismaService } from "src/prisma/prisma.service";
import { UserCreateDto, UserOutputDto, UserUpdateDto } from "./user_gql.model";

@Injectable()
export class UserGqlService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsersData(): Promise<UserOutputDto[]> {
    return this.prismaService.users.findMany();
  }

  async createNewUser(createUserDto: UserCreateDto) {
    // const lastCreatedUser = await this.prismaService.users.findFirst({
    //   orderBy: {  },
    // });

    return this.prismaService.users.create({
      data: {
        uuid: uuid(),
        ...createUserDto,
      },
    });
  }

  //uuid에 맞춰 refactor 필요

  // async updateUser(updateUserDto: UserUpdateDto) {
  //   return this.prismaService.users.update({
  //     where: { name: updateUserDto. },
  //     data: updateUserDto.updateData,
  //   });
  // }

  // async deleteUser(userName: string) {
  //   return this.prismaService.users.delete({
  //     where: { name: userName },
  //   });
  // }
}
