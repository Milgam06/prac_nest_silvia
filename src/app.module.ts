import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { join } from "path";
import { UserGqlResolver } from "./user_gql/user_gql.resolver";
import { UserGqlService } from "./user_gql/user_gql.service";
import { PrismaModule } from "./prisma/prisma.module";
import { UserGqlModule } from "./user_gql/user_gql.module";

@Module({
  imports: [
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
