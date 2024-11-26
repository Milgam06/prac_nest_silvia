import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserGqlService } from "./user_gql.service";
import { UserCreateDto, UserOutputDto, UserUpdateDto } from "./user_gql.model";

@Resolver()
export class UserResolver {
  constructor(private userGqlService: UserGqlService) {}

  @Query(() => [UserOutputDto])
  async getAllUsersToGql() {
    return this.userGqlService.getAllUsersData();
  }

  @Mutation(() => UserOutputDto) // mutation은 생성, 수정, 삭제할 때 사용됨
  async createNewUserToGql(
    @Args("createUserDto") createUserDto: UserCreateDto
  ) {
    return this.userGqlService.createNewUser(createUserDto);
  }

  @Mutation(() => UserOutputDto)
  async updateUserToGql(
    @Args("updateUserDto")
    updateUserDto: UserUpdateDto
  ) {
    return this.userGqlService.updateUser(updateUserDto);
  }

  @Mutation(() => UserOutputDto)
  async deleteUserToGql(@Args("selectedId") selectedId: number) {
    return this.userGqlService.deleteUser(selectedId);
  }
}
