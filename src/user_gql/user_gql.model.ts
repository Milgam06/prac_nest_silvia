import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";

@ObjectType()
export class UserGql {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => Boolean)
  gender: boolean;
}

@InputType() // 입력 dto
export class CreateUserGqlDto extends UserGql {}

console.log(CreateUserGqlDto);
