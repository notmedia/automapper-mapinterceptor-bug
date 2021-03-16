import { Module } from '@nestjs/common';
import { classes } from '@automapper/classes';
import { pojos } from '@automapper/pojos';
import { AutomapperModule } from '@automapper/nestjs';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserProfile, UserInDBProfile } from './user.profile';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join('schema.gql'),
      playground: true,
      introspection: true,
    }),

    AutomapperModule.forRoot({
      options: [
        { name: 'classes', pluginInitializer: classes },
        { name: 'pojos', pluginInitializer: pojos },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserProfile, UserInDBProfile, UserResolver],
})
export class AppModule {}
