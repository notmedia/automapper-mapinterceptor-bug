import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';

import { UserInDB, User } from './user.profile';

const MOCKED_USER_IN_DATABASE: UserInDB = {
  login: 'admin',
  password: 'password',
};

@Injectable()
export class AppService {
  constructor(@InjectMapper('pojos') private readonly mapper: Mapper) {}

  async getUser(): Promise<User> {
    return this.mapper.map<UserInDB, User>(
      MOCKED_USER_IN_DATABASE,
      'User',
      'UserInDB',
    );
  }

  async getUsers(): Promise<User[]> {
    return this.mapper.mapArray<UserInDB, User>(
      [MOCKED_USER_IN_DATABASE],
      'User',
      'UserInDB',
    );
  }
}
