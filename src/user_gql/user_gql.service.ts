import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserCreateDto, UserOutputDto, UserUpdateDto } from "./user_gql.model";

@Injectable()
export class UserGqlService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsersDatas(): Promise<UserOutputDto[]> {
    return this.prismaService.users.findMany();
  }

  async createNewUser(createUserDto: UserCreateDto) {
    return this.prismaService.users.create({
      data: createUserDto,
    });
  }

  async updateUser(updateUserDto: UserUpdateDto) {
    return this.prismaService.users.update({
      where: { id: updateUserDto.selectedId },
      data: updateUserDto.updateData,
    });
  }

  async deleteUser(selectedId: number) {
    return this.prismaService.users.delete({
      where: { id: selectedId },
    });
  }
}
