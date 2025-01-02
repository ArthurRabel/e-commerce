import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User, CreateUserInput } from './user.dto';
import { Context } from '../server';

@Resolver()
export class UserResolver {
  
  @Query(() => [User])
  async getUser(
    @Ctx() ctx: Context
  ): Promise<User[]> {
    try {
      return await ctx.prisma.user.findMany();
    } catch (error) {
      throw new Error('Error when searching for customers');
    }
  }

  @Mutation(() => User)
  async createUser(
    @Arg('data') data: CreateUserInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    try {
      const user = await ctx.prisma.user.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          cpf: data.cpf
        }
      });
      return user;
    } catch (error) {
      throw new Error('Error creating client');
    }
  }
  
}