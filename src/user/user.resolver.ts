import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserGqlService } from "./user.service";
import {
  UserAuthInputDto,
  UserAuthOutputDto,
  UserCreateDto,
  UserOutputDto,
  UserUpdateDto,
} from "./dto/user.dto";

@Resolver()
export class UserGqlResolver {
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
  async deleteUserToGql(@Args("nick") nick: string) {
    return this.userGqlService.deleteUser(nick);
  }

  @Mutation(() => UserAuthOutputDto)
  async loginUserToGql(
    @Args("userAuthInputDto") userAuthDto: UserAuthInputDto
  ) {
    return this.userGqlService.loginUser(userAuthDto);
  }

  @Mutation(() => UserOutputDto)
  async logoutUserToGql(@Args("nick") nick: string) {
    return this.userGqlService.logoutUser(nick);
  }

  @Mutation(() => UserAuthOutputDto)
  async refreshTokenToGql(@Args("refreshToken") refreshToken: string) {
    return this.userGqlService.refreshUserAccessToken(refreshToken);
  }
}
