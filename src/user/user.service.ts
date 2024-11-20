import { Body, Injectable, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.users.findMany(); // users 테이블의 모든 데이터를 가져옴
  }

  async createUser(data: {
    id: number;
    email: string;
    name: string;
    age: number;
    gender: boolean;
  }) {
    return this.prismaService.users.create({ data });
  }
}
