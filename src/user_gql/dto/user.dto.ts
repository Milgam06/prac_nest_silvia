import {
  Field,
  ObjectType,
  InputType,
  registerEnumType,
} from "@nestjs/graphql";
import { Gender } from "@prisma/client";

registerEnumType(Gender, {
  name: "Gender",
  description: "유저 성별",
});

//공통 dto
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
class UserGqlDto {
  @Field(() => String)
  nick: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Gender)
  gender: Gender;
}

@ObjectType() //이것도 UserGqlDto 상속해서 Output 사용
export class UserOutputDto extends UserGqlDto {
  @Field(() => String)
  uuid: string;

  @Field(() => String, { nullable: true })
  authToken?: string;
}

@InputType() //UserGqlDto 상속해서 Input 사용
export class UserCreateDto extends UserGqlDto {}

@InputType() // 일부만 수정할 수 있게 UserCreateDto를 Partial한 타입 생성함
export class PartialUserCreateDto {
  @Field(() => String, { nullable: true })
  nick?: string;

  @Field(() => String, { nullable: true })
  authToken?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;
}

@InputType()
export class UserUpdateDto {
  @Field(() => String, { description: "수정할 유저의 id" })
  updateUserNick: string;
  // graphql 얘는 partial 인식을 잘 못해서, Partial처리해도 UserCreateDto가 필수라고 생각하는듯. 멍청한 놈
  @Field(() => PartialUserCreateDto)
  updateData: PartialUserCreateDto;
}

@InputType()
export class UserAuthInputDto {
  @Field(() => String)
  loginUserNick: string;

  @Field(() => String)
  loginPassword: string;
}

@ObjectType()
export class UserAuthOutputDto {
  @Field(() => String)
  access_token: string;

  @Field(() => String, { nullable: true })
  refresh_token?: string;
}
