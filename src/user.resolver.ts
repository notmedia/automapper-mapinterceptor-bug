import { Resolver, Query } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';
import { MapInterceptor } from '@automapper/nestjs';

import { UserDto, User } from './user.profile';
import { AppService } from './app.service';

@Resolver(UserDto)
export class UserResolver {
  constructor(private readonly service: AppService) {}

  // If you comment this resolver than interceptor in next resolver works.
  @Query(() => [UserDto])
  @UseInterceptors(
    MapInterceptor(UserDto, User, { isArray: true, mapperName: 'classes' }),
  )
  getUsers() {
    return this.service.getUsers();
  }

  @Query(() => UserDto)
  @UseInterceptors(MapInterceptor(UserDto, User, { mapperName: 'classes' }))
  getUser() {
    return this.service.getUser();
  }
}
