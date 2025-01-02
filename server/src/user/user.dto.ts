import { Field, ObjectType, InputType } from 'type-graphql';
import { Length } from 'class-validator';

@ObjectType()
export class User {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  cpf: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  @Length(1, 16)
  firstName: string;

  @Field()
  @Length(1, 64)
  lastName: string;

  @Field()
  cpf: string;
}