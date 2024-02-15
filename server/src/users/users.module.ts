import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users/users.service';
import { ExempleMiddleware } from './middleware/exemple/exemple.middleware';
import { AnotherMiddleware } from './middleware/another/another.middleware';
//import { UserMidd}

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(ExempleMiddleware).forRoutes('users')

    consumer
      .apply(ExempleMiddleware)
      .forRoutes(UsersController)
      .apply(AnotherMiddleware)
      .forRoutes(UsersController);
    // only apply for get method users
    /*
    consumer.apply(ExempleMiddleware).forRoutes({
      path : 'users',
      method : RequestMethod.GET
    });
    */
  }
}
