import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UserController],
  providers: [UserService, Logger],
  exports: [UserService],
})
export class UserModule {}
