import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserGql } from "./user_gql.model";

@Injectable()
export class UserGqlService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsersDatas(): Promise<UserGql[]> {
    return this.prismaService.users.findMany();
  }

  async createNewUser(createUserDto: UserGql) {
    return this.prismaService.users.create({
      data: createUserDto,
    });
  }
}
