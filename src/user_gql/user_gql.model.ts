import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Gender } from "@prisma/client";

//공통 dto
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
class UserGqlDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => Gender)
  gender: Gender;
}

@InputType() // 일부만 수정할 수 있게 UserCreateDto를 Partial한 타입 생성함
export class PartialUserCreateDto {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;
}

@InputType() //UserGqlDto 상속해서 Input 사용
export class UserCreateDto extends UserGqlDto {}

@ObjectType() //이것도 UserGqlDto 상속해서 Output 사용
export class UserOutputDto extends UserGqlDto {
  @Field(() => String)
  uuid: string;
}

@InputType()
export class UserUpdateDto {
  @Field(() => Int, { description: "수정할 유저의 id" })
  selectedId: number;

  // graphql 얘는 partial 인식을 잘 못해서, Partial처리해도 UserCreateDto가 필수라고 생각함. 멍청한 놈
  // @Field(() => UserCreateDto)
  // updateData: Partial<UserCreateDto>;

  @Field(() => PartialUserCreateDto)
  updateData: PartialUserCreateDto;
}
