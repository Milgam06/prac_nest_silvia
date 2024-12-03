import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";

import { UserGqlResolver } from "./user/user.resolver";
import { UserGqlService } from "./user/user.service";
import { PrismaModule } from "./prisma/prisma.module";
import { UserGqlModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env"}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      csrfPrevention: false,
    }),

    PrismaModule,
    UserGqlModule,
  ],
})
export class AppModule {}
