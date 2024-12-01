import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserGqlResolver } from "./user_gql.resolver";
import { UserGqlService } from "./user_gql.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: "2h" },
    }),
  ],
  providers: [UserGqlResolver, PrismaService, UserGqlService],
})
export class UserGqlModule {}
