import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserGqlService } from "./user_gql.service";
import { UserGql } from "./user_gql.model";

@Resolver()
export class UserResolver {
  constructor(private userGqlService: UserGqlService) {}

  @Query(() => [UserGql])
  async getAllUsersToGql() {
    return this.userGqlService.getAllUsersDatas();
  }

  //   @Mutation()
  // mutation은 생성, 수정, 삭제할 때 사용됨
}
