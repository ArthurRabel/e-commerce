import 'reflect-metadata';

import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserResolver } from '../../src/user/user.resolver';
import { CreateUserInput } from '../../src/user/user.dto';
import { MockContext, createMockContext } from './mock/context.mock'

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let mockCtx: MockContext

  beforeEach(() => {
    userResolver = new UserResolver();
    mockCtx = createMockContext()
  });

  it('should create a user successfully', async () => {
    const input: CreateUserInput = {
      firstName: 'John',
      lastName: 'Doe',
      cpf: '12345678900'
    };

    const expected = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      cpf: '12345678900'
    };

    mockCtx.prisma.user.create.mockResolvedValue(expected);
    
    const result = await userResolver.createUser(input, mockCtx);

    expect(result).toEqual(expected);

    expect(mockCtx.prisma.user.create).toHaveBeenCalledWith({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        cpf: input.cpf
      }
    });
  });

  it('should throw an error if user creation fails', async () => {
    const input: CreateUserInput = {
      firstName: 'John',
      lastName: 'Doe',
      cpf: '12345678900'
    };

    mockCtx.prisma.user.create.mockRejectedValue(new Error('Error creating client'));

    await expect(userResolver.createUser(input, mockCtx)).rejects.toThrow('Error creating client');

    expect(mockCtx.prisma.user.create).toHaveBeenCalledWith({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        cpf: input.cpf
      }
    });
  });

  it('should get all users successfully', async () => {
    const expected = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        cpf: '12345678900'
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        cpf: '12345678901'
      }
    ];

    mockCtx.prisma.user.findMany.mockResolvedValue(expected);

    const result = await userResolver.getUser(mockCtx);

    expect(result).toEqual(expected);

    expect(mockCtx.prisma.user.findMany).toHaveBeenCalled();
  });

  it('should throw an error if user fetching fails', async () => {
    mockCtx.prisma.user.findMany.mockRejectedValue(new Error('Error when searching for customers'));

    await expect(userResolver.getUser(mockCtx)).rejects.toThrow('Error when searching for customers');

    expect(mockCtx.prisma.user.findMany).toHaveBeenCalled();
  });
});