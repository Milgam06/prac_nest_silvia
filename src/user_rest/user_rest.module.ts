import { Module } from "@nestjs/common";

import { UserService } from "./user_rest.service";
import { UserController } from "./user_rest.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
