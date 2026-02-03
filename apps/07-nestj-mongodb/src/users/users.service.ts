import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UserNotFoundException } from './exceptions/userNotFound.exception';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async getById(id: string) {
    console.log('sssssssssssssssssssssssssssssssss');
    const user = await this.userModel.findById({ _id: id });
    console.log('user here id', user);
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async create(user: CreateUserDto) {
    return this.userModel.create(user);
  }
}
