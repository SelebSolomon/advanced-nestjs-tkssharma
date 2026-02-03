import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { DBModule } from '@dev/database';

@Module({
  imports: [
    DBModule.forRoot({
      entities: [User],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


  // "jest": {
  //   "moduleFileExtensions": [
  //     "js",
  //     "json",
  //     "ts"
  //   ],
  //   "rootDir": "src",
  //   "testRegex": ".*\\.spec\\.ts$",
  //   "transform": {
  //     "^.+\\.(t|j)s$": "ts-jest"
  //   },
  //   "collectCoverageFrom": [
  //     "**/*.(t|j)s"
  //   ],
  //   "coverageDirectory": "../coverage",
  //   "testEnvironment": "node"
  // }