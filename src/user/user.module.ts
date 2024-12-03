import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserGqlResolver } from "./user.resolver";
import { UserGqlService } from "./user.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [
    JwtModule.register({
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      signOptions: { expiresIn: "2h" },
    }),
  ],
  providers: [UserGqlResolver, PrismaService, UserGqlService],
})
export class UserGqlModule {}
